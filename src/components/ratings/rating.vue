<template>
<div>
	<div class="rating">
		<div class="rating-type">
			<span @touchstart="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{foodData.ratings.length}}</span></span>
			<span @touchstart="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive}}</span></span>
			<span @touchstart="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative}}</span></span>
		</div>
		<div @touchstart="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
			<span></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
	<div class="rating-wrapper">
		<ul v-show="foodData.ratings && foodData.ratings.length">
			<li v-for="rating in foodData.ratings" class="rating-item" v-show="(rating.text||onlyContent)&&(rating.rateType==selectType||selectType==2)">
				<div class="user">
					<span class="name">{{rating.username}}</span>
					<img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
				</div>
				<div class="time">{{rating.rateTime}}</div>
				<p class="text">
					<span></span>{{rating.text}}
				</p>
			</li>
		</ul>
		<div class="no-rating" v-show="!foodData.ratings || foodData.ratings.length"></div>
	</div>
</div>
</template>
<script>
	/* eslint-disable */
	const POSITIVE = 0,
			NEGATIVE = 1,
			ALL =2
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				selectType : 2,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		computed: mapGetters([
			'foodData','positive','negative'
		]),
		methods: {
			select(type) {
				this.selectType = type
			},
			toggleContent(event) {
				this.onlyContent =!this.onlyContent
			}
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.rating {
		.rating-type {
			padding: 18px 0;
			margin: 0 18px;
			border-bottom: 1px solid #f3f5f7;
			font-size: 0;
			.block {
				display: inline-block;
				line-height: 16px;
				padding: 8px 12px;
				margin-right: 8px;
				border-radius: 1px;
				color: rgb(77, 85, 93);
				font-size: 12px;
				&.active {
						color: #fff;
					}
				.count {
					font-size: 8px;
					margin-left: 2px;
				}
				&.positive {
					background: rgba(0, 160, 220, 0.2);
					&.active {
						background: rgb(0, 160, 220);
					}
				}
				&.negative {
					background: rgba(77, 85, 93, 0.2);
					&.active {
						background: rgb(0, 160, 220);
					}
				}
			}
		}
		.switch {
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			color: rgb(147, 153, 159);
			&.on {
				span {
					color: #00c850;
				}
			}
			> span {
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			}
			&.text {
				font-size: 12px;
			}
		}
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
</style>
