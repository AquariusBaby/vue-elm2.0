<template>
  <div id="app">
    <vHeader></vHeader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vHeader from './components/header/header.vue'
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$axios.get('../src/resource/img/brand@2x.png').then((res) => {
      this.seller = res.seller
      console.log(1)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  components: {
    'vHeader': vHeader
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
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
