import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  me: {},
  history: [],
};

const mutations = {
  setMe(state, {me}) {
    state.me = me;
  },
  addHistory(state, {history}){
    history.forEach(element => {
      element.forEach(elem => {
        state.history.push(elem.entry);
      })
    });
  },
}

const getters = {
  getMyUuid: (state) => state.me.uuid,
  getHistoryMsgs: (state) => state.history,
};
  
export default new Vuex.Store({
  state,
  getters,
  mutations,
});
