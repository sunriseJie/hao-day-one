//app.js
App({
  onLaunch: function () {
    this.int();
    this.checkSystem();
    this.checkScreenCounts();
  },
  int:function(e){
    wx.setStorage({
      key: 'screenCounts',
      data: 0,
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  checkSystem: function (e) {
    var that =this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.SDKVersion) {
          var ver = parseInt(res.SDKVersion.replace('.', ""));
          if (ver > 0) {
            if (ver > 100) {
              if (ver - 140 <= 0) {
                //todo
                that.notGetNetwork();
              }
            } else {
              if (ver - 14.0 <= 0) {
                //todo
                that.notGetNetwork();
              }
            }


          }
        }
      },
    })
  },
  notGetNetwork:function(e){
    wx.showToast({
      title: '您的微信版本较低，只能浏览少量内容，请更新后重试。',
    });
    wx.reLaunch({
      url: '/pages/local/home',
    });
  },
  checkScreenCounts:function(e){
    wx.getStorage({
      key: 'screenCounts',
      success: function(res) {
        var count = parseInt(res.data);
        if (count > 2) {
          wx.showToast({
            title: '亲,你截图太多了。被关进小黑屋。',
          });
          wx.reLaunch({
            url: '/pages/local/home',
          });
        }
      },
    })
  },
  
  globalData: {
    userInfo: null
  }
})
