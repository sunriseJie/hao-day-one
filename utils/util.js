function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showDiaryDetailByID(id,data){
  for(var i =0;i<data.length;i++){
    if (id == data[i]['data']['id']){
      data[i]['showDetail'] = true;
      data[i]['data']['videoLoading'] = true;//控制video延时加载
    }
  }
  return data;
}

function hiddenDiaryDetailByID(id, data) {
  for (var i = 0; i < data.length; i++) {
    if (id == data[i]['data']['id']) {
      data[i]['showDetail'] = false;
    }
  }
  return data;
}

function showVideoByDiaryID(id, data) {
  for (var i = 0; i < data.length; i++) {
    if (id == data[i]['data']['id']) {
      data[i]['showDetail'] = true;
      data[i]['data']['videoLoading'] = false;//控制video延时加载
    }
  }
  return data;
}


function screenHandle (e) {
  wx.showToast({
    title: '亲，请不要截图哦，要照片直接找我要吧。',
    mask: true,
    duration: 3000,
    image: "/images/timg.png"
  });

}

module.exports = {
  formatTime: formatTime,
  showDiaryDetailByID: showDiaryDetailByID,
  hiddenDiaryDetailByID: hiddenDiaryDetailByID,
  showVideoByDiaryID: showVideoByDiaryID,
  screenHandle: screenHandle,
}
