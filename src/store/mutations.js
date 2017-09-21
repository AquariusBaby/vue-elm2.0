/* eslint-disable */
import getters from './getters.js'

const state = {
	sellerInfo: null,
	goodsData: null,
	currentIndex: 0
}

const mutations = {
	getSllerInfo(state, data) {
		state.sellerInfo = data.data
	},
	getGoodsData(state, data) {
		state.goodsData = data.data
	},
	changeCurIndex(state, index) {
		state.currentIndex = index
	},
	scrollCurIndex(state, scrollData) {
		function curIndex() {
			for(let i=0;i<scrollData.listHeight.length;i++) {
				let height1 = scrollData.listHeight[i]
				let height2 = scrollData.listHeight[i+1]
				if(!height2 || (scrollData.scrollY >= height1 && scrollData.scrollY < height2)) {
					return i
				}
			}
			return 0
		}
		state.currentIndex = curIndex()
	}
}

export default {
	state,
	mutations,
	getters
}