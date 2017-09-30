/* eslint-disable */
import axios from 'axios'
export default {
	getSllerInfo: ({commit}) => {
		axios.get('static/json/sellerInfo.json')
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
	getGoodsData: ({commit}) => {
		//返回一个axios对象，axios是基于promise的，所以可以使用.then().catch()
		return axios.get('static/json/foodList.json')
		.then(
			function(res) {
				// console.log(res.data.seller)
				commit('getGoodsData', {data: res.data.goods})
			},
			function(err) {
				console.log(err.type);
		})
		.catch(
			function(err) {
				console.log(err)
		})
	},
	changeCurIndex: ({commit}, index) => {
		commit('changeCurIndex', index)
	},
	scrollCurIndex: ({commit}, scrollData) => {
		commit('scrollCurIndex', scrollData)
	},
	getFoodDetail: ({commit}, foodsId) => {
		commit('getFoodDetail', foodsId)
	},
	hideFoodDetail: ({commit}) => {
		commit('hideFoodDetail')
	},
	getFoodInfo: ({commit}, foodsParma) => {
		return axios.get('static/json/foodList.json?foodsId=' + foodsParma.foodsId + '&foodsIndex=' + foodsParma.foodsIndex)
		.then(
			function(res) {
				commit('getFoodInfo', {data: res.data.goods,foodsParma: foodsParma})
			},
			function(err) {
				console.log(err.type);
		})
		.catch(
			function(err) {
				console.log(err)
		})
	},
	addCar: ({commit}, foodItem) => {
		commit('addCar', foodItem)
	},
	cutCar: ({commit}, foodItem) => {
		commit('cutCar', foodItem)
	},
	isCover: ({commit}, isCover) => {
		commit('isCover', isCover)
	}
}