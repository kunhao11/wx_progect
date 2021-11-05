    // wx.request({
    //   url: "https://api.tedu.cn/index.php",
    //   method: "GET",
    //   data: {
    //     cid, //传参的页数
    //     offset, //页面的显示行数
    //   },
    //   success: (result) => {
    //     //新获得的数组拼接到原有的数组中
    //     let list = this.data.resul.concat(result.data);
    //     // 更新数据到原来的数组中
    //     this.setData({
    //       resul: list,
    //     });
    //   },
    // });




    /* @param  offset分页加载时兑取记录的起始位置   *@param  用promise方法封装 */
  // loadDate(cid, offset) {
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: "https://api.tedu.cn/index.php",
  //       method: "GET",
  //       data: {
  //         cid, //传参的页数
  //         offset, //页面的显示行数
  //       },
  //       success: (result) => {
  //         //新获得的数组拼接到原有的数组中
  //         //  响应成功后 回调resolve 把电影列表 交给loadDate的调用者
  //         resolve(result.data);
  //       },
  //     });
  //   });
  // },



  // 调用的时候
  // this.loadDate(1, 0).then((resul) => {
  //   this.setData({ resul: resul });
  // });