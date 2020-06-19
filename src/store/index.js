import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:"hello",
    search_venue:"",
    photoview_result:""
  },
  mutations: {
    changeState (state, payload) {
      state.username = payload;
      state.search_venue=payload;
      state.photoview_result=payload;
    }
  },
  actions: {
    changeState (context, payload) {
      setTimeout(() => {
        context.commit("changeState", payload);
      }, 2000);
    }
  },
  modules: {
  }
})
