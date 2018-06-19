<template>
<div class="overview" v-loading="loading">
  <status-list :statuses="statusList"></status-list>
  <resource-usage-list :usages="resourceUsageList"></resource-usage-list>
</div>
</template>
<script>
import statusList from './components/statusList/index'
import resourceUsageList from './components/resourceList/index'
import {EVENT_SOURCE_URL} from '@/api/cluster'
import {isTimeout} from '@/utils/auth'
import {fedLogout} from '@/api/login'
const storageUnit = [
  {label: 'Ei', value: 1024 * 1024 * 1024 * 1024 * 1024 * 1024},
  {label: 'Pi', value: 1024 * 1024 * 1024 * 1024 * 1024},
  {label: 'Ti', value: 1024 * 1024 * 1024 * 1024},
  {label: 'Gi', value: 1024 * 1024 * 1024},
  {label: 'Mi', value: 1024 * 1024},
  {label: 'Ki', value: 1024}
]
const storageUnitFixedPoint = [
  {label: 'E', value: 1000 * 1000 * 1000 * 1000 * 1000 * 1000},
  {label: 'P', value: 1000 * 1000 * 1000 * 1000 * 1000},
  {label: 'T', value: 1000 * 1000 * 1000 * 1000},
  {label: 'G', value: 1000 * 1000 * 1000},
  {label: 'M', value: 1000 * 1000},
  {label: 'K', value: 1000}
]
const CPUFractional = [
  {label: '', value: 1000 * 1000 * 1000 * 1000 * 1000},
  {label: 'm', value: 1000 * 1000 * 1000 * 1000},
  {label: 'u', value: 1000 * 1000 * 1000},
  {label: 'n', value: 1000 * 1000},
  {label: 'p', value: 1000},
  {label: 'f', value: 1}
]

