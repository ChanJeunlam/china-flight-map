"use client"
import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import chinaGeoJson from "./china.json"

const chinaGeoCoordMap = {
  黑龙江: [127.9688, 45.368],
  内蒙古: [110.3467, 41.4899],
  吉林: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  重庆: [108.384366, 30.439702],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  上海: [121.4648, 31.2891],
  台湾: [121.509062, 25.044332],
  南海诸岛: [114.0, 16.0], // 添加南海诸岛坐标
}

const chinaDatas = [
  [{ name: "黑龙江", value: 0 }],
  [{ name: "内蒙古", value: 0 }],
  [{ name: "吉林", value: 0 }],
  [{ name: "辽宁", value: 0 }],
  [{ name: "河北", value: 0 }],
  [{ name: "天津", value: 0 }],
  [{ name: "山西", value: 0 }],
  [{ name: "陕西", value: 0 }],
  [{ name: "甘肃", value: 0 }],
  [{ name: "宁夏", value: 0 }],
  [{ name: "青海", value: 0 }],
  [{ name: "新疆", value: 0 }],
  [{ name: "西藏", value: 0 }],
  [{ name: "四川", value: 0 }],
  [{ name: "重庆", value: 0 }],
  [{ name: "山东", value: 0 }],
  [{ name: "河南", value: 0 }],
  [{ name: "江苏", value: 0 }],
  [{ name: "安徽", value: 0 }],
  [{ name: "湖北", value: 0 }],
  [{ name: "浙江", value: 0 }],
  [{ name: "福建", value: 0 }],
  [{ name: "江西", value: 0 }],
  [{ name: "湖南", value: 0 }],
  [{ name: "贵州", value: 0 }],
  [{ name: "广西", value: 0 }],
  [{ name: "海南", value: 0 }],
  [{ name: "北京市", value: 1 }],
]

const convertData = (data) => {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = chinaGeoCoordMap[dataItem[0].name]
    var toCoord = [121.4648, 31.2891] // 上海坐标
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: toCoord,
        },
        {
          coord: fromCoord,
          value: dataItem[0].value,
        },
      ])
    }
  }
  return res
}

const Component = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chartDom = chartRef.current
    if (!chartDom) return

    // 设置容器样式以填充整个屏幕
    chartDom.style.width = "100vw"
    chartDom.style.height = "100vh"
    chartDom.style.position = "fixed"
    chartDom.style.top = "0"
    chartDom.style.left = "0"

    const myChart = echarts.init(chartDom)

    // 注册地图数据
    echarts.registerMap("china", chinaGeoJson)

    // 准备系列数据
    const series = []

    // 添加飞线数据
    ;[["上海", chinaDatas]].forEach((item) => {
      series.push(
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: "arrow", // 箭头图标
            symbolSize: 5, // 图标大小
            color: "#FF5722", // 橙红色
          },
          lineStyle: {
            normal: {
              width: 1, // 尾迹线条宽度
              opacity: 1, // 尾迹线条透明度
              curveness: 0.3, // 尾迹线条曲直度
              color: "#FF5722", // 橙红色
            },
          },
          data: convertData(item[1]),
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            // 涟漪特效
            period: 4, // 动画时间，值越小速度越快
            brushType: "stroke", // 波纹绘制方式 stroke, fill
            scale: 4, // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: false,
              position: "right", // 显示位置
              offset: [5, 0], // 偏移设置
              formatter: (params) => {
                // 圆环显示文字
                return params.data.name
              },
              fontSize: 13,
            },
            emphasis: {
              show: true,
            },
          },
          symbol: "circle",
          symbolSize: (val) => {
            return 5 + val[2] * 5 // 圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: "#FF5722", // 橙红色
            },
          },
          data: item[1].map((dataItem) => ({
            name: dataItem[0].name,
            value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
          })),
        },
      )
    })

    const option = {
      backgroundColor: "#181F4E",
      title: {
        text: "中国航线图",
        subtext: "全国各省通往上海的航线",
        left: "center",
        top: 20,
        textStyle: {
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        },
        subtextStyle: {
          color: "#ccc",
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      color: ["#FF5722"], // 橙红色
      geo: {
        map: "china",
        zoom: 1.2,
        center: [105, 36], // 居中显示中国地图
        top: 80, // 为标题留出空间
        left: "center",
        roam: false, // 禁止缩放和平移
        label: {
          show: true, // 显示省份名称
          color: "#fff", // 白色文字
          fontSize: 10, // 字体大小
          textStyle: {
            color: "#fff", // 确保文字颜色为白色
            fontSize: 10, // 字体大小
            textShadow: "0 0 3px rgba(0, 0, 0, 0.5)", // 文字阴影
          },
        },
        itemStyle: {
          areaColor: "transparent",
          borderColor: "#00ffff",
          borderWidth: 1.5,
          shadowColor: "#00ffff",
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 10,
        },
        emphasis: {
          label: {
            show: true,
            color: "#fff",
            fontSize: 12,
          },
          itemStyle: {
            areaColor: "rgba(0,255,255,.1)",
          },
        },
        // 移除台湾的隐藏设置，保留南海诸岛
        regions: [
          {
            name: "台湾",
            itemStyle: {
              areaColor: "transparent",
              borderColor: "#00ffff",
              borderWidth: 1.5,
            },
            label: {
              show: true,
              color: "#fff",
            },
          },
        ],
      },
      series: series,
    }

    myChart.setOption(option)

    // 窗口大小变化时重新调整图表大小
    window.addEventListener("resize", () => {
      myChart.resize()
    })

    return () => {
      window.removeEventListener("resize", () => {
        myChart.resize()
      })
      myChart.dispose()
    }
  }, [])

  return <div ref={chartRef} />
}

export default Component
