// pages/list/list.js
const fetch = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    shops:[],
    pageindex:1,
    pagelimit:10,
    hasmore:true,
    inputvalue:""
  },
  loadmore: function (query) {
    if(!this.data.hasmore) {
      wx.showToast({
        title: '客官没有了哟~',
        icon:"none"
      });
      return
    };
    // let pageindex = this.data.pageindex;
    // let pagelimit = this.data.pagelimit;
    let {pageindex,pagelimit} = this.data;
    let params = query ? { _page: ++pageindex, _limit: pagelimit, q:query } : { 
      _page: ++pageindex, _limit: pagelimit};
    return fetch(`categories/${this.data.categories.id}/shops`, params)
    .then((res) => {
      const shops = this.data.shops.concat(res.data);
      const allcount = parseInt(res.header["x-total-count"]);
      const hasmore = pageindex * pagelimit <= allcount;
      this.setData({
        shops,
        pageindex,
        hasmore,
        q:query
      })
    })
  },
  changehandle:function(e){
    this.setData({
      pageindex:0,
      hasmore:true,
      shops:[]
    })
    const inputs = e.detail.value;
    this.loadmore(inputs)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.id}`).then((res)=>{
      this.setData({
        categories:res.data
      });
      wx.setNavigationBarTitle({
        title: res.data.name
      });
      fetch(`categories/${this.data.categories.id}/shops`,{_page:1,_limit:10}).then(res=>{
        this.setData({
          shops:res.data
        })
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    if(this.data.categories.name){
      wx.setNavigationBarTitle({
        title: this.data.categories.name,
      })
    }
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
    this.setData({
      shops:[],
      pageindex:0,
      hasmore:true,
      inputvalue:""
    });
    this.loadmore().then(()=>{
      wx.stopPullDownRefresh();
      
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const q = this.data.q;
    this.loadmore(q)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})