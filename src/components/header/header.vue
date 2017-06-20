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
					<span class="icon" :class="classMap[seller.supports[1].type]"></span>
					<span class="text">{{seller.supports[1].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}</span>
				<i></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i></i>
		</div>
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
			this.classMap = ['decrease','discount','guarantee','invoice','special']
	  }
	}
</script>
<style lang="less" rel="stylesheet/less">
	.bg-img(@url) {
		background-image: url('@{url}@2x.png');
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
			background-image: url("@{url}@3x.png");
		}
	}
	.header {
		color: #fff;
		background-color: #000;
		.content-wrapper {
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar {
				display: inline-block;
				vertical-align: top;
				img {
					border-radius: 2px;
				}
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
						vertical-align: top;
						.bg-img('brand');
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					.name {
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.description {
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}
				.support {
					.icon {
						vertical-align: top;
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease {
							.bg-img('decrease_1');
						}
						&.discount {
							.bg-img('discount_1');
						}
						&.guarantee {
							.bg-img('guarantee_1');
						}
						&.invoice {
							.bg-img('invoice_1');
						}
						&.special {
							.bg-img('special_1');
						}
					}
					.text {
						line-height: 1;
						font-size: 12px;
					}
				}
			}
			.support-count {
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background-color: rgba(0,0,0,0.2);
				text-align: center;
				.count {
					font-size: 10px;
				}
				i {
					font-size: 10px;
					margin-left: 2px;
					line-height: 24px;
				}
			}
		}
		.bulletin-wrapper {
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			/* font-size: 0; */
			.bulletin-title {
				display: inline-block;
				width: 22px;
				height: 12px;
				.bg-img('bulletin');
				background-size: 22px 12px;
				background-repeat: no-repeat;
				vertical-align: top;
				margin-top: 7px;
			}
			.bulletin-text {
				font-size: 10px;
				font-weight: 200;
				margin: 0 4px;
				vertical-align: top;
			}
		}
	}
</style>
