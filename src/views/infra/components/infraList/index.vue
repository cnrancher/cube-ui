<template>
  <div class="infra-list">
    <infra v-for="infra in infras" @deploy='handleDeploy' :key="infra.name" :icon="infra.icon" :kind="infra.kind" :url="infra.url" :name="infra.name" :desc="infra.desc" :state="infra.state" :status="infra.status"></infra>
  </div>
</template>

<script>
import infra from './infra'
export default {
  name: 'infraContainer',
  props: {
    infras: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDeploy (name) {
      this.$emit('deploy', name)
    }
  },
  components: {
    infra
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .infra-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
