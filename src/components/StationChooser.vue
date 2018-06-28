<template>
  <div class="station-chooser">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="align-self-center">
        <h1 class="text-center">Type the station name:</h1>
        <autocomplete
          url="http://transport.opendata.ch/v1/locations"
          param="query"
          anchor="name"
          :on-select="getData"
          :process="process"
          :onShouldRenderChild="renderChild"
        className="inputField">
        </autocomplete>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Autocomplete from 'vue2-autocomplete-js'

  export default {
    name: 'station-chooser',
    components: {Autocomplete},
    methods: {
      getData(obj){
        const stationName = obj.name;

        localStorage.setItem('location', stationName);
        this.$store.commit('setLocation', stationName);


      },
      process(data) {
        return JSON.parse(JSON.stringify(data["stations"]));
      },
      renderChild(data) {
        return `<span>${data.name}</span>`
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .station-chooser {
    height: 100vh;
  }

  .inputField-input {
    width: 100% !important;
    height: 40px;
    font-size: 20px;
  }






</style>
