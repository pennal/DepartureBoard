<template>
  <div class="status-bar">
    <div class="row">
      <div class="col-md-12 text-center">
        <p style="">From {{$store.state.location}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'status-bar',
    methods: {

      changeStation(event) {
        localStorage.removeItem("location");
        this.$store.commit('setLocation', null);
        this.$store.commit('setEntries', null);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .status-bar {
    z-index: 10000;
  }

  .status-bar > * {
    height: 4vh;
    background-color: black;
    color: white;
    font-size: 2.7vh;
  }

  p {
    margin-bottom: 0;
  }


</style>
