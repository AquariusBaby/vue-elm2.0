import Vue from 'vue'
import Router from 'vue-router'

import Goods from '@/components/goods/goods.vue'
import Comment from '@/components/comment/comment.vue'
import Seller from '@/components/seller/seller.vue'
import Food from '@/components/food/food.vue'

// const Goods = r => require.ensure([], () => r(require('@/components/goods/goods.vue')), 'Goods')
// const Comment = r => require.ensure([], () => r(require('@/components/comment/comment.vue')), 'Comment')
// const Seller = r => require.ensure([], () => r(require('@/components/seller/seller.vue')), 'Seller')
// const Food = r => require.ensure([], () => r(require('@/components/food/food.vue')), 'Food')

Vue.use(Router)
/* eslint-disable */
export default new Router({
	// base: "/app/",
	routes: [
		{
			path: '/',
			component: Goods,
			redirect: '/goods'
		},
		{
			path: '/goods',
      name: "gooda",
			component: Goods,
      children: [
        {
          path: 'detail',
          component: Food
        }
      ]
		},
		{
			path: '/comment',
			component: Comment
		},
		{
			path: '/seller',
			component: Seller
		}
		// {
		// 	path: '/foodDetail',
		// 	component: Food
		// }
	]
})

