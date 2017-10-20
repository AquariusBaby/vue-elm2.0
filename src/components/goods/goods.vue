<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goodsData" class="menu-item" :class="{'current':currentIndex === index}" @click=selectMenu(index)>
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item, typeIndex) in goodsData" ref="foodList" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="getFoodDetail(food.foodsId, typeIndex, $event)" v-for="(food, index) in item.foods" class="food-item border-1px">
							<div class="icon-avatar">
								<img width="57" height="57" :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<!-- <vCartcontrol :foodsId="food.foodsId" :typeIndex="typeIndex"></vCartcontrol> -->
									<!-- <vCartcontrol :foodsId="food.foodsId" :typeIndex="typeIndex" :foodPrice="food.price" :foodName="food.name" :count="food.count"></vCartcontrol> -->
									<vCartcontrol :foodsId="food.foodsId" :foodPrice="food.price" :foodIndex="index" :typeIndex="typeIndex" :foodName="food.name"></vCartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- <vShopcart></vShopcart> -->
		<!-- <vFood ref="food"></vFood> -->
	</div>
</template>
<script>
	/* eslint-disable */
	import { mapGetters } from 'vuex'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	// import shopcart from '@/components/shopcart/shopcart.vue'
	import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	import food from '@/components/food/food.vue'
	export default {
		data() {
			return {
				listHeight: [],
				scrollY: 0,
				selectedFood: {},
				classMap: ['decrease','discount','guarantee','invoice','special']
			}
		},
		computed: mapGetters([
			'sellerInfo','goodsData','currentIndex','foodCar'
		]),
		beforeCreate() {
			let _this = this
			this.$store.dispatch('getGoodsData').then(function(){
				_this.$nextTick(() => {
					_this._initScroll()
					_this._calculateHeight()
				})
			})
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {click:true})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				})
				this.foodsScroll.on('scroll' ,(pos)=> {
					// 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
					if (pos.y <= 0) {
						this.scrollY = Math.abs(Math.round(pos.y));
						let scrollData = {
							scrollY: this.scrollY,
							listHeight: this.listHeight
						}
						this.$store.dispatch('scrollCurIndex', scrollData)
					}
				})
			},
			_calculateHeight() {
				let foodList = this.$refs.foodList
				let height = 0
				this.listHeight.push(height)

				for(let i=0;i<foodList.length;i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			selectMenu(index) {
				let foodList = this.$refs.foodList
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
				this.$store.dispatch('changeCurIndex', index)
			},
			getFoodDetail(foodsId, index, event) {
				this.$store.dispatch('getFoodDetail')
				this.$router.push({path: '/foodDetail', query: { foodsId: foodsId, foodsIndex: index }})
			}
			// addFood(target) {
   //      		this._drop(target);
   //    		},
   //    		_drop(target) {
   //      		// 体验优化,异步执行下落动画
   //      		this.$nextTick(() => {
   //        			this.$refs.shopcart.drop(target);
   //      		});
   //    		}
		},
		components: {
			// 'vShopcart': shopcart,
			'vCartcontrol': cartcontrol,
			'vFood': food
		}
	}
</script>
<style lang="less">
	.bg-img(@url) {
		background-image: url('@{url}@2x.png');
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
			background-image: url("@{url}@3x.png");
		}
	}
	.borderHalf(@color) { //less中变量用@符  //通过外部文件没引进来？
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid @color;
    }
  }
  .border-none() {
		&:after {
			display: none;
		}
	}
	.goods {
		display: flex;
		position: absolute;
		top: 174px;
		width: 100%;
		bottom: 46px;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7; 
			.menu-item {
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current {
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					font-weight: 700;
					.text {
						.border-none();
					}
				}
				.icon {
					vertical-align: top;
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						.bg-img('decrease_3');
					}
					&.discount {
						.bg-img('discount_3');
					}
					&.guarantee {
						.bg-img('guarantee_3');
					}
					&.invoice {
						.bg-img('invoice_3');
					}
					&.special {
						.bg-img('special_3');
					}
				}
				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					font-size: 12px;
					.borderHalf(rgba(7,17,27,0.1));
				}
			}
		}
		.foods-wrapper {
			flex: 1;
			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid $d9dde1;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				.borderHalf(rgba(7,17,27,0.1));
				&:last-child {
					.border-none();
					margin-bottom: 0;
				}
				.icon-avatar {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex: 1;
					text-align: left;
					.name {
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.desc, .extra {
						margin-bottom: 8px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.desc {
						margin-bottom: 8px;
						line-height: 12px;
					}
					.extra {
						line-height: 10px;
						.count {
							text-align: left;
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
							color: rgb(147,153,159); 
						}
					}
					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>
