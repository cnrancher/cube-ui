<template>
<div :class="className" :style="{width: width, height: height}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'charts',
  props: {
    option: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    option (newOption) {
      this.chart.setOption(newOption, true)
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el)
      this.chart.setOption(this.option)
    },
    resize (opts) {
      this.$nextTick(() => {
        if (this.chart) {
          if (opts) {
            this.chart.resize(opts)
          } else {
            this.chart.resize()
          }
        }
      })
    }
  }
}

</script>
