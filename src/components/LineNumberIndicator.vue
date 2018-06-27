<template>
  <div class="square">
    <div class="line-number">
      <p>{{lineNumber}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'line-number-indicator',
    props: ['lineNumber'],
    data () {
      return {}
    },
    mounted() {
      const el = this.$el;
      el.style.width = el.clientHeight + 'px';

      window.addEventListener('resize', function() {
        el.style.width = el.clientHeight + 'px';
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .square {
    height: 100%;
  }


  .line-number {
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .line-number > p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10vh;
    margin-bottom: 0;
  }
</style>
