<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{sellerInfo.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="sellerInfo.score"></star>
          <span class="text">({{sellerInfo.ratingCount}})</span>
          <span class="text">月售{{sellerInfo.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @touchstart="toggleFavorite()">
          <!-- <span class="icon-favorite" :class="{'active':favorite}"></span> -->
          <i class="icon iconfont" :class="favorite?'icon-love-b': 'icon-love-b1'"></i>
          <span class="text">{{favorite?"已收藏":"收藏"}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{sellerInfo.bulletin}}</p>
        </div>
        <ul v-if="sellerInfo.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in sellerInfo.supports">
            <span class="icon" :class="classMap[sellerInfo.supports[index].type]"></span>
            <span class="text">{{sellerInfo.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in sellerInfo.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in sellerInfo.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import split from '@/components/split/split.vue'
	import star from '@/components/star/star.vue'

	export default {
    beforeCreate() {
      let _this = this
      this.$store.dispatch('getSllerInfo').then(function(){
        _this.$nextTick(() => {
          // _this.scroll = new BScroll(_this.$refs.seller)
          _this._initScroll()
          _this._initPics()
        });
      })
    },
		data() {
			return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			}
		},
    computed: mapGetters([
      'sellerInfo','favoriteText','favorite'
    ]),
    methods: {
      toggleFavorite(event) {
        this.$store.dispatch('getFavorite')
      },
      _initScroll() {
      	let _this = this
        if (!this.scroll) {
          this.scroll = new BScroll(_this.$refs.seller)
        } else {
          this.scroll.refresh()
        }
      },
      _initPics() {
        if (this.sellerInfo.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.sellerInfo.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      loadFromLocal(id, key, def) {
				let seller = window.localStorage.__seller__
				if (!seller) {
					return def
				}
				seller = JSON.parse(seller)[id]
				if (!seller) {
					return def
				}
				let ret = seller[key]
				return ret || def
			},
			saveToLocal(id, key, value) {
				let seller = window.localStorage.__seller__
				if (!seller) {
					seller = {}
					seller[id] = {}
				} else {
					seller = JSON.parse(seller)
					if (!seller[id]) {
						seller[id] = {}
					}
				}
				seller[id][key] = value
				window.localStorage.__seller__ = JSON.stringify(seller)
			}
    },
    components: {
    	star,
    	split
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
	.seller {
    text-align: left;
    position: absolute;
    top: 174px;
    bottom: 48px;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      text-align: left;
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 15px;
        font-weight: bold;
      }
      .desc {
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        > i.icon-love-b {
          color: rgb(240, 20, 20);
        }
        .text {
          display: block;
          margin-top: 5px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 0;
          &:last-child {
            border-bottom: none;
          }
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
            .bg-img('decrease_4');
          }
          &.discount {
            .bg-img('discount_4');
          }
          &.guarantee {
            .bg-img('guarantee_4');
          }
          &.invoice {
            .bg-img('invoice_4');
          }
          &.special {
            .bg-img('special_4');
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          overflow-x: auto;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 15px;
        font-weight: 600;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
        &:last-child {
           border-bottom: none;
        }
      }
    }
  }
</style>
