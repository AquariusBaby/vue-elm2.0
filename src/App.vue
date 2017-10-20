<template>
  <div id="app">
    <vHeader></vHeader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <transition name="fade">
      <div class="cover" @click.stop="closeCover()" v-show="isCover"></div>
    </transition>
    <vShopcart></vShopcart>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import vHeader from './components/header/header.vue'
import shopcart from '@/components/shopcart/shopcart.vue'
export default {
  name: 'app',
  components: {
    'vHeader': vHeader,
    'vShopcart': shopcart
  },
  data () {
    return {
      // seller: {}
    }
  },
  computed: mapGetters([
    'isCover'
  ]),
  beforeCreate() {
    this.$store.dispatch('getSllerInfo')
  },
  methods: {
    closeCover() {
      this.$store.dispatch('isCover', false)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
/* @import "./common/less/index.less"; */
#app {
  .borderHalf(@color) { //less中变量用@符  //通过外部文件没引进来？
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid @color;
    }
  }
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      .borderHalf(rgba(7, 17, 27, 0.1));
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
  .cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
}
</style>
