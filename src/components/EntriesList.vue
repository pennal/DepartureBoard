<template>
  <div class="entries">

    <div class="loading-placeholder d-flex" v-if="entries.length === 0">
      <h1 class="align-self-center justify-content-center" style="width: 100%;">Loading entries...</h1>
    </div>


    <entry v-else v-for="entry in entries" v-bind:data="entry" :key="entry.id"></entry>


  </div>
</template>

<script>
import Entry from "./Entry";
import axios from 'axios';

export default {
  components: {Entry},
  name: 'entries-list',
  data() {
    return {
      entries: [],
    }
  },

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


      let station = encodeURI(localStorage.getItem('location'));


      axios.get("http://transport.opendata.ch/v1/stationboard?station=" + station + "&limit=10")
      .then(response => {
        // JSON responses are automatically parsed.
        let stationboard = response.data.stationboard;

        if (stationboard.length === 0) {
          console.error("Location \"" + station + "\" is invalid! Exit!");
        }



        this.entries = [];

        for (let i = 0; i < stationboard.length; i++) {
          let current = {
            id: stationboard[i].name.replace(" ", "_"),
            title: stationboard[i].to,
            lineNumber: stationboard[i].number,
            departure : {
              time: stationboard[i].stop.departureTimestamp,
              platform: stationboard[i].stop.platform
            },
            type: stationboard[i].name,
            delay: stationboard[i].stop.delay
          };

          console.log(current.delay);

          this.entries.push(current);
        }

      })
      .catch(e => {
        console.log(e);
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
    height: 92vh;
    overflow: hidden;
  }


</style>
