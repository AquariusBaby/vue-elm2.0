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
		console.log(foodItem)
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
			goodsDataNew = state.goodsData[index].foods
			// console.log(goodsDataNew)
		for(let i=0,len=goodsDataNew.length;i<len;i++) {
			// state.goodData[i].count == 0
			if(goodsDataNew[i].foodsId == foodItem.foodsId) {
				if(goodsDataNew[i].count > 0){
					goodsDataNew[i].count ++
					state.goodsData[index].foods = goodsDataNew
					// console.log(state.goodsData[index].foods, state.foodCar)
				} else {
					goodsDataNew[i].count = 1
					// console.log(goodsDataNew, state.goodsData[index].foods)
					state.goodsData[index].foods = goodsDataNew
				}
			}
		}

		// 索引数组去重会不会太消耗运算了（能用关联数组么）
		/*for(let i=0,len=state.foodCar.length;i<len;i++) {
			if (foodItem.foodsId == state.foodCar[i].foodsId) {
				state.foodCar[i].count ++
				return
			}
		}*/
		// for(let i=0,len=state.foodCar.length;i<len;i++)

		// state.foodCar.push(foodItem)
		// console.log(state.foodCar,state.goodsData)
	},
	cutCar(state, foodItem) {
		state.totalPrice -= foodItem.foodPrice
		state.totalCount --

		for(let i=0,len=state.goodsData.length;i<len;i++) {
			// state.goodData[i].count == 0
			if(state.goodsData[i].foodsId == foodItem.foodsId) {
				if(state.goodData[i].count){
					state.goodData[i].count == foodItem.count
				} else {
					state.goodData[i].count --
				}
			}
		}

		for(let i=0,len=state.foodCar.length;i<len;i++) {
			if (foodItem.foodsId == state.foodCar[i].foodsId) {
				state.foodCar[i].count --
				if(state.foodCar[i].count == 0) {
					state.foodCar.splice(i, 1)
				}
				return
			}
		}
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