// const apiURL = 'http://sunrise.com:91/api/v1';
const apiURL = 'https://wx.sunriselu.top/public/api/v1';

const wxRequest = (params, url) => {
  
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const uploadFile = (filePath, fileType = "image", callBack) => {
  wx.uploadFile({
    url: `${apiURL}/upload`,
    filePath: filePath,
    name: fileType,
    formData: {
      'userId': 0
    },
    success: function (res) {
      callBack(res);
    }
  })
};

const getDiary = (params) => {
  wxRequest(params, `${apiURL}/diary`);
};

const postDiaryData = (data, callBack) => {
  var params = {}
  params.method = 'POST';
  params.data = data;

  wx.request({
    url: apiURL + '/diary',
    method: params.method,
    data: params.data,
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success:function(res){
      callBack(res);
      // console.log(res);
    },
  });

};
module.exports = {
  getDiary,
  postDiaryData,
  uploadFile
};
