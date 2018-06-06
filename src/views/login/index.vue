<template>
  <div class="login">
    <div class="login__container">
      <div class="login__title">
        您好<br>
        欢迎使用
      </div>
      <el-form ref="loginForm" :model="loginForm" label-position="top" class="login__form" :rules="loginRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名" @keyup.enter.native="handleLogin" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="handleLogin" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
      <div class="login__error" v-show="errorMessage">
        {{errorMessage}}
      </div>
    </div>
  </div>
</template>
<script>
import {loginByUsername} from '@/api/login'
import {setLogined} from '@/utils/auth'
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
        username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
        password: [{required: true, trigger: 'blur', message: '密码不能为空'}]
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
            setLogined()
            this.$router.push({ path: '/' })
          }).catch(error => {
            this.loading = false
            this.errorMessage = '登录失败：检查凭据，或者您的帐户可能无权登录。'
            console.log(error) // for debugs
          })
        } else {
          return false
        }
      })
    }
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
  .login__title {
    font-size: 18px;
    font-weight: bold;
    color: #34495E;
    text-align: center;
  }
</style>
