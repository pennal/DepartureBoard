import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  location: null,
  entries: null
};

const mutations = {
  setLocation(state, location) {
    state.location = location;
  },
  setEntries(state, entries) {
    state.entries = entries;
  },
  removeEntry(state, entry) {
    let index = state.entries.indexOf(entry);
    if (index > -1) {
      state.entries.splice(index, 1);
    }
  }
};

const getters = {
  getLocation(state) {
    return state.location;
  },
  getEntries(state) {
    return state.entries;
  }
 };

const actions = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

