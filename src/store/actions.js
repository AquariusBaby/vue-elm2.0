/* eslint-disable */
import axios from 'axios'
export default {
	getSllerInfo: ({commit}) => {
		axios.get('static/json/data.json')
		.then(
			function(res) {
				// console.log(res.data.seller)
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
		axios.get('static/json/data.json')
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
	}
}