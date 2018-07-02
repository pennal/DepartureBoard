<template>
  <div class="entries">
    <transition-group  name="fade" mode="out-in" tag="span" :duration="500">

    <div class="loading-placeholder d-flex" v-if="$store.getters.getEntries === null || $store.getters.getEntries.length === 0" :key="1">
      <h1 class="align-self-center justify-content-center" style="width: 100%;">Loading entries...</h1>
    </div>

    <entry v-else v-for="(entry, index) in $store.getters.getEntries" v-bind:index="index" :key="entry.id"></entry>

    </transition-group>
  </div>
</template>

<script>
import Entry from "./Entry";
import axios from 'axios';

export default {
  components: {Entry},
  name: 'entries-list',

  mounted() {
    this.fetchStationboard();

    this.$options.interval = setInterval(this.fetchStationboard, 30000);
  },
  beforeDestroy () {
    clearInterval(this.$options.interval);
  },


  methods: {
    fetchStationboard() {

      console.log("Fetching latest data");

      let location = localStorage.getItem('location');
      let station = encodeURI(location);


      axios.get("https://transport.opendata.ch/v1/stationboard?station=" + station + "&limit=15")
      .then(response => {
        // JSON responses are automatically parsed.
        let stationboard = response.data.stationboard;

        if (stationboard.length === 0) {
          console.error("Location \"" + location + "\" is invalid! Exit!");

          alert("Location \"" + location + "\" is invalid! You will now be redirected to the home page");

          localStorage.removeItem("location");
          this.$store.commit('setLocation', null);
          this.$store.commit('setEntries', null);
        }

        this.$store.commit('addEntries', stationboard);
      })
      .catch(e => {
        this.$notify({
          group: 'connection-error',
          title: 'Error while fetching data',
          text: e.message,
        });
        console.log(e.message);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .loading-placeholder {
    height: 100%;
    text-align:center;

  }

  .entries {
    height: 88vh;
    overflow: hidden;
  }

</style>
