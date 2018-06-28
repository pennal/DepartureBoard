<template>
  <div id="app">
    <notifications group="connection-error" position="top center"/>

    <status-bar v-if="$store.state.location !== null"></status-bar>
    <entries-list v-if="$store.state.location !== null"></entries-list>
    <time-keeper v-if="$store.state.location !== null"></time-keeper>

    <station-chooser v-else></station-chooser>
  </div>
</template>

<script>
  import StatusBar from './components/StatusBar'
import EntriesList from './components/EntriesList'
import TimeKeeper from './components/TimeKeeper'
import StationChooser from "./components/StationChooser";

export default {
  name: 'app',
  components: {
    StatusBar,
    StationChooser,
    EntriesList,
    TimeKeeper
  },
  mounted() {
    let retrievedLocation = localStorage.getItem('location');

    if (retrievedLocation !== null) {
      this.$store.commit('setLocation', retrievedLocation);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue UltraLight', sans-serif;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  -moz-osx-font-smoothing: grayscale;
  background-color: #1A1C19;
  color: white;
}

  .row {
    margin-right: 0;
    margin-left: 0;
  }

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
