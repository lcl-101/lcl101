const app = getApp();
var article = require('../../data/data.js');

Page({
  data:{
    title:'全部',
    list:''
  },
  onLoad: function(){
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var url = 'https://api.github.com/repos/';
    var owner = 'lcl-101';
    var repo = 'webpack-blog';
    //涉及到域名问题正式项目
    // wx.request({
    //   url:url+owner+'/'+repo+'/'+'issues',
    //   method:'GET',
    //   header:{
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    //   },
    //   dataType:'json',
    //   success:function(res){
    //     wx.hideLoading();
    //     console.log(res);
    //     if(res.statusCode == 200){
    //       that.setData({
    //         list:res.data
    //       })
    //     }else {
    //       console.log(res.errMsg)
    //     }
    //   }
    // })

    //模拟请求
    console.log(article);
    if(!that.data.show){
      setTimeout(() => {
        that.setData({
          list:article.listData
        });
        wx.hideLoading();
      }, 1000)
    }
  },
  onPullDownRefresh: function(){
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000)
  }
})
