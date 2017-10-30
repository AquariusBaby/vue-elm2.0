/**
 * Mocking client-server processing
 */
 /* eslint-disable */

export default {
  getSllerInfo: ({commit}) => {
    const testUrl = "static/json/sellerInfo.json",  //测试URL
          prodUrl = ""                              //正式URL
    return axios.get('static/json/sellerInfo.json')
    .then(
      function(res) {
        commit('getSllerInfo', {data: res.data.seller})
      },
      function(err) {
        console.log(err.type);
    })
    .catch(
      function(err) {
        console.log(err)
    })
  },
}