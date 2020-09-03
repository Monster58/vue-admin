<template>
  <div>
    <my-breadcrumb :breadcrumb="['数据统计', '数据报表']"></my-breadcrumb>
    <el-card>
      <div ref="echartsDom" id="main" style="width: 100%;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getReportsAjax } from "../../api/index";
export default {
  data() {
    return {
      option: {
        title: {
          text: "数据报表"
        },
        tooltip: {},
        legend: {
          data: ["华东", "华南", "华北", "西部", "其他"]
        },
        xAxis: [
          {
            data: [
              "2017-12-27",
              "2017-12-28",
              "2017-12-29",
              "2017-12-30",
              "2017-12-31",
              "2018-1-1"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "华东",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [2999, 3111, 4100, 3565, 3528, 6000]
          },
          {
            name: "华南",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [5090, 2500, 3400, 6000, 6400, 7800]
          },
          {
            name: "华北",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [6888, 4000, 8010, 12321, 13928, 12984]
          },
          {
            name: "西部",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [9991, 4130, 7777, 12903, 13098, 14028]
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [15212, 5800, 10241, 14821, 15982, 14091]
          }
        ]
      }
    };
  },
  methods: {
    initEcharts() {
      let myChart = echarts.init(this.$refs["echartsDom"]);
      myChart.setOption(this.option);
    }
  },
  mounted() {
    getReportsAjax().then(res => {
      if (res.meta.status == 200) {
        this.option = Object.assign(this.option, res.data);
        this.initEcharts();
      } else {
        this.$message.error(res.meta.msg);
      }
    });
  }
};
</script>

<style lang="stylus" scoped></style>
