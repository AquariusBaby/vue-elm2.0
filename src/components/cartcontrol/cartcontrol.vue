<template>
	<div class="cartcontrol">
		<div class="decrease" @click.stop='decCart()' v-show="goodsCount[typeIndex][foodIndex]>0">-</div>
		<div class="count" v-show="goodsCount[typeIndex][foodIndex]>0">{{goodsCount[typeIndex][foodIndex]}}</div>
		<div class="increase" @click.stop='addCart()'>+</div>
	</div>
</template>
<script>
	/* eslint-disable */
	// import Vue from 'vue'
	import {mapGetters} from 'vuex'
	export default {

		props: {
			foodsId: {
				type: Number,
				default: 0
			},
			typeIndex: {
				type: Number,
				default: 0
			},
			foodIndex: {
				type: Number,
				default: 0
			},
			foodPrice: {
				type: Number,
				default: 0
			}
			/*foodName: {
				type: String,
				default: ''
			},
			count: {
				type: Number,
				default: 0
			}*/
		},
		data() {
			return {
				// count: 0
			}
		},
		computed: mapGetters([
			'goodsData','goodsCount'
		]),
		methods: {
			addCart(event) {
				let foodItem = {
					foodsId: this.foodsId,
					typeIndex: this.typeIndex,
					foodIndex: this.foodIndex,
					foodPrice: this.foodPrice
				}
				this.$store.dispatch('addCar', foodItem)
			//vue是通过检测get,set才得知数据是否更新的，而对于数组来说，是没有get，set方法的，所以需要我们自己手动触发，需要发送消息通知vue
				this.$set(this.goodsCount, this.goodsCount)
			},
			decCart() {
				let foodItem = {
					foodsId: this.foodsId,
					typeIndex: this.typeIndex,
					foodIndex: this.foodIndex,
					foodPrice: this.foodPrice
				}
				this.$store.dispatch('cutCar', foodItem)
				// console.log(this.goodsCount[0][0])
				this.$set(this.goodsCount, this.goodsCount)
			}
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.cartcontrol {
		font-size: 0;
		.decrease {
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
		}
		.count {
			display: inline-block;
			font-size: 10px;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			color: rgb(147, 192, 168);
		}
		.increase {
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0, 160, 220);
		}
	}
</style>

