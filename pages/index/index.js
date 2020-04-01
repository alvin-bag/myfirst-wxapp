//index.js
//获取应用实例
const snap = require("../../utils/request.js")
const app = getApp()
// const util = require("../../utils/util.js")
Page({
  data:{
    slides:"",
    categories:""
  },
  onLoad:function(){
    snap("slides").then((res)=>{
      this.setData({
        slides:res.data
      })
    });
    snap("categories").then((res) => {
      this.setData({
        categories: res.data
      })
    });

  }
  
})
