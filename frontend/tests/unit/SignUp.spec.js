import { createLocalVue, mount } from '@vue/test-utils'
import SignUp from '@/components/SignUp.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

const state = {
  user: {
    mobile_number: '8638522394',
    password: '12345678',
    user_type: 's'
  }
}

const actions = {
  signUp: jest.fn()
}

const getters = {
  getSignupData () {
    return state.user
  }
}

const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state,
      actions,
      getters
    }
  }
})

describe('SignUp.vue', () => {
  it('call getters return form data', () => {
    const wrapper = mount(SignUp, {
      store,
      localVue
    })
    console.log(wrapper.vm)
  })
})
