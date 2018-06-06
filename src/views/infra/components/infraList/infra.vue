<template>
  <el-card class="infra" :body-style="{ padding: '0px' }">
    <div class="infra__logo"><img :src="icon"/></div>
    <div class="infra__content">
      <div class="infra__name">{{name}}</div>
      <div class="infra__desc">{{desc}}</div>
      <div class="infra__action"><el-button :type="btnType" :loading="loading" :disabled="disabled" @click="handleAction">{{actionMsg}}</el-button></div>
    </div>
  </el-card>
</template>
<script>
import {Message} from 'element-ui'
import {fetchState} from '@/api/infra'
export default {
  name: 'infra',
  data () {
    return {
      disabled: false
    }
  },
  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    kind: {
      type: String
    },
    desc: {
      type: String
    },
    status: {
      type: String
    },
    state: {
      type: String
    },
    url: {
      type: String
    }
  },
  computed: {
    btnType () {
      let type = 'primary'
      if ((this.status === 'True' && this.state !== 'Healthy') || this.status !== 'True') {
        type = 'warning'
      }
      return type
    },
    actionMsg () {
      if (this.status === 'True') {
        if (this.state === 'Healthy') {
          return 'View Console'
        } else {
          return this.state
        }
      } else {
        return 'Deploy'
      }
    },
    loading () {
      return this.status === 'True' && this.state !== 'Healthy'
    }
  },
  methods: {
    handleAction () {
      if (this.status === 'True' && this.state === 'Healthy') {
        this.disabled = true
        fetchState(this.url + '/' + this.kind).then((resp) => {
          let data = resp.data
          this.disabled = false
          window.open('http://' + data.host)
        }).catch((error) => {
          this.disabled = false
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
        })
      } else if (this.status === 'False') {
        this.$emit('deploy', this.name)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.infra {
  width: 300px;
  height: 400px;
  margin: 10px 10px;
}
.infra__logo {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
}

.infra__content {
  height: 300px;
  background-color: #F2F6FC;
}
.infra__name, .infra__action {
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.infra__desc {
  height: 50%;
  padding: 0 20px;
  /*white-space: nowrap;*/
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
