<template>
<div class="overview-component-status" :class="className">
  <div class="overview-component-status__icon">
    <svg-icon :icon-class="icon"></svg-icon>
  </div>
  <div class="overview-component-status__name">{{name}}</div>
</div>
</template>
<script>

let statusMap = {
  'True': {
    className: 'overview-component-status--success',
    icon: 'cube-icon-success'
  },
  'False': {
    className: 'overview-component-status--warn',
    icon: 'cube-icon-warn'
  },
  'Unknown': {
    className: 'overview-component-status--unknown',
    icon: 'cube-icon-unknown'
  }
}

export default {
  name: 'overviewComponentStatus',
  props: {
    status: {
      type: String,
      default: 'Unknown'
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    icon () {
      return statusMap[this.status].icon
    },
    className () {
      return statusMap[this.status].className
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .overview-component-status {
    font-size: 16px;
    line-height: 40px;
    white-space: nowrap;
    border: 1px solid rgba(64,158,255,.2);
    display: flex;
    margin: 0 10px 10px 10px;
  }
  .overview-component-status + .overview-component-status {
    margin-left: 10px;
  }
  .overview-component-status__icon {
    width: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overview-component-status__name {
    padding: 0 10px;
  }
  .overview-component-status--success {
    border-color:rgba(103,194,58,.2);
    .overview-component-status__icon {
      color: #67c23a;
      background-color:rgba(103,194,58,.1);
    }
  }
  .overview-component-status--warn {
    border-color:rgba(230,162,60,.2);
    .overview-component-status__icon {
      color: #e6a23c;
      background-color:rgba(230,162,60,.1);
    }
  }
  .overview-component-status--unknown {
    border-color:hsla(0,87%,69%,.2);
    .overview-component-status__icon {
      color: #f56c6c;
      background-color:hsla(0,87%,69%,.1);
    }
  }
</style>
