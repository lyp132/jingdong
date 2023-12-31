import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "CartList" */ '../views/cartList/CartList')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "Orderlist" */ '../views/orderList/OrderList')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "Mine" */ '../views/mine/Mine')
  },
  {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "MyAddressList" */ '../views/myAddressList/MyAddressList')
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "AddressEdit" */ '../views/addressEdit/AddressEdit')
  },
  {
    path: '/addressSelect',
    name: 'AddressSelect',
    component: () => import(/* webpackChunkName: "AddressSelect" */ '../views/addressSelect/AddressSelect')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "OrderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      // if (isLogin) {
      //   next({ name: 'Home' })
      //   console.log('222')
      // } else {
      //   next()
      // }
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/register/Register')
  }, {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  // if (isLogin || to.name === 'Login') {
  //   next()
  //   console.log('111')
  // } else {
  //   next({ name: 'Login' })
  // }
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
