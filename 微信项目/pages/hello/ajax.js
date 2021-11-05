// pages/hello/ajax.js

// 引入腾讯地图
const app = getApp();
var QQMapWX = require("../../libs/qqmap-wx-jssdk");
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resul: [],
    pageno: 1, //存储的页码
    cid: 1,
    click_Style: 1, //当前默认选项卡
    city: "未选择",
  },
  /// 跳转到选择地理位置的页面
  getmap() {
    wx.navigateTo({
      url: '../index/index',
    })
  }, 
  // 获取到缓存的城市并显示
  onShow(){
    let city=getApp().globalData.CITYNAME
    this.setData({
      city
    })
  },
  /* @param  offset分页加载时兑取记录的起始位置   *@param  用promise方法封装 */
  loadDate(cid, offset) {
    wx.showLoading({
      title: "加载中请稍后...",
    });
    return new Promise((resolve, reject) => {
      wx.request({
        url: "https://api.tedu.cn/index.php",
        method: "GET",
        data: {
          cid, //传参的页数
          offset, //页面的显示行数
        },
        success: (result) => {
          //新获得的数组拼接到原有的数组中
          //  响应成功后 回调resolve 把电影列表 交给loadDate的调用者
          resolve(result.data);
          wx.hideLoading();
        },
      });
    });
  },
  // 点击切换热映样式
  click_Style(e) {
    // 获取到自定义的属性值参数
    this.setData({ click_Style: e.target.dataset.id });
    // 发送请求加载当前选中项下的第一页数据
    let id = e.target.dataset.id;
    if (id == this.data.cid) {
      return;
    }
    this.loadDate(id, 0).then((resolve) => {
      this.setData({
        resul: resolve,
        pageno: 1,
        cid: e.target.dataset.id,
      });
    });
  },
  // 回到页面顶部
  TOtop() {
    wx.pageScrollTo({
      duration: 500,
      scrollTop: 0,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //加载当前位置
  loadLocation() {
    qqmapsdk = new QQMapWX({
      key: "SPUBZ-BNWWP-7M5DA-V5UAJ-GRDJ2-IQFQZ",
    });
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        console.log(res);
        console.log(res.result.ad_info.city);
        this.setData({
          city:res.result.ad_info.city
        })
      },
    
    });
  },
 
  onLoad: function (options) {
    // 获取位置信息
    this.loadLocation();
    //movies从后台服务器端加载到的列表数据
    this.loadDate(1, 0).then((resul) => {
      this.setData({ resul: resul });
    });
  },
  /**页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    console.log(123);
    this.loadDate(this.data.cid, 0).then((res) => {
      this.setData({
        resul: res,
      });
    });
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  /**页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    // 触底之后会再次触发一个函数，函数把当前的参数页+1
    // this.setData({pageno:this.data.pageno++})
    this.data.pageno++;
    let offset = (this.data.pageno - 1) * 20; //
    let cid = this.data.cid;
    this.loadDate(cid, offset).then((resolve) => {
      let list = this.data.resul.concat(resolve);
      this.setData({
        resul: list,
      });
      console.log(`cid ${cid}`);
      console.log(`offset ${offset}`);
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
