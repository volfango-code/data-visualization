// 折线图
function lineChart() {
  //  初始化
  const myChart = echarts.init(document.querySelector('#line'))
  // 配置对象
  const option = {
    // 标题
    title: {
      text: '2022全学科薪资走势',
      top: 15,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    // x轴配置
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        // 轴线文字颜色
        color: '#999'
      },
      // 轴线颜色、轴线类型（虚线）
      axisLine: {
        lineStyle: {
          color: '#ccc',
          type: 'dashed'
        }
      }
    },
    // y轴配置
    yAxis: {
      type: 'value',
      // y轴分隔线的样式
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    // 图表数据
    series: [
      {
        data: [9000, 12000, 15000, 13000, 10000, 18000, 14000, 10000, 12000, 13000, 15000, 19000],
        type: 'line',
        smooth: true, //平滑曲线
        lineStyle: {
          width: 6 //线条粗细
        },
        symbolSize: 10, // 小圆圈的大小
        // 区域渐变
        areaStyle: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0, color: '#499FEE' // 0% 处的颜色
            },
            {
              offset: 0.8, color: 'rgba(255,255,255,0.2)'
            },
            {
              offset: 1, color: 'rgba(255,255,255,0)'
            }
          ],
          global: false // 缺省为 false
        }
      }
    ],
    // 提示触发方式
    tooltip: {
      // 默认为item，鼠标放到具体项才提示，可选axis，鼠标放到轴上即可提示
      trigger: 'axis'
    },
    // 网格设置
    grid: {
      top: '20%'
    },
    // 线条颜色
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#499FEE' // 0% 处的颜色
      }, {
        offset: 1, color: '#5D75F0' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
  }
  // 设置配置
  myChart.setOption(option)
}
lineChart()