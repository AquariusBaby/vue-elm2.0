<template>
	<div class="rating">
		<div class="rating-type">
			<span @touchstart="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div @touchstart="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
			<span></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	/* eslint-disable */
	const POSITIVE = 0,
				NEGATIVE = 1,
				ALL =2
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negative() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		},
		methods: {
			select(type, event) {
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
</style>
