import Vue from 'vue'
import App from './App'
import './common/navHold.js'

console.log(process.env)

import {
	RouterMount,
	createRouter
} from './dist/uni-simple-router.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerBeforeEach: (to, from, next) => {
		console.log(to)
		console.log(from);
		console.log(next)
	},
	routerAfterEach: (to, from) => {
		console.log(to)
		console.log(from);
	},
	routes: [{
			aliasPath: '/',
			path: '/pages/index/index',
			name: 'index',
			style: {
				navigationBarTitleText: 'uni-app'
			},
			children: [{
				aliasPath: '/',
				path: '/pages/index/index',
				name: 'index',
				style: {
					navigationBarTitleText: 'uni-app'
				},
			}]
		},
		{
			path: '/pages/tab1/tab1',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path: '/pages/tab2/tab2',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
	],
});

console.log(router)

Vue.use(router);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

RouterMount(app,router,'#app')

// app.$mount()