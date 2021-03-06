// pages/view/photo_view.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaryPhotos:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.getStorage({
      key: 'diaryPhotos',
      success: function(res) {
        if(res.data){
          that.setData({
            diaryPhotos:res.data
          });
        }else{
          that.closeAndGoHome();
        }
      },
      fail:function(res){
        that.closeAndGoHome();
      }
    })
  },
  closeAndGoHome:function(e){
    wx.showToast({
      title: '读取照片失败！',
    })
    wx.navigateBack({
      delta: 2
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
  
  }
})