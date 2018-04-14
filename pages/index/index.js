// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0,
    markers: [
      {
        id: 1,
        latitude: 31.2341053138,
        longitude: 121.6653442383,
        name: '中国银联',
        iconPath:"/images/marker3.png",
        callout: {
          content: "    中国银联，\n 旅行起点，美妙开始的地方",
          color: "#424242",
          fontSize: "12",
          borderRadius: "5",
          bgColor: "#ffffff",
          padding: "10px",
          display: "BYCLICK" ,
          textAlign:"center"
        }
      },
      {
        id: 2,
        latitude: 31.1393664108,
        longitude: 121.6667175293,
        name: '上海迪士尼乐园',
        iconPath: "/images/marker3.png",
        callout: {
          content: "    上海迪士尼乐园，\n 观大千世界游客流量旺 \n 赏自然和谐生灵接如此",
          color: "#424242",
          fontSize: "12",
          borderRadius: "5",
          bgColor: "#ffffff",
          padding: "10px",
          display: "BYCLICK",
          textAlign: "center"
        }
      },
      {
        id: 3,
        latitude: 31.2147100098,
        longitude: 121.5533351898,
        name: '上海世纪公园',
        iconPath: "/images/marker3.png",
      }, {
        id: 4,
        latitude: 31.2391507432,
        longitude: 121.4998626709,
        name: '上海东方明珠',
        iconPath: "/images/marker3.png",
      }
    ],
    polyline: [{
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
    }]
  },

  //点击标记
  markertap(e) {
    console.log(e.markerId);
    
  },

  //点击控件时触发
  bindcontroltap: function(e) {
    switch(e.controlId) {
      case 1:
        //移到当前位置
        this.movetoCenter();
        break;
      case 2:
         //照相记录
         if(this.timer){
            wx.navigateBack({
               delta: 1
            })
         }else{
            wx.scanCode({
               success: () => {
                  wx.showLoading({
                     title: '正在获取密码',
                  })
                  wx.request({
                     url: 'https://www.easy-mock.com/mock/5963172d9adc231f357c8ab1/ofo/getname',

                     success: (res) => {
                        console.log(res);
                        wx.hideLoading();
                        wx.redirectTo({
                           url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                           success: () => {
                              wx.showToast({
                                 title: '获取密码成功',
                                 duration: 1000
                              })
                           }
                        })
                     }
                  })
               }
            })
         }
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
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.timer = options.timer;
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
                left : res.windowWidth/2 - 28,
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
  
  }
})