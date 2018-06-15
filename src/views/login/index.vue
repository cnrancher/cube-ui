<template>
  <div class="login">
    <div class="login__container">
      <div class="login__title-container">
        <div class="login__title">{{$t('page.login.title')}}</div>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form ref="loginForm" :model="loginForm" label-position="top" class="login__form" :rules="loginRules">
        <el-form-item :label="$t('entity.user.username')" prop="username">
          <el-input v-model="loginForm.username" type="text" :placeholder="$t('placeholder.input', [$t('entity.user.username')])" @keyup.enter.native="handleLogin" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item :label="$t('entity.user.password')" prop="password">
          <el-input type="password" v-model="loginForm.password" :placeholder="$t('placeholder.input', [$t('entity.user.password')])" @keyup.enter.native="handleLogin" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('action.login')}}</el-button>
      </el-form>
      <div class="login__error" v-show="errorMessage">
        {{errorMessage}}
      </div>
    </div>
  </div>
</template>
<script>
import {loginByUsername} from '@/api/login'
import langSelect from '@/components/langSelect/index'
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      errorMessage: '',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', message: this.$t('error.required', [this.$t('entity.user.username')])}],
        password: [{required: true, trigger: 'blur', message: this.$t('error.required', [this.$t('entity.user.password')])}]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const u = this.loginForm.username
          const p = this.loginForm.password

          loginByUsername(u, p).then(resp => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(error => {
            this.loading = false
            this.errorMessage = this.$t('message.loginError')
            console.log(error) // for debugs
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    langSelect
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .login__container {
    width: 300px;
    .el-form--label-top .el-form-item__label {
      padding: 0 0;
    }
  }
  .login__title-container {
    position: relative;
    .login__title {
      font-size: 18px;
      font-weight: bold;
      color: #34495E;
      text-align: center;
    }
    .set-language {
      color: #34495E;
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }

  .login__error {
    color: #f56c6c;
    font-size: 12px;
  }
</style>
