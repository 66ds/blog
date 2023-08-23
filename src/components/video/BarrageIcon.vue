<template>
  <img :src="iconSrc"/>
</template>
<script>
import Icons from "plugins/video.js"
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
  computed:{
    iconSrc(){
      return Icons[`${this.icon}`];
    }
  }
};
</script>