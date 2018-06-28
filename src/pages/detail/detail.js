var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
  data:{
    listId:'',
    listData:''
  },
  onLoad: function(){
    var that = this;
    if(!app.globalData.listDatas){
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
    }else {
      that.setData({
        listId:that.options.id,
        listData:app.globalData.listDatas
      });
      for(var i=0;i<app.globalData.listDatas.length;i++){
        if(that.options.id == app.globalData.listDatas[i].id){
            var articles = app.globalData.listDatas[i].body;
            WxParse.wxParse('article', 'md', articles, that, 5);
        }
      }
    }
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
