import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Preferences from '../views/Preferences.vue'
import Dashboard from '../views/Dashboard.vue'
import AddProduct from '../views/AddProduct.vue'
import ListProduct from '../views/ListProduct.vue'
import ImageGallary from '../views/ImageGallery.vue'
import SingleProduct from '../views/SingleProduct.vue'
import MyShop from '../views/MyShop.vue'
import PreviewProduct from '../views/PreviewProduct.vue'
import ChangePassword from '../views/ChangePassword.vue'
import SearchResult from '../views/SearchResult.vue'
import Buyers from '../views/Buyers.vue'
import Suppliers from '../views/Suppliers.vue'
import BecomeBuyer from '../views/BecomeBuyer.vue'
import BecomeSeller from '../views/BecomeSeller.vue'
import HelpSupport from '../views/HelpSupport.vue'
import MyOrders from '../views/MyOrders.vue'
import Orders from '../views/Orders.vue'
import Messages from '../views/Messages.vue'
import ViewAsSellerBuyer from '../views/ViewAsSellerBuyer.vue'
import BuyerDetails from '../views/BuyerDetails.vue'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reset-password/:token',
    name: 'Home',
    component: Home,
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
    path: '/add-product/:id?',
    name: 'AddProduct',
    component: AddProduct,
    alias: '/update-product/:id',
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
  },
  {
    path: '/image-gallery',
    name: 'ImageGallary',
    component: ImageGallary,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/product-details/:id',
    name: 'SingleProduct',
    component: SingleProduct,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/preview/:id',
    name: 'PreviewProduct',
    component: PreviewProduct,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/my-shop',
    name: 'MyShop',
    component: MyShop,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/my-shop/:id',
    name: 'MyShop',
    component: MyShop,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/search-results/:search_key',
    name: 'SeachResult',
    component: SearchResult,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/buyers',
    name: 'Buyers',
    component: Buyers,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/become-buyer',
    name: 'BecomeBuyer',
    component: BecomeBuyer,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/help-support',
    name: 'HelpSupport',
    component: HelpSupport,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: MyOrders,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/become-seller',
    name: 'BecomeSeller',
    component: BecomeSeller,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/messages/:id',
    name: 'Messages',
    component: Messages,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/view-as-seller-buyer',
    name: 'ViewAsSellerBuyer',
    component: ViewAsSellerBuyer,
    meta: { 
      requiresAuth: true
    },
  },
  {
    path: '/buyer-details/:id',
    name: 'BuyerDetails',
    component: BuyerDetails,
    meta: { 
      requiresAuth: true
    },
  },

]

const router = new VueRouter({
  mode: 'history',
  //mode: '#',
  base: process.env.BASE_URL,
  //base: '/mukesh/b2b/',
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
