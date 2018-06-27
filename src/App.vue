<template>
  <div id="app">
    <entries-list v-if="location !== null"></entries-list>
    <time-keeper v-if="location !== null"></time-keeper>


    <station-chooser v-else></station-chooser>

  </div>
</template>

<script>
import EntriesList from './components/EntriesList'
import TimeKeeper from './components/TimeKeeper'
import StationChooser from "./components/StationChooser";

export default {
  name: 'app',
  components: {
    StationChooser,
    EntriesList,
    TimeKeeper
  },
  data() {
    return {
      location: null
    };
  },
  mounted() {
    this.location = localStorage.getItem('location');

    console.log(this.location == null )
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #1A1C19;
  color: white;
}

  .row {
    margin-right: 0;
    margin-left: 0;
  }
</style>
