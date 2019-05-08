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
      state.history.push(element.entry);
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
