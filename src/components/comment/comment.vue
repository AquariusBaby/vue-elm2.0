<template>
	<div class="comment" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{sellerInfo.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{sellerInfo.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="sellerInfo.serviceScore"></star>
            <span class="score">{{sellerInfo.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="sellerInfo.foodScore"></star>
            <span class="score">{{sellerInfo.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{sellerInfo.deliveryTime}}分钟</span>
          </div>
				</div>
			</div>
			<vSplit></vSplit>
			<!-- <vRating :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></vRating> -->
      <vRating @initscroll="initscroll"></vRating>
			<!-- <div class="rating-wrapper">
        <ul>
          <li v-for="item in ratings" v-show="needShow(item.rateType, item.text)" class="rating-item">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
              </div>
              <p class="text">{{item.text}}</p>
                    <div class="recommend" v-show="item.recommend && item.recommend.length">
                      <span class="icon-thumb_up"></span>
                      <span class="item" v-for="commentItem in item.recommend">{{commentItem}}</span>
                    </div>
                    <div class="time">
                      {{item.rateTime}}
                    </div>
            </div>
          </li>
        </ul>
      </div> -->
		</div>
    
	</div>
</template>
<script>
	/* eslint-disable */
  import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import split from '@/components/split/split.vue'
	import rating from '@/components/ratings/rating.vue'
	import star from '@/components/star/star.vue'
  import shopcart from '@/components/shopcart/shopcart.vue'

	const ALL = 2;

	export default {
    beforeCreate() {
      let _this = this
      this.$store.dispatch('getCommentData').then(function(res){
        _this.$nextTick(() => {
          _this.scroll = new BScroll(_this.$refs.ratings)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    activated() {
      let _this = this
      this.$store.dispatch('getCommentData').then(function(res){
        _this.$nextTick(() => {
          _this.scroll = new BScroll(_this.$refs.ratings)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
		data() {
			return {
				selectType: ALL,
				onlyContent: true
        // isInitScroll: this.initScroll
			}
		},
    computed: mapGetters([
      'sellerInfo','commentData'
    ]),
    // watch: {
    //   isInitScroll: {
    //     handler:function(){
    //       console.log(this)
    //       this.scroll.refresh();
    //     },
    //     deep:true
    //   }
    // },
		methods: {
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false
				}
				if (this.selectType === ALL) {
					return true
				} else {
					return type === this.selectType
				}
			},
      initscroll() {
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
		},
		components: {
			'vSplit': split,
			'vRating': rating,
			'star': star,
      'vShopcart': shopcart
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
	.comment {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview {
			display: flex;
			padding: 18px 0;
			.overview-left {
				flex: 0 0 137px;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
			}
			.overview-right {
        text-align: left;
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }
          .score {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
		}
    .rating {
      text-align: left;
    }
		.rating-wrapper {
      padding: 0 18px;
      text-align: left;
      .rating-item {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid (rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
	}
</style>
