<template>
  <div class="overview-status-list">
    <div class="overview-status-list__title">{{$t('page.overview.statusTitle')}}</div>
    <div class="overview-status-list__content">
      <el-row>
        <el-col v-for="status in statuses" :key="status.selfLink" :xs="12" :sm="12" :md="6" :lg="6" :xl="8">
          <component-status :status="status.status" :name="status.name"></component-status>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import componentStatus from './componentStatus'
export default {
  name: 'overviewStatusList',
  props: {
    statuses: {
      type: Array,
      required: true
    }
  },
  components: {
    componentStatus
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.overview-status-list__content {
  min-height: 52px;
}
.overview-status-list__title {
  font-size: 21px;
  color: #34495E;
  font-weight: 400;
  border-bottom: solid 2px #ecf0f1;
  margin: 0 0 16.5px;
  padding: 15px 0;
}
</style>
