/* eslint-disable */
import getters from './getters.js'

const state = {
	sellerInfo: {avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg'},
	goodsData: null,
	commentData: null,
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
	// goodsCount: [],
	goodsCount: [[0,0,0,0,0,0,0,0,0,0],[0],[0],[0,0,0],[0,0],[0,0],[0,0,0],[0,0,0,0,0],[0,0,0,0,0,0]],
	isClearCar: true,
	isMerchant: false,
	initScroll: false,
	favoriteText: '收藏',
	favorite: false
}

const mutations = {
	getSllerInfo(state, data) {
		state.sellerInfo = data.data
	},
	getGoodsData(state, data) {
		state.goodsData = data.data
		/*for (let i=0,len=state.goodsData.length;i<len;i++) {
			let a = state.goodsData[i].foods
			// state.goodsCount.length = len
			// state.goodsCount.splice(len)
			// state.goodsCount[i] = new Array()
			for (let j=0,len=a.length;j<len;j++) {
				a[j].count = 0
				// state.goodsCount[i][j] = 0
				// state.goodsCount[i].splice(j, 1, 0)
			}
			state.goodsData[i].foods = a
		}*/
	},
	getCommentData(state, data) {
		state.commentData = data.data
		console.log(data)
		// let dataIndex = state.commentData
		// for(let i=0,len=dataIndex.length; i < len; i++) {
		// 	if(dataIndex[i].foodsId == foodsId){
		// 		state.foodData = dataIndex[i]
		// 		// console.log(state.foodData)
		// 		break
		// 	}
		// }
		state.foodData = state.commentData
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
		state.isMerchant = true
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
				// console.log(state.foodData)
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
			i = foodItem.foodIndex
			// ids = ''+index+i
		/*if((state.goodsData[index].foods)[i].count > 0){
			(state.goodsData[index].foods)[i].count ++
			state.goodsCount[index].splice(i,1,(state.goodsData[index].foods)[i].count)
		} else {
			(state.goodsData[index].foods)[i].count = 1
			state.goodsCount[index].splice(i,1,1)
		}*/
		
		if((state.goodsCount)[index][i].count && (state.goodsCount)[index][i].count > 0){
			let countMenu = (state.goodsCount)[index][i]
				countMenu.count ++
			state.goodsCount[index].splice(i,1,countMenu)
		} else {
			let menu = {
				count: 1,
				name: foodItem.foodName,
				price: foodItem.foodPrice,
				foodsId: foodItem.foodsId,
				typeIndex: index,
				foodIndex: i
			}
			state.goodsCount[index].splice(i,1,menu)
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
			i = foodItem.foodIndex
			// goodsDataNew = state.goodsData[index].foods

		// state.goodsCount[index][i] --

		// goodsDataNew[i].count --
		// state.goodsData[index].foods = goodsDataNew
		// state.goodsCount[index].splice(i,1,goodsDataNew[i].count)
		let countMenu = (state.goodsCount)[index][i]
				countMenu.count --
			state.goodsCount[index].splice(i,1,countMenu)

		if(state.totalCount == 0) {
			state.isCover = false
		}
	},
	isCover(state, isCover) {
		state.isCover = isCover
	},
	clearCar(state) {
		state.totalPrice = 0
		state.totalCount = 0
		state.payDesc = `￥${state.minPrice}元起送`
		state.payClass = 'not-enough'
		for(let i=0,len=state.goodsCount.length;i<len;i++) {
			let a = (state.goodsCount)[i]
			for(let j=0,jen=(state.goodsCount)[i].length;j<jen;j++) {
				if((state.goodsCount)[i][j]!==0) {
					a[j] = 0
				}
			}
			(state.goodsCount).splice(i,1,a)
		}
	},
	getFavorite(state) {
		state.favorite = !state.favorite
	}
	// initScroll(state) {
	// 	state.initScroll = true
	// }
}

export default {
	state,
	mutations,
	getters
}