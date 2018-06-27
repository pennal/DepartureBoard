<template>
  <div class="time-keeper">
    <div class="row">
      <div class="col-md-6">
        <p style="text-align: left">{{day}}/{{month}}/{{year}}</p>
      </div>
      <div class="col-md-6">
        <p style="text-align: right">{{hours}}:{{minutes}}:{{seconds}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'time-keeper',
    data () {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        day: 0,
        month: 0,
        year: 0
      }
    },
    mounted () {
      this.updateDateTime();
      this.$options.interval = setInterval(this.updateDateTime, 1000);
    },
    beforeDestroy () {
      clearInterval(this.$options.interval);
    },
    methods: {
      updateDateTime () {
        let now = new Date();
        this.hours = this.getZeroPad(now.getHours());
        this.minutes = this.getZeroPad(now.getMinutes());
        this.seconds = this.getZeroPad(now.getSeconds());

        this.day = this.getZeroPad(now.getDate());
        this.month = this.getZeroPad(now.getMonth() + 1);
        this.year = now.getFullYear();
      },
      getZeroPad(n) {
        return (parseInt(n, 10) >= 10 ? '' : '0') + n
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time-keeper {
    z-index: 10000;
  }

  .time-keeper > * {
    height: 8vh;
    background-color: black;
    color: white;
    font-size: 5.5vh;
  }

  p {
    margin-bottom: 0;
  }


</style>
