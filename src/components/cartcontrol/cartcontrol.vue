<template>
	<div class="cartcontrol">
		<div class="decrease" @click.stop='decCart()' v-show="count>0">-</div>
		<div class="count" v-show="count>0">{{count}}</div>
		<div class="increase" @click.stop='addCart($event)'>+</div>
	</div>
</template>
<script>
	/* eslint-disable */
	// import Vue from 'vue'
	import {mapGetters} from 'vuex'
	export default {
		props: {
			foodsId: {
				type: Number
			},
			typeIndex: {
				type: Number
			},
			foodPrice: {
				type: Number
			},
			foodName: {
				type: String
			}
		},
		data() {
			return {
				count: 0
			}
		},
		methods: {
			addCart(event) {
				/* if (!this.food.count) {
					// Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
				} */
				/*console.log(event.taraget)
				let countEle = event.target.previousElementSibling
				console.log(countEle.parentNode.parentNode)*/
				this.count++
				let foodItem = {
					foodsId: this.foodsId,
					typeIndex: this.typeIndex,
					foodPrice: this.foodPrice,
					foodName: this.foodName,
					count: this.count
				}
				this.$store.dispatch('addCar', foodItem)
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

