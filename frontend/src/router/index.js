import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Preferences from '../views/Preferences.vue'
import Dashboard from '../views/dashboard.vue'
import AddProduct from '../views/AddProduct.vue'
import ListProduct from '../views/ListProduct.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: Preferences,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/add-product/:id',
    name: 'AddProduct',
    component: AddProduct,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/list-product',
    name: 'ListProduct',
    component: ListProduct,
    meta: { 
      requiresAuth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: '/mukesh/b2b/',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
