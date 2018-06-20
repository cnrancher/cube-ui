<template>
<div class="overview-resource-list">
  <div class="overview-resource-list__title">
    {{$t('page.overview.resourceUsageTitle')}}
  </div>
  <div class="overview-resource-list__content">
    <el-row>
      <el-col v-for="u in usages" :key="u.id" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <usage ref="chart"  :total="u.total" :used="u.used" :name="u.name" :total-formated="u.totalFormated" :used-formated="u.usedFormated" :unit="u.unit"></usage>
      </el-col>
    </el-row>

  </div>
</div>
</template>

<script>
import usage from './usage'
export default {
  name: 'overviewResourceList',
  props: {
    usages: {
      type: Array,
      required: true
    }
  },
  watch: {
    usages () {
      this.__resizeHanlder()
    }
  },
  mounted () {
    this.__resizeHanlder = () => {
      this.$nextTick(() => {
        this.$refs.chart.forEach((chart) => {
          chart.resize()
        })
      })
    }
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHanlder)
  },
  components: {
    usage
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.overview-resource-list__title {
  font-size: 21px;
  color: #34495E;
  font-weight: 400;
  border-bottom: solid 2px #ecf0f1;
  margin: 0 0 16.5px;
  padding: 15px 0;
}
</style>
