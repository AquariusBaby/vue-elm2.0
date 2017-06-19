import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods.vue'
import Comment from '@/components/comment/comment.vue'
import Seller from '@/components/seller/seller.vue'

Vue.use(Router)
/* eslint-disable */
export default new Router({
	routes: [
		{
			path: '/',
			component: Goods,
			redirect: '/goods'
		},
		{
			path: '/goods',
			component: Goods
		},
		{
			path: '/comment',
			component: Comment
		},
		{
			path: '/seller',
			component: Seller
		}
	]
})

