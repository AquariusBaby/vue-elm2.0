// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './framework/rem'

import 'common/less/index.less'

Vue.config.productionTip = false
/* eslint-disable */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
    	console.log('fastclick')
        FastClick.attach(document.body)
    }, false)
}

Vue.use(VueLazyload, {
    loading: require('common/image/loading.png')
})

// 关于axios的配置
/*axios.interceptors.request.use( function(config){	// 配置发送请求
	// store.dispatch('showLoading')
	return config;
},function(error){
	return Promise.reject(error);
});

axios.interceptors.response.use( function(response){	// 配置响应
	// store.dispatch('hideLoading')
	return response;
},function(error){
	return Promise.reject(error);
});*/

Vue.prototype.$axios = axios // 把axios对象挂到Vue原型上

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
