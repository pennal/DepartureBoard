<template>
  <div class="entry">
    <div class="row" style="height: 100%;">
      <line-number-indicator v-bind:lineNumber="data.lineNumber" v-bind:style="{ backgroundColor: this.getColorForLine() }"></line-number-indicator>

      <div class="row" style="height: 100%;">
        <div class="col-md-12" id="detailsContainer">
          <div class="detail" style="height: 50%">
            <p style="font-size: 9vh;">{{data.title}}</p>
          </div>

          <div class="detail" style="height: 20%">

            <p style="font-size: 3vh;">
              <font-awesome-icon icon="subway" v-if="data.category === 'T'"/>
              <font-awesome-icon icon="bus" v-if="data.category === 'BUS' || data.category === 'NFB'"/>
              <font-awesome-icon icon="train" v-if="data.category === 'S' || data.category === 'IC'"/>
              {{data.type}} <span v-if="data.departure.platform !== null">- Platform {{data.departure.platform}}</span>
            </p>
          </div>

          <div v-if="data.delay !== null"  class="detail" style="height: 30%">
            <p style="color: red; font-size: 5vh">Delay: About {{data.delay}} minutes</p>
          </div>
        </div>
      </div>

      <time-left-indicator v-bind:timeLeft="data.departure.timeLeft" v-bind:class="getColorForTimeLeft()"></time-left-indicator>

    </div>
  </div>
</template>

<script>

  import LineNumberIndicator from "./LineNumberIndicator";
  import TimeLeftIndicator from "./TimeLeftIndicator";


  export default {
    name: 'entry',
    components: {
      TimeLeftIndicator,
      LineNumberIndicator
    },
    props: ['index'],
    data() {
      return {
        data: this.$store.getters.getEntries[this.index]
      }
    },
    mounted() {
      // Setup the recurring timer
      this.setupTimer();

      // My god this is awful...
      const that = this;

      const el = that.$el;
      that.calculateMiddleSectionWidth(el);
      window.addEventListener('resize', function() {
        that.calculateMiddleSectionWidth(el);
      });
    },
    beforeDestroy () {
      clearInterval(this.$options.interval);
    },
    methods: {
      calculateMiddleSectionWidth(el) {

        let row = el.childNodes[0];

        let lineIndicator = row.childNodes[0];
        let mainContent = row.childNodes[2];
        let timeIndicator = row.childNodes[4];

        let totalWidth = el.clientWidth;
        let centerWidth = totalWidth - lineIndicator.clientWidth - timeIndicator.clientWidth - 20;

        mainContent.style.width = centerWidth + 'px';
      },
      setupTimer() {
        // We need to call a first update, otherwise the time left will show 0!
        this.calculateTimeLeft();

        // We want to set the updater to run at exactly XX:XX:00 (or 01)
        // Create a ref hour for when the first update should be made
        let zeroDate = new Date();
        zeroDate.setTime(zeroDate.getTime() + 1000 * 60);
        zeroDate.setSeconds(0);

        // Get the current time
        let currentTime = new Date();
        // Calculate the Delta (and add a bit of a breather)
        let timerDelta = (zeroDate - currentTime) + 100;

        // How nice...
        const that = this;

        setTimeout(function() {
            // Run the first update for the time
            that.calculateTimeLeft()
            // Set the recurring timer. 
            // - In theory this can be done only once every 60 seconds
            // - In practice, no idea...the time might drift
            that.$options.interval = setInterval(that.calculateTimeLeft, 60000);
        }, timerDelta);
        

      },

      calculateTimeLeft() {
        let leaveDate = new Date(this.data.departure.time * 1000);

        let now = new Date();

        let delta = leaveDate - now;

        let timeLeft = Math.floor(((delta/1000).toFixed(2)/60).toFixed(2));

        this.data.departure.timeLeft = timeLeft;

        this.$store.commit('updateEntry', this.data);
        console.debug("Entry " + this.data.id + " => " + this.data.departure.timeLeft);

        if (timeLeft <= 0) {
          console.debug("Need to remove entry " + this.data.id);
          this.$store.commit('removeEntry', this.data);
        }
      },
      getColorForLine() {
        const lineNumber = parseInt(this.data.lineNumber);

        if (lineNumber >= 31 && lineNumber <= 916) {
          return "#87c3ea"
        }

        const colors = {
          "2": "#e00a1c",
          "3": "#159c3f",
          "4": "#4a3d8e",
          "5": "#935a2b",
          "6": "#dba04c",
          "7": "#000000",
          "8": "#afc928",
          "9": "#4a3d8e",
          "10": "#e53389",
          "11": "#159c3f",
          "12": "#8dd0e3",
          "13": "#fed330",
          "14": "#1a9fe0",
          "15": "#de0a1c",
          "17": "#a11f63"
        };

        let color = colors[lineNumber];

        if (color === undefined) {
          color = "green";
        }

        return color;
      },
      getColorForTimeLeft() {
        const timeLeft = parseInt(this.data.departure.timeLeft);

        if (timeLeft <= 1) {
          return "red"
        } else if (timeLeft <= 2) {
          return "yellow"
        } else {
          return "green"
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .entry {
    height: 22vh;
    width: 100%;
    /*background-color: red;*/
    padding: 10px;
  }

  #detailsContainer > * {
    margin: 0;
  }

  .detail {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .detail > p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10vh;
    margin-bottom: 0;
  }
</style>
