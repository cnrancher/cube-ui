<template>
  <div class="overview-resource-usage">
    <chart ref="chart" :option="chartOption" :width="width" :height="height"></chart>
  </div>
</template>
<script>
import chart from '@/components/charts/index'

export default {
  name: 'overviewResourceUsage',
  data () {
    return {
      width: '400px',
      height: '400px',
      option: {
        series: [
          {
            name: 'resource-usage',
            type: 'gauge',
            radius: '70%',
            splitNumber: 0,
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: [
                  [0, '#409EFF'],
                  [1, '#DCDFE6']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            spliteLine: {
              show: false
            },
            detail: {
              // formatter (value) => {
              //   return value
              // },
              offsetCenter: [0, 0],
              fontSize: 18,
              rich: {
                percent: {
                  fontSize: 55,
                  lineHeight: 65,
                  color: '#303133'
                },
                name: {
                  fontSize: 20,
                  lineHeight: 40,
                  color: '#606266'
                },
                detail: {
                  fontSize: 20,
                  color: '#606266'
                }
              }
            },
            data: []
          }
        ]
      },
      colors: [
        {value: 0.8, color: '#409EFF'},
        {value: 0.9, color: '#E6A23C'},
        {value: 1, color: '#F56C6C'}
      ]
    }
  },
  props: {
    total: {
      type: Number,
      required: true
    },
    used: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    totalFormated: {
      type: [String, Number],
      required: true
    },
    usedFormated: {
      type: [String, Number],
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  computed: {
    ratio () {
      return parseFloat(this.width, 10) / 400
    },
    chartOption () {
      let opt = Object.assign({}, this.option)
      opt.series[0].data = [{
        name: this.name,
        value: this.used
      }]
      let p = 0
      if (this.total !== 0) {
        p = Math.round((this.used / this.total) * 100)
      }
      opt.series[0].max = this.total
      opt.series[0].axisLine.lineStyle.color[0][0] = this.total === 0 ? 0 : this.used / this.total
      opt.series[0].axisLine.lineStyle.color[0][1] = this.detectionData(p)
      let detail = [
        '{percent|' + p + '%}',
        '{name|' + this.$t('page.overview.' + this.name) + '}',
        '{detail|' + this.detail + '}'
      ].join('\n')
      opt.series[0].detail.formatter = (value) => {
        return detail
      }
      let chartDetail = opt.series[0].detail
      chartDetail.formatter = (value) => {
        return detail
      }
      chartDetail.fontSize = 18 * this.ratio
      chartDetail.rich.percent.fontSize = 55 * this.ratio
      chartDetail.rich.percent.lineHeight = 65 * this.ratio
      chartDetail.rich.name.fontSize = 20 * this.ratio
      chartDetail.rich.name.lineHeight = 40 * this.ratio
      chartDetail.rich.detail.fontSize = 20 * this.ratio
      return opt
    },
    detail () {
      return this.$t('page.overview.subtitle', {total: this.totalFormated + this.unit, used: this.usedFormated})
    }
  },
  methods: {
    detectionData (value) {
      let color = this.colors[0].color
      for (let i = 0; i < this.colors.length; i++) {
        if (value < this.colors[i].value) {
          color = this.colors[i].color
          break
        }
      }
      return color
    },
    resize () {
      this.width = window.getComputedStyle(this.$el).width
      this.height = this.width
      this.$refs.chart.resize()
    }
  },
  components: {
    chart
  }
}
</script>
