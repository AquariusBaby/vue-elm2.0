<template>
	<!-- <transition name="move"> -->
		<div ref="food" v-show='isShowFoodDetail&&isFinished' class="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="foodData.image" alt="">
					<div @touchstart="hide()" class="go-back">
						<i class="icon iconfont icon-fanhui1"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{foodData.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{foodData.sellCount}}份</span>
						<span class="rating">好评率:{{foodData.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{foodData.price}}</span><span class="old" v-show="foodData.oldPrice">￥{{foodData.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<!-- <vCartcontrol :food="food"></vCartcontrol> -->
					</div>
					<div @touch="addFirst($event)" class="buy" v-show="!foodData.count || foodData.count===0">加入购物车</div>
				</div>
				<vSplit v-show="foodData.info"></vSplit>
				<div class="info" v-show="foodData.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{foodData.info}}</p>
				</div>
				<vSplit></vSplit>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<vRating></vRating>
				</div>
			</div>
		</div>
	<!-- </transition> -->
</template>
<script>
	/* eslint-disable */
	import Vue from 'vue'
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import split from '@/components/split/split.vue'
	import rating from '@/components/ratings/rating.vue'
	import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	const POSITIVE = 0,
			NEGATIVE = 1,
			ALL =2
	export default {
		data() {
			return {
				isFinished: false
			}
		},
		beforeCreate() {
			let foodsId = this.$route.query.foodsId,
				foodsIndex = this.$route.query.foodsIndex,
				foodsParma = {
					foodsId: foodsId,
					foodsIndex: foodsIndex
				}
			let _this = this
			this.$store.dispatch('getFoodInfo', foodsParma).then(function(){
				_this.$nextTick(() => {
					if (!_this.sroll) {
						_this.scroll =new BScroll(_this.$refs.food)
					} else {
						_this.scroll.refresh()
					}
				})
			})
			// console.log(typeof this.getFoodInfo())
			// this.getFoodInfo()
		},
		computed: mapGetters([
			'foodData','isShowFoodDetail'
		]),
		activated() {
			this.getFoodInfo()
		},
		methods: {
			show() {
				this.showFlag = true
			},
			hide() {
				this.$store.dispatch('hideFoodDetail')
				this.$router.go(-1)
			},
			getFoodInfo() {
				this.isFinished = false
				let foodsId = this.$route.query.foodsId,
					foodsIndex = this.$route.query.foodsIndex,
					foodsParma = {
						foodsId: foodsId,
						foodsIndex: foodsIndex
					}
				let _this = this
				this.$store.dispatch('getFoodInfo', foodsParma).then(function(){
					_this.$nextTick(() => {
						if (!_this.sroll) {
							_this.scroll =new BScroll(_this.$refs.food)
						} else {
							_this.scroll.refresh()
						}
					})
					_this.isFinished = true
				})
			}
		},
		components: {
			'vCartcontrol': cartcontrol,
			'vSplit': split,
			'vRating': rating
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.food {
		text-align: left;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index:  30;
		width: 100%;
		background: #fff;
		transform: translate3d(0, 0, 0);
	    &.move-enter-active, &.move-leave-active {
	      transition: all 0.2s linear;
	    }
	    &.move-enter, &.move-leave-active {
	      transform: translate3d(0, 100%, 0);
	    }
		.food-content {
			.image-header {
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				> img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.go-back {
					position: absolute;
					top: 10px;
					left: 0;
					> i {
						display: block;
						padding: 7px;
						font-size: 13px;
						color: #fff;
						border-radius: 50%;
					    background: rgba(0,0,0,0.3);
					    margin-left: 10px;
					}
				}
			}
			.content {
				position: relative;
				padding: 18px;
				text-align: left;
				.title {
					line-height: 14px;
					margin-bottom: 8px;
					font-size: 14px;
					font-weight: 700;
					color: rgb(7, 17, 27);
				}
				.detail {
					margin-bottom: 18px;
					line-height: 10px;
					height: 10px;
					font-size: 0;
					.sell-count, .rating {
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.sell-count {
						margin-right: 12px;
					}
				}
				.price {
					font-weight: 700;
        	line-height: 24px;
	        .now {
	          margin-right: 8px;
	          font-size: 14px;
	          color: rgb(240, 20, 20);
	        }
	        .old {
	          text-decoration: line-through;
	          font-size: 10px;
	          color: rgb(147, 153, 159);
	        }
				}
				.cartcontrol-wrapper {
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.buy {
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					font-size: 10px;
					border-radius: 12px;
					color: #fff;
					background: rgb(0, 160, 220);
				}
			}
			.info {
				padding: 18px;
				text-align: left;
				.title {
					line-height: 14px;
					margin-bottom: 6px;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.text {
					line-height: 24px;
					padding: 0 8px;
					font-size: 12px;
					color: rgb(77, 85, 93);
				}
			}
			.rating {
				padding-top: 18px;
				.title {
					line-height: 14px;
					margin-left: 18px;
					font-size: 14px;
					font-weight: 600;
					color: rgb(7, 17, 27);
				}
				.rating-wrapper {
					padding: 0 18px;
					.rating-item {
						position: relative;
						padding: 16px 0;
						border-bottom: 1px solid #f3f5f7;
						.user {
							position: absolute;
							right: 0;
							top: 16px;
							font-size: 0;
							line-height: 12px;
							.name {
								display: inline-block;
								vertical-align: top;
								font-size: 10px;
								color: rgb(147, 153, 159);
								margin-right: 6px;
							}
							.avatar {
								border-radius: 50%;
							}
						}
						.time {
							line-height: 12px;
							font-size: 10px;
							color: rgb(147, 153, 159);
							margin-bottom: 6px;
						}
						.text {
							line-height: 16px;
							font-size: 12px;
							color: rgb(7, 17, 27);
							> i {
								line-height: 16px;
								margin-right: 4px;
								font-size: 12px;
							}
						}
					}
					.no-rating {
						padding: 16px 0;
						font-size: 12px;
						color: rgb(147, 153, 159);
					}
				}
			}
		}
	}
</style>
