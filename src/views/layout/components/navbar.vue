<template>
<div class="navbar">
  <el-menu mode="horizontal" :default-active="$route.path" :router="true" background-color="#0075a8" text-color="#fff" active-text-color="#fff">
    <custom-menu-item index="/overview">Overview</custom-menu-item>
    <custom-menu-item index="/infra">Infra</custom-menu-item>
    <custom-menu-item index="/apps">Apps</custom-menu-item>

  </el-menu>
</div>
</template>
<script>
import Vue from 'vue'
import {MenuItem} from 'element-ui'
let CustomMenuItem = Vue.extend({
  ...MenuItem,
  computed: {
    ...MenuItem.computed,
    backgroundColor () {
      return this.active ? '#00558b' : this.rootMenu.backgroundColor || ''
    },
    itemStyle () {
      const style = {
        color: this.active ? this.activeTextColor : this.textColor
      }
      if (this.mode === 'horizontal' && !this.isNested) {
        style.borderBottomColor = this.active ? 'rgb(16, 142, 185)' : 'transparent'
        return style
      }
    }
  }
})
export default {
  name: 'navbar',
  components: {
    CustomMenuItem
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 4px solid rgb(16, 142, 185);
}
.el-menu--horizontal>.el-menu-item {
  height: 80px;
  line-height: 80px;
  border-bottom: 4px solid transparent
}
</style>
