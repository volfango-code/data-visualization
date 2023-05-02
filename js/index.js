// 折线图
function lineChart(year) {
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
      data: year.map(item => item.month),
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
        data: year.map(item => item.salary),
        type: 'line',
        smooth: true, //平滑曲线
        lineStyle: {
          width: 6 //线条粗细
        },
        symbolSize: 10, // 小圆圈的大小
        // 区域渐变
        areaStyle: {
          color: {
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

// 饼图 班级薪资分布
function classSalaryChart(salaryData) {
  const myChart = echarts.init(document.querySelector('#salary'))
  const option = {
    title: {
      text: '班级薪资分布',
      top: 15,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '6%',
      left: 'center',
      itemWidth: 15
    },
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        radius: ['50%', '64%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false, // 控制标签（文本）不显示
        },
        labelLine: {
          show: false
        },
        data: salaryData.map(item => {
          return { value: item.g_count + item.b_count, name: item.label }
        })
        // data: [
        //   { value: 1048, name: '1万以下' },
        //   { value: 235, name: '1万-2万' },
        //   { value: 580, name: '1.5万-2万' },
        //   { value: 484, name: '2万以上' }
        // ]
      }
    ]
  }
  myChart.setOption(option)
}

// 班级每组薪资
function classGroupChart(groupData) {
  const myChart = echarts.init(document.querySelector('#lines'))
  const option = {
    grid: {
      left: 70,
      top: 30,
      right: 30,
      bottom: 50
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: groupData[1].map(item => item.name),
      axisLabel: {
        color: '#999'
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: groupData[1].map(item => item.hope_salary),
        type: 'bar',
        name: '期望薪资'
      },
      {
        data: groupData[1].map(item => item.salary),
        type: 'bar',
        name: '就业薪资'
      }
    ],
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#34D39A' // 0% 处的颜色
        }, {
          offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#499FEE' // 0% 处的颜色
        }, {
          offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    ]
  }
  myChart.setOption(option)

  document.querySelector('#btns').addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      // 样式排它
      document.querySelector('#btns .btn-blue').classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
      // 更新图表配置数据
      let index = e.target.innerText
      option.xAxis.data = groupData[index].map(item => item.name)
      option.series[0].data = groupData[index].map(item => item.hope_salary)
      option.series[1].data = groupData[index].map(item => item.salary)
      // 重新配置
      myChart.setOption(option)
    }
  })
}

//男女生薪资分布
function genderSalaryChart(salaryData) {
  const myChart = echarts.init(document.querySelector('#gender'))
  const option = {
    title: [
      {
        text: '男女生薪资分布',
        top: 15,
        left: 10,
        textStyle: {
          fontSize: 16
        }
      },
      {
        text: '男生',
        top: '50%',
        left: '45%',
        textStyle: {
          fontSize: 12
        }
      },
      {
        text: '女生',
        top: '88%',
        left: '45%',
        textStyle: {
          fontSize: 12
        }
      }
    ],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '男生薪资分布',
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '30%'],
        data: salaryData.map(item => {
          return { value: item.b_count, name: item.label }
        })
        // data: [
        //   { value: 1048, name: '1万以下' },
        //   { value: 235, name: '1万-2万' },
        //   { value: 580, name: '1.5万-2万' },
        //   { value: 484, name: '2万以上' }
        // ]
      },
      {
        name: '女生薪资分布',
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '70%'],
        data: salaryData.map(item => {
          return { value: item.g_count, name: item.label }
        })
        // data: [
        //   { value: 1048, name: '1万以下' },
        //   { value: 235, name: '1万-2万' },
        //   { value: 580, name: '1.5万-2万' },
        //   { value: 484, name: '2万以上' }
        // ]
      }
    ]
  }
  myChart.setOption(option)
}

// 地图
function mapChart(provinceData) {
  const mapData = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 }
  ]

  // 处理地图数据
  mapData.forEach(item => {
    let current = provinceData.find(e => e.name.includes(item.name))
    if (current) item.value = current.value
  })

  const myChart = echarts.init(document.querySelector('#map'))
  const option = {
    title: {
      text: '籍贯分布',
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      textStyle: {
        color: '#fff'
      },
      borderWidth: 0,
      formatter: '{b} - {c}'
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        map: 'china',
        data: mapData,
        label: {
          show: true,
          fontSize: 10,
          color: 'rgba(0,0,0,0.7)'
        },
        itemStyle: {
          borderColor: 'rgba(0,0,0,0.2)',
          areaColor: '#E0FFFF'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#34D39A',
            borderWidth: 0,
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      }
    ],
    // 视觉映射
    visualMap: {
      type: 'continuous', // 连续型
      max: 20,
      min: 0,
      text: [20, 0],
      left: 15,
      bottom: 10,
      inRange: { color: ['#fff', '#0075F0'] } // 根据数值从小到大的颜色
    }
  }
  myChart.setOption(option)
}

// 数据渲染
async function render() {

  const result = await axios({
    url: '/dashboard'
  })

  console.log(result);

  const { groupData, overview, provinceData, salaryData, year } = result.data.data

  for (let key in overview) {
    document.querySelector(`[name=${key}]`).innerHTML = overview[key]
  }

  // 折线图
  lineChart(year)

  // 饼图 班级薪资分布
  classSalaryChart(salaryData)

  // 班级每组薪资
  classGroupChart(groupData)

  // 男女生薪资分布
  genderSalaryChart(salaryData)

  // 地图
  mapChart(provinceData)
}
render()