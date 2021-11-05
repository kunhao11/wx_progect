// pages/index/index.js
const maps=require("./map")
var QQMapWX = require("../../libs/qqmap-wx-jssdk");
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    citys:maps,//获取到map.js的数据
    id:"",
    cityname:"定位中....."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取到点击的城市
  showcity(e){
  //  把获取到的城市名字缓存起来，在另外的窗口使用
  let city=e.currentTarget.dataset.citysname
  // 把city存到globalData
  getApp().globalData.CITYNAME=city;
  this.setData({
    cityname:getApp().globalData.CITYNAME
  })
  // 返回到上一级 
wx.navigateBack({
  delta: 1,
})
  },
  // 获取到右侧的字母
  tapLetter(e){
    console.log(e.currentTarget.dataset.letter);
    this.setData({
      id:e.currentTarget.dataset.letter
    })
  },
  onLoad: function (options) {
    this.loadLocation()
  },
  loadLocation() {
    qqmapsdk = new QQMapWX({
      key: "SPUBZ-BNWWP-7M5DA-V5UAJ-GRDJ2-IQFQZ",
    });
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        console.log(res);
        this.setData({
          cityname:res.result.ad_info.city
        })
      },
        // 定位权限没有
        fail:(err)=>{
          console.warn(err);
          this.setData({
            cityname:"定位失败请重试"
          })
        }
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