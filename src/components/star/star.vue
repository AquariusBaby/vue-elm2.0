<template>
	<div class="star" :class="starType">
		<span v-for="item in itemClasses" :class="item" class="star-item"></span>
	</div>
</template>
<script>
/* eslint-disable */
	const LENGTH = 5,
		CLS_ON = 'on',
		CLS_HALF = 'half',
		CLS_OFF = 'off';	
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {	// 计算属性，差点把这东西给忘了
			starType() {
				return 'star-' + this.size
			},
			itemClasses() {
				let result = [],
					score = Math.floor(this.score*2)/2,
					hasDecimal = score % 1 !== 0,
					integer = Math.floor(score)
					;
				for(let i=0; i<integer; i++) {
					result.push(CLS_ON)
				}
				if(hasDecimal) {
					result.push(CLS_HALF)
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result;
			}
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
	.star {
		font-size: 0;
		&.star-48 {
			.star-item {
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&:last-child {
					margin-right: 0;
				}
				&.on {
					.bg-img('star48_on');
				}
				&.half {
					.bg-img('star48_half');
				}
				&.off {
					.bg-img('star48_off');
				}
			}
		}
		&.star-36 {
			.star-item {
				width: 15px;
				height: 15px;
				margin-right: 10px;
				background-size: 15px 15px;
				&:last-child {
					margin-right: 0;
				}
				&.on {
					.bg-img('star36_on');
				}
				&.half {
					.bg-img('star36_half');
				}
				&.off {
					.bg-img('star36_off');
				}
			}
		}
		&.star-24 {
			.star-item {
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&:last-child {
					margin-right: 0;
				}
				&.on {
					.bg-img('star24_on');
				}
				&.half {
					.bg-img('star24_half');
				}
				&.off {
					.bg-img('star24_off');
				}
			}
		}
		.star-item {
			display: inline-block;
			background-repeat: no-repeat;
		}
	}
</style>