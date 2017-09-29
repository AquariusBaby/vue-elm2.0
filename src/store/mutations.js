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
	isCover: false
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
		//console.log(foodItem.price)
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

		// 索引数组去重会不会太消耗运算了（能用关联数组么）
		for(let i=0,len=state.foodCar.length;i<len;i++) {
			if (foodItem.foodsId == state.foodCar[i].foodsId) {
				state.foodCar[i].count ++
				break
			}
		}
		state.foodCar.push(foodItem)
		console.log(state.foodCar,state.totalPrice,state.totalCount,state.payDesc,state.payClass)
	},
	isCover(state, isCover) {
		state.isCover = isCover
	}
}

export default {
	state,
	mutations,
	getters
}