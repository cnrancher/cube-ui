<template>
<div class="navbar">
  <el-menu mode="horizontal" :default-active="$route.path" :router="true" background-color="#0075a8" text-color="#fff" active-text-color="#fff">
    <custom-menu-item index="/overview">{{$t('entity.nav.overview')}}</custom-menu-item>
    <custom-menu-item index="/infra">{{$t('entity.nav.infra')}}</custom-menu-item>
  </el-menu>
  <div class="navbar__right-menu">
    <el-dropdown class="avatar-container right-menu-item" trigger="click" @command="handleCommand">
      <div class="avatar-wrapper">
        <img v-if="avatar" class="user-avatar" :src="avatar">
        <svg-icon v-else class="user-avatar-placeholder" icon-class="cube-icon-avatar"></svg-icon>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">{{$t('action.logout')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</div>
</template>
<script>
import Vue from 'vue'
import {MenuItem} from 'element-ui'
import {logout, fedLogout} from '@/api/login'
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
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          logout().then(() => {
            fedLogout()
          }).catch(() => {
            fedLogout()
          })
          break
        default:
          break
      }
    }
  },
  components: {
    CustomMenuItem
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.navbar {
  position: relative;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 4px solid rgb(16, 142, 185);
}
.el-menu--horizontal>.el-menu-item {
  height: 80px;
  line-height: 80px;
  border-bottom: 4px solid transparent
}
.navbar__right-menu {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-right: 30px;
  .avatar-wrapper {
    cursor: pointer;
    color: #fff;
   .user-avatar {
     width: 40px;
     height: 40px;
     border-radius: 10px;
   }
   .user-avatar-placeholder {
     font-size: 40px;
   }
  }
}
</style>