const formatStorageValue = function (value, unit) {
  let byteValue
  if (/^[0-9]+$/.test(value)) {
    byteValue = parseFloat(value, 10)
  } else if (value.endsWith('i')) {
    byteValue = storageUnit.find(item => item.label === value.substr(-2)).value * parseFloat(value, 10)
  } else {
    byteValue = storageUnitFixedPoint.find(item => item.label === value.substr(-1)).value * parseFloat(value, 10)
  }
  let result = {value: 0, unit: ''}
  let units = storageUnit
  if (unit) {
    let u
    if (unit.endsWith('i')) {
      u = storageUnit.find(item => item.label === unit)
    } else {
      u = storageUnitFixedPoint.find(item => item.label === unit)
    }
    result.value = Math.round(byteValue / u.value * 100) / 100
    result.unit = u.label
    return result
  }

  for (let i = 0; i < units.length; i++) {
    if (byteValue >= units[i].value) {
      result.value = Math.round((byteValue / units[i].value) * 100) / 100
      result.unit = units[i].label
      break
    }
  }
  return result
}
const formatCPUFractional = function (value, unit = '') {
  let fValue = convertCPUFractionalToF(value)
  let result = {value: 0, unit: ''}
  let u = CPUFractional.find(item => item.label === unit)
  result.value = Math.round(fValue / u.value * 100) / 100
  result.unit = u.label
  return result
}
const convertStorageUnitToByte = function (value) {
  let unitValue = -1
  let unitMap
  if (/^[0-9]+$/.test(value)) {
    unitValue = parseFloat(value, 10)
  } else if (value.endsWith('i')) {
    unitMap = storageUnit.find((item) => {
      return item.label === value.substr(-2)
    })
  } else {
    unitMap = storageUnitFixedPoint.find((item) => {
      return item.label === value.substr(-2)
    })
  }
  if (unitMap) {
    unitValue = parseFloat(value, 10) * unitMap.value
  }
  return unitValue
}
const convertCPUFractionalToF = function (value) {
  let f = CPUFractional.find(item => item.label === value.substr(-1))
  let result = 0
  if (f) {
    result = parseFloat(value, 10) * f.value
  } else {
    result = parseFloat(value, 10) * CPUFractional[0].value
  }
  return result
}
const resourceHandlerMap = {
  memory: {
    uniformUnit (total, requested) {
      return {
        total: convertStorageUnitToByte(total),
        used: convertStorageUnitToByte(requested)
      }
    },
    formatValue (total, requested) {
      let totalValue = formatStorageValue(total)
      let requestedValue = formatStorageValue(requested, totalValue.unit)
      return {
        total: totalValue.value,
        used: requestedValue.value,
        unit: totalValue.unit
      }
    }
  },
  cpu: {
    uniformUnit (total, requested) {
      return {
        total: convertCPUFractionalToF(total),
        used: convertCPUFractionalToF(requested)
      }
    },
    formatValue (total, requested) {
      let totalValue = formatCPUFractional(total)
      let requestedValue = formatCPUFractional(requested, totalValue.unit)
      return {
        total: totalValue.value,
        used: requestedValue.value,
        unit: totalValue.unit
      }
    }
  },
  default: {
    uniformUnit (total, requested) {
      return {
        total: parseFloat(total, 10),
        used: parseFloat(requested, 10)
      }
    },
    formatValue (total, requested) {
      return {
        total: total,
        used: requested,
        unit: ''
      }
    }
  }
}
export default {
  name: 'overviewContainer',
  data () {
    return {
      loading: false,
      statusList: [],
      resourceUsageList: []
    }
  },
  created () {
    if (typeof (EventSource) !== 'undefined') {
      this.initEventSource()
    }
  },
  methods: {
    initEventSource () {
      this.loading = true
      this.eventSource = new EventSource(EVENT_SOURCE_URL)
      this.eventSource.onmessage = (e) => {
        this.loading = false
        let data = JSON.parse(e.data).data
        if (data.length === 0) {
          return
        }
        let statuses = data[0].componentStatuses.items.map((item) => {
          return {status: item.conditions[0].status, name: item.metadata.name, selfLink: item.metadata.selfLink}
        })

        let totalResource = data[0].resources.allocatable
        let requestedResource = data[0].resources.requested
        let usages = Object.entries(totalResource).map((item, index) => {
          let h = resourceHandlerMap[item[0]]
          if (!h) {
            h = resourceHandlerMap['default']
          }
          let temp = h.uniformUnit(item[1], requestedResource[item[0]])
          let valueFormated = h.formatValue(item[1], requestedResource[item[0]])
          return {
            id: item[0] + '_' + index,
            total: temp.total,
            used: temp.used,
            name: item[0],
            totalFormated: valueFormated.total,
            usedFormated: valueFormated.used,
            unit: valueFormated.unit
          }
        })
        this.statusList = this.processEtcdStatus(statuses)
        this.resourceUsageList = usages
      }
      this.eventSource.onerror = () => {
        this.loading = false
        if (isTimeout()) {
          fedLogout()
        }
      }
    },
    processEtcdStatus (statuses) {
      let etcdReg = /^etcd-\d+$/
      let etcdStatuses = statuses.filter(item => {
        return etcdReg.test(item.name)
      })
      if (etcdStatuses.length === 0) {
        return statuses
      }
      let status = 'True'
      if (etcdStatuses.every(item => item.status === 'False') || etcdStatuses.some(item => item.status === 'False') || etcdStatuses.some(item => item.status === 'Unknown')) {
        status = 'False'
      } else if (etcdStatuses.every(item => item.status === 'Unknown')) {
        status = 'Unknown'
      }
      let result = statuses.filter(item => {
        return !etcdReg.test(item.name)
      })
      result.push({status: status, name: 'etcd', selfLink: etcdStatuses[0].selfLink})
      return result
    }
  },
  components: {
    statusList,
    resourceUsageList
  }
}
</script>
