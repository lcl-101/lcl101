var WxParse = require('../../wxParse/wxParse.js');

Page({
  data:{
    listId:'',
    listData:''
  },
  onLoad: function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.sendQuest(function(res){
      that.setData({
        listId:that.options.id,
        listData:res.data
      });
      for(var i=0;i<res.data.length;i++){
        if(that.options.id == res.data[i].id){
            var articles = res.data[i].body;
            WxParse.wxParse('article', 'md', articles, that, 5);
        }
      }
    })
  },
  sendQuest: function(callback){
    var that = this;
    //涉及到域名问题正式项目
    wx.request({
      url:'https://lcl101.cn/api/getList',
      method:'GET',
      dataType:'json',
      success:function(res){
        wx.hideLoading();
        if(res.statusCode == 200){
          if(callback){
            callback(res);
          }
        }else {
          console.log(res.errMsg)
        }
      }
    })
  }
})
