<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="sellerInfo.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{sellerInfo.name}}</span>
				</div>
				<div class="description">
					{{sellerInfo.description}}/{{sellerInfo.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="sellerInfo.supports">
					<span class="icon" :class="classMap[sellerInfo.supports[1].type]"></span>
					<span class="text">{{sellerInfo.supports[1].description}}</span>
				</div>
			</div>
			<div v-if="sellerInfo.supports" class="support-count" @touchstart="showDetail()">
				<span class="count">{{sellerInfo.supports.length}}个</span>
				<i class="icon iconfont icon-jiantouyou"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @touchstart="showDetail()">
			<span class="bulletin-title"></span><span class="bulletin-text">{{sellerInfo.bulletin}}</span>
			<i class="icon iconfont icon-jiantouyou"></i>
		</div>
		<div class="background">
			<img :src="sellerInfo.avatar" width="100%" height="100%" alt="">
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{sellerInfo.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="sellerInfo.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="sellerInfo.supports" class="supports">
							<li class="support-item" v-for="(item, index) in sellerInfo.supports">
								<span class="icon" :class="classMap[index]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{sellerInfo.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail()">
					<i class="icon iconfont icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
/* eslint-disable */
	import { mapGetters } from 'vuex'
	import star from '@/components/star/star.vue'
	
	export default {
		// props: {
		// 	seller: {
		// 		type: Object
		// 	}
		// },
		data () {
			return {
				detailShow: false
			}
		},
		computed: mapGetters([
			'sellerInfo'
		]),
		created () {
			this.classMap = ['decrease','discount','guarantee','invoice','special']
	  	},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			}
		},
		components: {
			star
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	// @import url("../../common/iconfont/iconfont.css");
	.bg-img(@url) {
		background-image: url('@{url}@2x.png');
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
			background-image: url("@{url}@3x.png");
		}
	}
	.header {
		position: relative;
		color: #fff;
		background: rgba(7, 17, 27, 0.5);
		overflow: hidden;
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
				text-align: left;
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
			position: relative;
			/* font-size: 0; */
			.bulletin-title {
				// position: absolute;
				// left: 12px;
				// top: 8px;
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
				// position: absolute;
				// left: 34px;
				// top: 1px;
				font-size: 10px;
				font-weight: 200;
				margin: 0 4px;
				vertical-align: top;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			>i {
				position: absolute;
		        font-size: 10px;
		        right: 12px;
		        top: 0;
			}
		}
		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}
		.detail {
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 100;
			overflow: auto;
			background: rgba(7, 17, 27, 0.8);
			top: 0;
			left: 0;
			&.fade-enter-active, &.fade-leave-active {
		      	transition: all 0.5s;
		    }
		    &.fade-enter, &.fade-leave-active {
		      	opacity: 0;
		      	background: rgba(7, 17, 27, 0);
		    }
			.detail-wrapper {
				min-height: 100%;
				width: 100%;
				.detail-main {
					margin-top: 64px;
					padding-bottom: 64px;
					.name {
						line-height: 16px;
						text-align: center;
						font-size: 16px;
						font-weight: 700;
					}
					.star-wrapper {
						margin-top: 18px;
						padding: 2px 0;
						text-align: center; 
					}
					.title {
						display: flex;
						width: 80%;
						margin: 28px auto 24px auto;
						.line {
							flex: 1;
							position: relative;
							top: -6px;
							border-bottom: 1px solid rgba(255, 255, 255, 0.2);
						}
						.text {
							padding: 0 12px;
							font-size: 14px;
							font-weight: 700;
						}
					}
					.supports {
						width: 80%;
						margin: 0 auto;
						text-align: left;
						.support-item {
							padding: 0 12px;
							margin-bottom: 12px;
							font-size: 0;
							&:last-child {
								margin-bottom: 0;
							}
							.icon {
								display: inline-block;
								width: 16px;
								height: 16px;
								vertical-align: top;
								margin-right: 6px;
								background-size: 16px 16px;
								background-repeat: no-repeat;
								&.decrease {
									.bg-img('decrease_2');
								}
								&.discount {
									.bg-img('discount_2');
								}
								&.guarantee {
									.bg-img('guarantee_2');
								}
								&.invoice {
									.bg-img('invoice_2');
								}
								&.special {
									.bg-img('special_2');
								}
							}
							.text {
								line-height: 16px;
								font-size: 12px;
							}
						}
					}
					.bulletin {
						width: 80%;
						margin: 0 auto;
						.content {
							padding: 0 12px;
							line-height: 24px;
							font-size: 12px;
							text-align: left;
						}
					}
				}
			}
			.detail-close {
				position: relative;
				width: 32px;
				height: 32px;
				margin: -64px auto 0 auto;
				clear: both;
				font-size: 32px;
				> i {
					font-size: 24px;
				}
			}
		}
	}
</style>
