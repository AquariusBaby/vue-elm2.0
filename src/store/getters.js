/* eslint-disable */
export default {
	sellerInfo:(state) => {
		// console.log(state.goodsData)
		return state.sellerInfo
	},
	goodsData:(state) => {
		console.log(state.goodsData)
		return state.goodsData
	},
	currentIndex:(state) => {
		return state.currentIndex
	},
	foodData:(state) => {
		// let a = state.foodData.ratings
		// console.log(a.length)
		return state.foodData
	},
	positive:(state) => {
		return state.positive
	},
	negative:(state) => {
		return state.negative
	},
	isShowFoodDetail:(state) => {
		return state.isShowFoodDetail
	},
	isShowFoodDetail:(state) => {
		return state.isShowFoodDetail
	},
	foodCar:(state) => {
		return state.foodCar
	},
	totalPrice:(state) => {
		return state.totalPrice
	},
	totalCount:(state) => {
		return state.totalCount
	},
	payDesc:(state) => {
		return state.payDesc
	},
	payClass:(state) => {
		return state.payClass
	},
	isCover:(state) => {
		return state.isCover
	},
	goodsCount:(state) => {
		return state.goodsCount
	}
}