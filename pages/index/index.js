//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hidden:true,
    ttt:"",
    co:"greenX",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  func:function(){
      this.setData({
        hidden:false,
       
      })

    var mythis=this;
      const requestTask=wx.request(
        {
          url: 'https://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=UVhnNKTqWO2c5HHSzNLTRWXoH6fpKoCk',
          header:{
            'content-type':
            'application/json',
          },
          success: function(res){
            var st = res.data.results[0].pm25;
            console.log(res);
            if(st>100&&st<300)
            {
              mythis.setData({
                ttt:"空气有点差，不要进行剧烈室外运动",
                co:"YellowX"
                })
            }
            else if(st<=100)
            {
              mythis.setData(
                {ttt:"空气很好，尽情运动吧。"
                
                })
            }
            else
            {
              mythis.setData({
              ttt:"还是乖乖睡觉吧",
              co: "RedX"
              })
            }
           
          },
          fail: function (res) {
            console.log("fail!!!")
          },

          complete: function (res) {
            console.log("end")
          }
        }
      )
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }, 
  getDataFromOneNet: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/503135834/datapoints?datastream_id=num&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'ndDzDA=1nFUl9sT4nEYAtAnTAKo='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.num = res.data.data.datastreams[0]
        console.log(res)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '../xx/renshu/renshu',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
