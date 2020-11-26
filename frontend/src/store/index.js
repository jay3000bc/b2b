import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}login`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}register`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          console.log(err.data)
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    resendOTP({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}resendOTP`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    verifyOTP({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}verifyotp`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    sendResetPasswordLink({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}sendResetPasswordLink`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    resetPassword({commit}, data){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}resetPassword`, data: data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user_account')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    profileUpdate({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}profileUpdate`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          // const token = resp.data.token
          // const user = resp.data.user
          // localStorage.setItem('token', token)
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          // commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getProfile({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}profile`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getPreferences({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}getPreferences`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    preferenceUpdate({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}updatePreferences`, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getProductCategories({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}getCartegories`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    previewProduct({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}previewProducts`, data: data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    previewProductDetails({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}previewProductsDetails/${id}`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    saveProduct({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}products`, data: data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    updateProduct({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}products/${data.id}`, data: data, method: 'PUT' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          //localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getCities({commit}, state) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getCities/${state}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getSellerProducts({commit}, user_id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getProducts/${user_id}`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getProducts({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}products`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getProduct({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}products/${id}`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getImages({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getImages`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    updateProductAvalibility({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}updateProductAvalibility`, data:data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    updateProductStatus({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}updateProductStatus`, data:data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    saveImages({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}saveImages`, data:data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    saveChangePassword({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}changePassword`, data:data, method: 'POST' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getSellers({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getSellers`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getBuyers({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getBuyers`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    search({commit}, search_keyword) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}search/${search_keyword}`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getSearchResult({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getSearchResult`, data: data, method: 'POST' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    becomeBuyer({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}updateUserType`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    becomeSeller({commit}){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_APIURL}updateUserType`, method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    createOrder({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}orders`, data: data, method: 'POST' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getOrders({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}orders`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getOrdersBySeller({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getOrdersBySeller`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getOrderByStatus({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getOrdersByStatus`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getOrderByStatusView({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getOrdersByStatusView`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    orderViewed({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}orderViewed`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    deleteOrder({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}deleteOrder/${id}`,  method: 'GET' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    sendMessage({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}messages`, data: data, method: 'POST' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getMessages({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}messages`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    updateMessageStatus({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}messages/${id}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getMessageByOrder({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getMessageByOrder/${id}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    updateAddress({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}updateAddress`, data: data, method: 'POST' })
        .then(resp => {
          //console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getAddressByOrder({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getAddressByOrder/${id}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getDefaultAddress({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getDefaultAddress`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getLocation({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `http://ip-api.com/json`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getCategories({commit}) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}getCategories`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    getUser({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_APIURL}users/${id}`, method: 'GET' })
        .then(resp => {
          console.log(resp)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
