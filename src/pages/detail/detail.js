var WxParse = require('../../wxParse/wxParse.js');
var article = require('../../data/data.js');

Page({
  data:{
    listId:'',
    listData:''
  },
  onLoad: function(){
    var that = this;
    console.log(this.options.id);
    console.log(article);
    that.setData({
      listId:this.options.id,
      listData:article.listData
    });
    for(var i=0;i<article.listData.length;i++){
      if(this.options.id == article.listData[i].id){
          var articles = article.listData[i].body;
          WxParse.wxParse('article', 'md', articles, that, 5);
      }
    }
  }
})
