<template>
<div class="navbar">
  <el-menu mode="horizontal" :default-active="$route.path" :router="true">
    <el-menu-item index="/overview">Overview</el-menu-item>
    <el-menu-item index="/infra">Infra</el-menu-item>
    <el-menu-item index="/apps">Apps</el-menu-item>
  </el-menu>
</div>
</template>
<script>
export default {
  name: 'navbar'
}
</script>
