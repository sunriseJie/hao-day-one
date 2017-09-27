// edit/index.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "标题",
    title_new:true,
    content: "最多50个字符。",
    content_new:true,
    images: [],
    upload_img_idx:0,
    videos: [],
    upload_videos:[],
    upload_video_idx:0,
    months_arr: ['0月', '1月', '2月', '3月', '4月'
      , '5月', '6月', '7月', '8月', '9月', '10月', 
      '11月', '12月'],
    month:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  ontTitleFocusHandle: function (e) {
    var that = this;
    if (that.data.title_new == true){
      that.setData({
        title: "",
        title_new:false
      });
    }
  },
  onContentFocusHandle: function (e) {
    var that = this;
    if(that.data.content_new == true){
      that.setData({
        content: "",
        content_new:false
      });
    }
    
  },

  onSelectAndUploadPhoto: function (e) {

    var that = this;
    wx.chooseImage({
      success: function (res) {
        var data = res.tempFiles;
        for (var file in data){
          data[file].percent = 0;
        }

        data = that.data.images.concat(data);
        that.setData({
          images: data
        });

        that.uploadFiles(res.tempFilePaths,'image');
      },
    })
  },
  onSelectAndUploadVideo: function (e) {
  
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success: function (res) {
        var data = {}
        data.percent = 0;
        data.path = res.tempFilePath;

        data = that.data.videos.concat(data);

        that.setData({
          videos:data
        });
        console.log(data);
        that.uploadFiles([], 'video');
      }
    });
  },
  uploadFiles: function (filePaths, fileType) {
    var that =this;
    var img_data_idx = this.data.upload_img_idx;
    var video_data_idx = this.data.upload_video_idx;
    var videos = this.data.videos;


    if(fileType == "image"){
      for(var i =0;i<filePaths.length;i++){
        var idx = img_data_idx + i;
        that.uploadImage(idx);
        that.data.upload_img_idx +=1;
      }
    }

    if(fileType == "video"){
      var video = videos[video_data_idx];
      video.idx = video_data_idx;
      that.uploadVideo(video);
      that.data.upload_video_idx +=1;
    }

  },
  uploadVideo: function (video){
    var that = this;
    var videos = this.data.videos;
    var idx = video.idx;
    const apiURL = 'https://wx.sunriselu.top/public/api/v1';
    const uploadTask = wx.uploadFile({
      url: `${apiURL}/upload`,
      filePath: video.path,
      name: 'video',
      formData: {
        'userId': 0,
        'fileType': 'video'
      },success(res) {
        var net_video = JSON.parse(res.data);
        var uVideos = [];
        uVideos = that.data.upload_videos.concat(net_video);
        that.setData({ upload_videos:uVideos});
        
      }
    });

    uploadTask.onProgressUpdate((res) => {
      video.percent = res.progress;
      videos[video.idx] = video;
      that.setData({
        videos: videos
      });
    
    })
  },

  uploadImage:function(idx){
    var that = this;
    var images = this.data.images;
    var image = images[idx];
    const apiURL = 'https://wx.sunriselu.top/public/api/v1';
    const uploadTask = wx.uploadFile({
      url: `${apiURL}/upload`,
      filePath: image.path,
      name: 'image',
      formData: {
        'userId': 0,
        'fileType': 'image'
      },success(res){
        var net_img = JSON.parse(res.data);
        images[idx] = net_img;
        images[idx].percent = 100;
        that.setData({
          images : images
        });
      }
    });

    uploadTask.onProgressUpdate((res) => {
      image.percent = res.progress;
      images[idx]= image;
      that.setData({
        images:images
      });
      // console.log('上传进度', res.progress)
      // console.log('已经上传的数据长度', res.totalBytesSent)
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  },
  createDiary:function(e){
    var data = this.data;
    
    if(data.images.length == 0){
      wx.showToast({
        title: '请上传最少一张图片',
        icon: 'loading',
      });
      return;
    }
    
    var diary = {};
    diary.name = data.title;
    diary.content = data.content;
    diary.month = data.month;
    diary.cover_img = data.images[0].path;
    diary.photos = data.images;
    diary.videos = data.upload_videos;

    wx.showLoading({
      title: '正在提交',
      mask:true,

    })
    api.postDiaryData(diary,function(res){
      if(res){
        if(res.data == "success"){
          wx.hideLoading();
          wx.showToast({
            title: '',
          })
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  updateTitle:function(e){
    // console.log('title' + e.detail.value);
    this.setData({
      title:e.detail.value,
    });
  },
  updataContent:function(e){
    // console.log('contant' + e.detail.value);
    this.setData({
      content: e.detail.value,
    });
  },
  onMonthChange:function(e){
    this.setData({
      month: e.detail.value
    });

    // console.log(e);
  },
})