<template>
<section class="app-main">
 <transition name="fade-transform" mode="out-in">
   <keep-alive>
     <router-view :key="key"></router-view>
   </keep-alive>
 </transition>
</section>
</template>
<script>
export default {
  name: 'appMain',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-main {
  margin: 24px 24px;
}
</style>
