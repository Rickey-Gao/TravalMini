var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0,
    markers: '',
    polyline: 
      [
        //连线数组，可以定义n个线
        {
          points: [
          {
            latitude: 31.2341053138,
            longitude: 121.6653442383,
          },
          {
            latitude: 31.1393664108,
            longitude: 121.6667175293,
          },
          {
            latitude: 31.2147100098,
            longitude: 121.5533351898,
          }, 
          {
            latitude: 31.2391507432,
            longitude: 121.4998626709,
          }
          ],
          color: "#228B22",
          width: 6,
          arrowLine:true
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     that.setData({
       markers: common.markers
     })
     wx.getLocation({
      success: (res)=> {
        this.setData({
          longitude : res.longitude,
          latitude : res.latitude
        });
        console.log(res.longitude);
        console.log(res.latitude)
      },
     })
     wx.getSystemInfo({ 
      success: (res)=> {
        this.setData({
          //控件列表
          controls: [
            {
              //获取当前定位
              id : 1,
              iconPath : "/images/location1.png",
              position : {
                width : 30,
                height : 30,
                left : 20,
                top : res.windowHeight - 65
              },
              clickable : true
            },{
              //照相记录
              id : 2,
              iconPath : "/images/camera.png",
              position : {
                width : 50,
                height: 50,
                left : res.windowWidth/2 - 25,
                top : res.windowHeight - 80
              },
              clickable : true   
            },{
              //我的页面
              id: 3,
              iconPath: "/images/avatar1.png",
              position: {
                width: 30,
                height: 30,
                left: res.screenWidth - 60,
                top: res.windowHeight - 68
              },
              clickable: true
            },{
              //反馈意见
              id: 4,
              iconPath: "/images/warn1.png",
              position: {
                width: 30,
                height: 30,
                left: 20,
                top: 20
              },
              clickable: true
            },{
              id: 5,
              iconPath: "/images/mylocation.png",
              position: {
                width: 30,
                height: 30,
                left: res.windowWidth / 2 - 10,
                top: res.windowHeight / 2 - 30
            }
          }]
        })
      },
     }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  movetoCenter: function () {
    this.mapctx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapctx = wx.createMapContext("map");
    this.movetoCenter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  //点击标记
  markertap(e) {
    console.log(e.markeId);
  },

  //点击标记的气泡
  bindcallouttap(e) {
    console.log("bindcallouttap ,id :  " + e.markerId);
  },

  //点击控件时触发
  bindcontroltap: function (e) {
    switch (e.controlId) {
      case 1:
        //移到当前位置
        this.movetoCenter();
        break;
      case 2:
        //照相记录
        wx.chooseImage({
          count: 1, // 默认9
          // 可以指定是原图还是压缩图，默认二者都有
          sizeType: ['original', 'compressed'],
          // 可以指定来源是相册还是相机，默认二者都有
          sourceType: ['album', 'camera'],
          // 返回选定照片的本地文件路径列表，tempFilePath可作为img标签的src属性显示图片
          success: function (res) {
            var tempFilePaths = res.tempFilePaths
          }
        })
        break;
      case 3:
        //我的
        wx.navigateTo({
          url: '../picture/picture',
        })
        break;
      case 4:
        //反馈页面
        wx.navigateTo({
          url: '../warn/index',
        })
        break;

    }
  }
})