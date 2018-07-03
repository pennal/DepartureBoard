<template>
  <div class="circle">
    <div class="time-left">
      <p style=""><span v-if="this.formatTime().length % 2 !== 1" style="visibility: hidden">'</span>{{formatTime(timeLeft)}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'time-left-indicator',
    props: ['timeLeft'],
    mounted() {
      const el = this.$el;
      el.style.width = el.clientHeight + 'px';

      window.addEventListener('resize', function() {
        el.style.width = el.clientHeight + 'px';

      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', function() {
        el.style.width = el.clientHeight + 'px';
      });
    },
    methods: {
      formatTime() {
        if (this.timeLeft >= 60) {
          return Math.floor(this.timeLeft / 60) + 'h+';
        }
        return this.timeLeft + "'";
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .circle {
    height: 100%;
    border-radius: 50%;
    background-color: green;
  }


  .time-left {
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .time-left > p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10vh;
    margin-bottom: 0;
  }

  .green {
    background-color: #46BF00;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }

  .yellow {
    background-color: #FFBE00;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }

  .red {
    background-color: #CC0605;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
</style>
