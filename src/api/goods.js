/**
 * Mocking client-server processing
 */
 /* eslint-disable */

export default {
  /**
   * 获取卖家信息
   * @param  {[type]} options.commit [description]
   * @return {[type]}                [description]
   */
  getSllerInfo: ({commit}) => {
    const PROD_URL = "",                            //正式URL
          TEST_URL = "static/json/sellerInfo.json"  //测试URL
          ;
    return  axios({
              method: 'get',
              url: process.env.NODE_ENV === 'production'?PROD_URL:TEST_URL,
            }).then(
              function(res) {
                commit('getSllerInfo', {data: res.data.seller})
              },
              function(err) {
                console.log(err)
              }
            ).catch(
              function(err) {
                console.log(err)
            })
  },

}