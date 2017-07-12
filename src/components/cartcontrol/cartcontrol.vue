<template>
	<div class="cartcontrol">
		<div class="decrease" @touchstart='decCart()' v-show="food.count>0">-</div>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="increase" @touchstart='addCart($event)'>+</div>
	</div>
</template>
<script>
	/* eslint-disable */
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		// data() {
		// 	return {
		// 		food: {
		// 			count: 1
		// 		}
		// 	}
		// },
		methods: {
			addCart(event) {
				// if (!event._constructed) {
				// 	return ;
				// }
				if (!this.food.count) {
					//console.log(this.food)
					Vue.set(this.food, 'count', 1)
					// this.food.count = 1
				} else {
					this.food.count++
				}
				console.log(this.$el)
			},
			decCart() {
				if(this.food.count) {
					this.food.count --
				}
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

