<template>
  <div class="wrap" v-show="show">
    <div ref="box" class="box">
      <i class="el-icon-bell"></i>&nbsp;
      <span ref="copy" class="copy"></span>
    </div>
    <div ref="node" class="node">{{ msg }}</div>
    <i style="float: right" @click="removeNotice()" class="el-icon-close"></i>
  </div>
</template>
<script>
export default {
  name: "Marquee",
  props: ["msg"], // 父组件传入数据， 数组形式 [ "连雨不知春去","一晴方觉夏深"]
  data() {
    return {
      timer: null,
      show: true,
    };
  },
  methods: {
    move() {
      // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = this.$refs.node.getBoundingClientRect().width;
      this.$refs.copy.innerText = this.msg; // 文字副本填充
      let distance = 0; // 位移距离
      // 设置位移
      this.timer = setInterval(() => {
        distance = distance - 1;
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 13;
        }
        this.$nextTick(() => {
          if (this.$refs.box) {
            this.$refs.box.style.transform = "translateX(" + distance + "px)";
          }
        });
      }, 50);
    },
    removeNotice() {
      //隐藏通知
      this.show = false;
      //清除定时器
      clearInterval(this.timer);
    },
  },
  mounted: function () {
    this.move();
  },
};
</script>
<style scoped>
.wrap {
  overflow: hidden;
  color: gray;
}

.box {
  float: left;
}

.node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>
