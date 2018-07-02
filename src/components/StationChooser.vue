<template>
  <div class="station-chooser">
    <div class="row h-100">
      <div class="col-sm-6 offset-3 my-auto">
        <h1 class="text-center" style="font-size: 6em">DepartureBoard</h1>
        <autocomplete
          url="https://transport.opendata.ch/v1/locations"
          param="query"
          anchor="name"
          placeholder="Type the name of the station"
          :on-select="getData"
          :process="process"
          :onShouldRenderChild="renderChild"
          className="inputField"/>
        <h6 class="text-center" style="padding-top: 20px;"><font-awesome-icon icon="exclamation-triangle"/>  Only Swiss stations are supported  <font-awesome-icon icon="exclamation-triangle"/></h6>
        <div style="height: 15vh"></div>
      </div>
    </div>
    <div class="myFooter">
      <div class="row">
        <div class="col-md-12">
          <div style="width: 100%" class="text-center">
            <a style="font-size: 2em; color: white;" href="https://github.com/pennal/DepartureBoard"><font-awesome-icon icon="code"/></a>
          </div>
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

  .myFooter {
    position: absolute;
    bottom: 0;
    width: 100%;

  }
</style>
