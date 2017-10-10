<template>
	<div class="shopcart">
		<div class="content" @click.stop="toggleList()">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
			<!-- <div class="ball-container">
				<div v-for="ball in balls" v-show="ball.show" class="ball"></div>
				<div class="inner"></div>
			</div> -->
			<div class="shopcart-list" v-show="isCover">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click.stop="empty()">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<!-- <li class="food" v-for="(item, typeIndex) in goodsData"> -->
							<!-- <div v-for="itemFoods in item.foods"  v-if="itemFoods.count>0"> -->
						<!--123 <div v-for="(item, typeIndex) in goodsData">
							<li class="food" v-for="(itemFoods, index) in item.foods"  v-if="itemFoods.count>0">
								<span class="name">{{itemFoods.name}}</span>
								<div class="price">
									<span>￥{{itemFoods.price*itemFoods.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<vCartcontrol :foodsId="itemFoods.foodsId" :foodPrice="itemFoods.price" :foodIndex="index" :typeIndex="typeIndex" :foodName="itemFoods.name"></vCartcontrol>
								</div>
							</li>
						</div> 123-->
							<!-- </div> -->
						<!-- </li> -->
						<div v-for="(item, typeIndex) in goodsCount">
							<li class="food" v-for="(itemFoods, index) in item"  v-if="itemFoods.count>0">
								<span class="name">{{itemFoods.name}}</span>
								<div class="price">
									<span>￥{{itemFoods.price*itemFoods.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<vCartcontrol :foodsId="itemFoods.foodsId" :foodPrice="itemFoods.price" :foodIndex="index" :typeIndex="typeIndex" :foodName="itemFoods.name"></vCartcontrol>
								</div>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	/* eslint-disable */
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	export default {
		data() {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				fold: true,
				deliveryPrice: 4
			}
		},
		// mounted() {

		// },
		computed: mapGetters([
			'payDesc','totalPrice','totalCount','foodCar','payClass','isCover','goodsData','goodsCount'
		]),
		methods: {
			toggleList() {
				this.$store.dispatch('isCover', !this.isCover)
			},
			empty() {
				this.$store.dispatch('isCover', false)
				this.$store.dispatch('clearCar')
			}
		},
		components: {
			'vCartcontrol': cartcontrol
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		// background: #000;
		.content {
			display: flex;
			background: #141d27;
			font-size: 0;
			.content-left {
				flex: 1;
				text-align: left;
				.logo-wrapper {
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					border-radius: 50%;
					box-sizing: border-box;
					vertical-align: top;
					background: #141d27;
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						&.highlight {
							background: rgb(0, 160, 220);	
						}
						> i {
							font-size: 24px;
							color: #80858a;
							line-height: 44px;
							&.highlight {
								color: #fff;
							}
						}
					}
					.num {
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background: rgb(240, 20, 20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
					}
				}
				.price {
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					box-sizing: border-box;
					padding-right: 12px;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 16px;
					font-weight: 700;
					color: rgba(255, 255, 255, 0.4);
					&.highlight {
						color: #fff;
					}
				}
				.desc {
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0 0 12px;
					color: rgba(255, 255, 255, 0.4);
					font-size: 10px;
				}
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				.pay {
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					background: #2b333b;
					color: rgba(255, 255, 255, 0.4);
					&.not-enough {
						background: #2b333b;
					}
					&.enough {
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
		.ball-container {
			.ball {
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 200;
				.inner {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgb(0, 160, 220);
				}
			}
		}
		.shopcart-list {
			position: absolute;
			bottom: 48px;
			left: 0;
			z-index: -1;
			width: 100%;
			.list-header {
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				.title {
					float: left;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.empty {
					float: right;
					font-size: 12px;
					color: rgb(0, 160, 220);
				}
			}
			.list-content {
				padding: 0 18px;
				max-height: 217px;
				background: #fff;
				overflow: hidden;
				.food {
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(7, 17, 27, 0.1);
					.name {
						line-height: 24px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.price {
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 700;
						color: rgb(240, 20, 20);
					}
					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
</style>
