<template>
<infra-list @deploy="handleDeploy" :infras="infras"></infra-list>
</template>
<script>
import infraList from './components/infraList/index'
import {fetchList, fetchState, deploy} from '@/api/infra'
import axios from 'axios'

export default {
  name: 'infraContainer',
  data () {
    return {
      infras: [],
      timer: null,
      source: axios.CancelToken.source()
    }
  },
  computed: {
    pollingInfras () {
      return this.infras.filter(item => item.status === 'True' && item.state !== 'Healthy')
    }
  },
  created () {
    this.loadData()
    this.pollInfras()
  },
  methods: {
    loadData () {
      fetchList().then((resp) => {
        let data = resp.data.baseinfo
        this.infras = data
      })
    },
    handleDeploy (name) {
      let infra = this.infras.find(item => item.name === name)
      if (infra) {
        deploy(infra.url, {kind: infra.kind}).then((resp) => {
          let d = resp.data[resp.data.type]
          this.changeState(name, d.status.state || 'UnHealthy', 'True')
        }).catch(() => {
          this.changeState(name, 'UnHealthy', 'True')
        })
      }
    },
    changeState (name, state = '', status = 'True') {
      let index = this.infras.findIndex(item => item.name === name)
      if (index > -1 && this.infras[index].state !== state) {
        this.infras.splice(index, 1, {...this.infras[index], state: state, status: status})
      }
    },
    pollInfras () {
      clearTimeout(this.timer)
      let promises = this.pollingInfras.map(item => {
        return fetchState(item.url + '/' + item.kind, this.source.token)
      })
      if (promises.length === 0) {
        setTimeout(() => this.pollInfras(), 5000)
        return
      }
      axios.all(promises).then(axios.spread((...rest) => {
        let items = rest.map((item, index) => {
          let d = item.data[item.data.type]
          return {name: d.spec.infraKind, state: d.status.state}
        })
        items.forEach((item) => {
          this.changeState(item.name, item.state)
        })
        setTimeout(() => this.pollInfras(), 5000)
      })).catch((...errs) => {
        if (!errs.some(err => axios.isCancel(err))) {
          setTimeout(() => this.pollInfras(), 5000)
        }
      })
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.source.cancel('Operation canceled.')
  },
  components: {
    infraList
  }
}
</script>
