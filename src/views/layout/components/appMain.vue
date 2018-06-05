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
    return this.$route.fullPath
  }
}
</script>
