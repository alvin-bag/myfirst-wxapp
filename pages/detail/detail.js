// pages/detail/detail.js
const fetch = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  showgallery:function(){
    wx.previewImage({
      urls: this.data.shops[0].images,
    })
  }
  ,
  onLoad: function (options) {
    fetch(`categories/${options.categoriesid}/shops?id=${options.id}`).then((res) => {
      this.setData({
        shops: res.data
      })
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