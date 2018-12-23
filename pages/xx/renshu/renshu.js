var myCharts = require("../../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_num = null
var app = getApp()

Page({
  data:{},
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  convert: function () {
    var categories = [];
    var num = [];
    var length = app.globalData.num.datapoints.length
  for (var i = 0; i < length; i++) {
      categories.push(app.globalData.num.datapoints[i].at.slice(11, 19));
      num.push(app.globalData.num.datapoints[i].value);}
    return {
      categories: categories,
      num:num
    }
},
  onLoad: function () {
    var wheatherData = this.convert();

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();
    lineChart_num = new myCharts({
      canvasId: 'num',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'num',
        data: wheatherData.num,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'num ',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 55
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
}
)