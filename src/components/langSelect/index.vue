<template>
  <el-dropdown trigger="click" @command="handleSetLanguage" class='international'>
  <span class="el-dropdown-link">
    <svg-icon class-name='international-icon' icon-class="cube-icon-language"></svg-icon>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>

  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
import {Message} from 'element-ui'
import Cookies from 'js-cookie'
export default {
  name: 'langSelect',
  data () {
    return {
      language: Cookies.get('language') || 'zh'
    }
  },
  methods: {
    handleSetLanguage (lang) {
      this.$i18n.locale = lang
      this.language = lang
      Cookies.set('language', lang)
      Message({
        message: 'switch language success',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .international-icon {
    font-size: 18px;
    cursor: pointer;
  }
</style>
