<template>
	<div class="star" :class="starType">
		<span v-for="item in itemClass" class="star-item"></span>
	</div>
</template>
<script>
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
			}
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.star {
		font-size: 0;
		&.star-48 {
		
		}
		&.star-36 {
			
		}
		&.star-24 {
			
		}
		.star-item {
			display: inline-block;
			background-repeat: no-repeat;
		}
	}
</style>