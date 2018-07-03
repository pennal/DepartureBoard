import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  location: null,
  entries: null
};

const mutations = {
  updateEntry(state, entry) {
    for (let i = 0; i < state.entries.length; i++) {
      if (state.entries[i].id === entry.id) {
        console.debug("[STORE] - Updating entry with id " + entry.id);
        state.entries[i] = entry;
        break;
      }
    }
  },
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
  },
  addEntries(state, entries) {

    let newEntries = [];

    for (let i = 0; i < entries.length; i++) {
      let current = {
        id: entries[i].name.replace(" ", "_"),
        title: entries[i].to,
        lineNumber: entries[i].number,
        departure: {
          time: entries[i].stop.departureTimestamp,
          platform: entries[i].stop.platform,
          timeLeft: 0
        },
        type: entries[i].name,
        category: entries[i].category,
        delay: entries[i].stop.delay
      };

      newEntries.push(current);
    }


    let oldEntries = state.entries;

    if (oldEntries === null || oldEntries === undefined || oldEntries.length === 0) {
      state.entries = newEntries;
    } else {
      // Merge the two lists
      function printList(l) {
        let p = "";
        for (let i = 0; i < l.length; i++) {
          p += l[i].id + ";";
        }
        console.log(p);
      }

      // Get the last entry of the current ones
      let lastCurrentEntry = state.entries[state.entries.length - 1];

      // Take the new entries, and from the TAIL, add them to the current ones
      let tempNewEntries = [];
      for (let i = newEntries.length - 1; i >= 0; i--) {
        // Stop when you find the last item of the current entries in the new ones
        if (lastCurrentEntry.id === newEntries[i].id) {
          break;
        }
        tempNewEntries.unshift(newEntries[i]);
      }

      for (let i = 0; i < tempNewEntries.length; i++) {
        console.debug("Adding " + JSON.stringify(tempNewEntries[i]));
        state.entries.push(tempNewEntries[i]);
      }
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

