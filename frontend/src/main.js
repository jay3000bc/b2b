import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import Axios from 'axios'
import OtpInput from "@bachdgvn/vue-otp-input";
import VueSweetalert2 from 'vue-sweetalert2';


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component("v-otp-input", OtpInput);

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, options);

const user_token = localStorage.getItem('token')
if (user_token) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${user_token}`
}

Vue.prototype.$apiURI = `http://${process.env.VUE_APP_HOST}/public`;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
