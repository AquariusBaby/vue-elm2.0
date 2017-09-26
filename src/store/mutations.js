/* eslint-disable */
import getters from './getters.js'

const state = {
	sellerInfo: null,
	goodsData: null,
	currentIndex: 0,
	foodData: null,
	isShowFoodDetail: false,
	foodsId: 0
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
		//这个方法要不要提到外面去
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
	},
	getFoodDetail(state, foodsId) {
		state.foodsId = foodsId
		state.isShowFoodDetail = true
	},
	hideFoodDetail(state) {
		state.isShowFoodDetail = false
	},
	getFoodInfo(state, data) {
		let foodsIndex = data.foodsParma.foodsIndex,
			foodsId = data.foodsParma.foodsId,
			dataIndex = data.data
		dataIndex = dataIndex[foodsIndex].foods

		for(let i=0,len=dataIndex.length; i < len; i++) {
			if(dataIndex[i].foodsId == foodsId){
				state.foodData = dataIndex[i]
				break
			}
		}
	}
}

export default {
	state,
	mutations,
	getters
}