/* eslint-disable */
import getters from './getters.js'

const state = {
	sellerInfo: {avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg'},
	goodsData: null,
	currentIndex: 0,
	foodData: {image: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg'},
	isShowFoodDetail: false,
	foodsId: 0,
	positive: 0,	//推荐
	negative: 0,	//吐槽
	payDesc: '',
	foodCar: [],	//下单列表
	totalPrice: 0,	//下单总价格
	totalCount: 0,	//总数
	minPrice: 20,
	payDesc: '￥20元起送',	//支付描述
	payClass: 'not-enough',
	isCover: false,
	goodsCount: [[],[],[],[],[],[],[],[],[]]
}

const mutations = {
	getSllerInfo(state, data) {
		state.sellerInfo = data.data
	},
	getGoodsData(state, data) {
		state.goodsData = data.data
		for (let i=0,len=state.goodsData.length;i<len;i++) {
			let a = state.goodsData[i].foods
			for (let j=0,len=a.length;j<len;j++) {
				a[j].count = 0
			}
			state.goodsData[i].foods = a
		}
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
		let foodsIndex = data.foodsParma.foodsIndex || 0,	//加了2个默认值，但感觉还是不太妥当
			foodsId = data.foodsParma.foodsId || 1,
			dataIndex = data.data
		
		dataIndex = dataIndex[foodsIndex].foods

		for(let i=0,len=dataIndex.length; i < len; i++) {
			if(dataIndex[i].foodsId == foodsId){
				state.foodData = dataIndex[i]
				console.log(state.foodData)
				break
			}
		}
		state.positive = 0
		state.negative = 0
		let ratings = state.foodData.ratings
		for(let i=0,len=ratings.length; i < len; i++) {
			if(ratings[i].rateType == 0) {
				state.positive++
			}
			if(ratings[i].rateType == 1) {
				state.negative++
			}
		}
	},
	addCar(state, foodItem) {
		// console.log(foodItem)
		state.totalPrice += foodItem.foodPrice
		state.totalCount ++

		if(state.totalPrice === 0) {
			state.payDesc = `￥${state.minPrice}元起送`
		}else if(state.totalPrice < state.minPrice) {
			let diff = state.minPrice - state.totalPrice
			state.payDesc = `还差￥${diff}`
		}else {
			state.payDesc = '去结算'
		}

		if(state.totalPrice < state.minPrice) {
			state.payClass = 'not-enough'
		}else {
			state.payClass = 'enough'
		}

		let index = foodItem.typeIndex,
			i = foodItem.foodIndex,
			goodsDataNew = state.goodsData[index].foods
			// console.log(goodsDataNew)
		if(goodsDataNew[i].count > 0){
		// console.log()
		// if(state.goodsCount[index][i] > 0){
			// state.goodsCount[index][i] ++
			goodsDataNew[i].count ++
			state.goodsData[index].foods = goodsDataNew
			state.goodsCount[index][i] = goodsDataNew[i].count
		} else {
			// state.goodsCount[index][i] = 1
			goodsDataNew[i].count = 1
			state.goodsData[index].foods = goodsDataNew
			state.goodsCount[index][i] = goodsDataNew[i].count
		}
	},
	cutCar(state, foodItem) {
		state.totalPrice -= foodItem.foodPrice
		state.totalCount --

		if(state.totalPrice === 0) {
			state.payDesc = `￥${state.minPrice}元起送`
		}else if(state.totalPrice < state.minPrice) {
			let diff = state.minPrice - state.totalPrice
			state.payDesc = `还差￥${diff}`
		}else {
			state.payDesc = '去结算'
		}

		if(state.totalPrice < state.minPrice) {
			state.payClass = 'not-enough'
		}else {
			state.payClass = 'enough'
		}

		let index = foodItem.typeIndex,
			i = foodItem.foodIndex,
			goodsDataNew = state.goodsData[index].foods

		state.goodsCount[index][i] --

		goodsDataNew[i].count --
		state.goodsData[index].foods = goodsDataNew
		state.goodsCount[index][i] = goodsDataNew[i].count
	},
	isCover(state, isCover) {
		console.log(isCover)
		state.isCover = isCover
	}
}

export default {
	state,
	mutations,
	getters
}