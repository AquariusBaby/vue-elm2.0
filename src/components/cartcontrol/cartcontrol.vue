<template>
	<div class="cartcontrol">
		<div class="decrease" @click.stop='decCart()' v-show="count>0">-</div>
		<div class="count" v-show="count>0">{{count}}</div>
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
			}
			/*foodPrice: {
				type: Number,
				default: 0
			},
			foodName: {
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
				count: 0
			}
		},
		computed: mapGetters([
			'goodsData'
		]),
		methods: {
			addCart(event) {
				// this.count++
				let foodItem = {
					foodsId: this.foodsId,
					typeIndex: this.typeIndex
					// foodPrice: this.foodPrice,
					// foodName: this.foodName,
					// count: this.count
				}
				this.$store.dispatch('addCar', foodItem)
			},
			decCart() {
				/*if(this.count>0) {
					this.count --
				}
				let foodItem = {
					foodsId: this.foodsId,
					typeIndex: this.typeIndex,
					foodPrice: this.foodPrice,
					count: this.count
				}
				this.$store.dispatch('cutCar', foodItem)*/
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

