const app = getApp();

Page({
  data:{
    title:'全部',
    list:''
  },
  onLoad: function(){
    wx.showLoading({
      title: '加载中',
    });
    this.sendQuest();
  },
  onPullDownRefresh: function(){
    var that = this;
    that.setData({
      list:''
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.sendQuest(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
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
          that.setData({
            list:res.data
          });
          if(callback){
            callback();
          }
        }else {
          console.log(res.errMsg)
        }
      }
    })
  }
})
