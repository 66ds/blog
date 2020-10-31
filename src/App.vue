<template>
  <div id="app">
    <vue-particles
            id="particles-js"
            color="#78F6F3"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#78F6F3"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
    >
    </vue-particles>
    <index></index>
  </div>
</template>

<script>
import Index from './views/modules/index/index.vue'

export default {
  name: 'App',
  components: {
     Index
  },
  created() {
  }
}
</script>

<style>
#particles-js{
  width: 100%;
  height: calc(100%);
  position: fixed;
  z-index: -999;
}
</style>
