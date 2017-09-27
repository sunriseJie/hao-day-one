// home.js
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   * showVideo,diaryPhotos 控制全屏浏览视频和图片
   */
  data: {
    trips: [],
    diaryPhotos: null,
    loadMore: false,
    showVideo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(wx.onUserCaptureScreen){
      wx.onUserCaptureScreen(function(res){
        that.screenHandle();
      });
    }
    wx.showLoading({
      title: '书架太高，需要攀爬',
    });

    this.getData();
  },
  getData: function () {
    var data = [];
    api.getDiary({
      data, success: (res) => {
        let diaryList = res.data;
        this.setData({
          trips: diaryList
        });
        wx.hideLoading();
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  /**
   * 展开具体日记
   */
  viewDiary: function (e) {
    var that = this;
    const ds = e.currentTarget.dataset;
    var trips = [];
    trips = util.showDiaryDetailByID(ds.id, this.data.trips);
    this.setData({
      trips: trips
    });
    
    setTimeout(function(e){
      var trips;
      trips = util.showVideoByDiaryID(ds.id, that.data.trips);
      that.setData({
        trips: trips
      });
    },3000);

    
  },
  /**
   * 折叠具体日记
   */
  hiddenDiary: function (e) {
    const ds = e.currentTarget.dataset;
    var trips = [];
    trips = util.hiddenDiaryDetailByID(ds.id, this.data.trips);
    this.setData({
      trips: trips
    });
  },
  viewDetailPhotos: function (e) {
    const ds = e.currentTarget.dataset;
    var tripPhotos = this.getCurrentDiaryPhotos(ds.id);
    var diaryPhotos = {
      current: ds.current,
      data: tripPhotos
    }
    
    wx.setStorage({
      key: 'diaryPhotos',
      data: diaryPhotos,
      success:(res) => {
        wx.navigateTo({
          url: '/pages/view/photo_view',
        });
      }
    })
  },
  
  getCurrentDiaryPhotos: function (id) {
    var photos = [];
    var data = this.data.trips;
    for (var i = 0; i < data.length; i++) {
      if (data[i]['data']['id'] == id) {
        photos = data[i]['data']['photo'];
      }
    }
    return photos;
  },
  onOpenEdit: function () {
    wx.navigateTo({
      url: '/pages/edit/index',
    })
  },
  loadMore: function (e) {
    if (!this.data.loadMore) {
      wx.showLoading({
        title: '翻书需要时间',
      })
      this.setData({
        loadMore: true
      });
      this.getData();
      this.setData({
        loadMore: false
      });
    }
  },
  viewVideo: function (e) {
    var video_url = e.currentTarget.dataset.url;
    if(video_url){
      this.setData({
        showVideo:video_url
      });
    }
  },
  hiddenVideo:function(e){
    this.setData({
      showVideo: null
    });
  },
  screenHandle: function (e) {
    wx.showToast({
      title: '亲，请不要截图哦，要照片找我要吧。截图3次就能进小黑屋。',
      mask: true,
      duration: 6000,
      image: "/images/timg.png"
    });

    wx.getStorage({
      key: 'screenCounts',
      success: function(res) {
        var count = parseInt(res.data);
        if (count > 2){
          wx.showToast({
            title: '亲,你截图太多了。被关进小黑屋。',
          });
          wx.reLaunch({
            url: '/pages/local/home',
          });
        }else{
          count += 1;
          wx.setStorage({
            key: 'screenCounts',
            data: count,
          })
        }
      },
    });

    

  },

})