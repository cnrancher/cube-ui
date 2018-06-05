<template>
<div class="layout app-wrapper">
  <div class="layout__container app-container">
    <navbar></navbar>
    <app-main></app-main>
  </div>
</div>
</template>
<script>
import {navbar, appMain} from './components'
export default {
  name: 'layout',
  components: {
    navbar,
    appMain
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-wrapper {
  height: 100%;
  width: 100%;
}
</style>
