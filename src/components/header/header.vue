<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper"></div>
	</div>
</template>
<script>
/* eslint-disable */
	export default {
		data () {
			return {
				seller: {}
			}
		},
		created () {
			let _this = this;
			this.$axios.get('static/json/data.json').then((res) => {
				_this.seller = res.data.seller
				// console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	  }
	}
</script>
<style lang="less" rel="stylesheet/less">
	.header {
		color: #fff;
		background-color: #000;
		.content-wrapper {
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar {
				display: inline-block;
			}
			.content {
				display: inline-block;
				font-size: 14px;
				margin-left: 16px;
				.title {
					margin: 2px 0 8px 0;
					.brand {
						width: 30px;
						height: 18px;
						display: inline-block;
						background: url()
					}
				}
			}
		}
	}
</style>
