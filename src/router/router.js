import { createRouter, createWebHistory } from 'vue-router'
// ===============Pinia===================================
// import { storeToRefs } from 'pinia'
// import { useUser } from '@/store/user.js'
// const { userData } = storeToRefs(useUser());


//創建路由器對象
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      //前台主路由
      {
        path: '/',
        component: () => import('../views/Main.vue'),
        children: [
			//子路由
			{
			path: '/',
			name: 'index',
			component: () => import('../views/Home.vue'),
			},
			{
			path: '/products',
			name: 'products',
			component: () => import('../views/Products.vue'),
			},
			{
			path: '/FAQ',
			name: 'FAQ',
			component: () => import('../views/FAQ.vue'),
			},
			{
			path: '/productsdetail',
			name: 'productsdetail',
			component: () => import('../components/Front/ProductsDetail.vue'),
			},
			{
			path: '/login',
			name: 'login',
			component: () => import('../views/Login.vue'),
			},
			{
			path: '/user',
			name: 'user',
			component: () => import('../views/User.vue'),
			meta: {
				userauth: true //添加字段判斷該頁面是否需要登錄
			}
			},
			{
			path: '/cart',
			name: 'cart',
			component: () => import('../components/Front/Cart.vue'),
			},
			{
			path: '/form',
			name: 'form',
			component: () => import('../components/Front/Form.vue'),
			meta: {
				userauth: true //添加字段判斷該頁面是否需要登錄
			}

			},
			{
			path: '/completed',
			name: 'completed',
			component: () => import('../components/Front/Completed.vue'),
			meta: {
				userauth: true //添加字段判斷該頁面是否需要登錄
			}
			},

        ]
      },
      //後台登入
      {
        path: '/backstage',
        name: 'backstage',
        component: () => import('../views/Backstage.vue'),
      },
      //後台主路由
      {
        path: '/main',
        name: 'main',
        component: () => import('../views/BMain.vue'),
        children: [
          //子路由
          {
            path: '/home',
            name: 'home',
            component: () => import('../views/BHome.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
          {
            path: '/commodity',
            name: 'commodity',
            component: () => import('../views/BCommodity.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
          {
            path: '/order',
            name: 'order',
            component: () => import('../views/BOrder.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
          {
            path: '/member',
            name: 'member',
            component: () => import('../views/BMember.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
		  {
            path: '/message',
            name: 'message',
            component: () => import('../views/BMessage.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
		  {
            path: '/test',
            name: 'test',
            component: () => import('../views/Test.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
		  {
            path: '/123',
            name: '123',
            component: () => import('../views/123.vue'),
			meta: {
				auth: true //添加字段判斷該頁面是否需要登錄
			}
          },
        ]
      }
    ]
  })

//添加路由守衛
router.beforeEach((to, from, next) => {
	if (to.meta.userauth) {
		//驗證token，只有token存在的時候才會跳轉頁面
		let token = sessionStorage.getItem('token')
		if(token){
			next()
		}else{
			next('/login')
		}
	}else if (to.meta.auth){
		let auth = sessionStorage.getItem('auth');
		if (auth) {
			next();
		} else {
			next('/backstage'); 
		}

	}else{
		next();
	}

})

//導出路由器對象
export default router