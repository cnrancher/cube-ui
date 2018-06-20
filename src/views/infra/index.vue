<template>
<div class="infra-container" v-loading="loading">
  <infra-list @deploy="handleDeploy" :infras="infras"></infra-list>
</div>

</template>
<script>
import infraList from './components/infraList/index'
import {deploy, EVENT_SOURCE_URL} from '@/api/infra'
import {isTimeout} from '@/utils/auth'
import {fedLogout} from '@/api/login'
export default {
  name: 'infraContainer',
  data () {
    return {
      loading: false,
      infras: [],
      timer: null,
      source: null,
      eventSource: null
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
        let data = JSON.parse(e.data)
        this.infras = data.baseinfo
      }
      this.eventSource.onerror = () => {
        this.loading = false
        if (isTimeout()) {
          fedLogout()
        }
      }
    },
    closeEventSource () {
      if (this.eventSource) {
        this.eventSource.close()
      }
    },
    handleDeploy (name) {
      let infra = this.infras.find(item => item.name === name)
      if (infra) {
        this.changeState(name, 'UnHealthy', 'True')
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
    }
  },
  components: {
    infraList
  }
}
</script>
