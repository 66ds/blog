<template>
  <div class="m-spin-dot">
    <span class="u-dot-item"></span>
    <span class="u-dot-item"></span>
    <span class="u-dot-item"></span>
    <span class="u-dot-item"></span>
  </div>
</template>
<script>
export default {
  name: 'Loading'
}
</script>
<style lang="less" scoped>
.el-container.is-vertical {
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
}

/**设置loading */
.m-spin-dot {
  // 水平垂直居中
  position: relative;
  top: calc(50% - 18px);
  margin: 0 auto;
  width: 25px;
  height: 25px;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg); /* Internet Explorer */
  -moz-transform: rotate(45deg); /* Firefox */
  -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
  -o-transform: rotate(45deg); /* Opera */
  animation: rotate 1.5s linear infinite;
  -webkit-animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    100% {transform: rotate(405deg);}
  }
  .u-dot-item { // 单个圆点样式
    position: absolute;
    width: 10px;
    height: 10px;
    background: #00a7d0;
    border-radius: 50%;
    opacity: .3;
    animation: spinMove 1s linear infinite alternate;
    -webkit-animation: spinMove 1s linear infinite alternate;
    @keyframes spinMove {
      100% {opacity: 1;}
    }
  }
  .u-dot-item:first-child {
    top: 0;
    left: 0;
  }
  .u-dot-item:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: .4s;
    -webkit-animation-delay: .4s;
  }
  .u-dot-item:nth-child(3) {
    bottom: 0;
    right: 0;
    animation-delay: .8s;
    -webkit-animation-delay: .8s;
  }
  .u-dot-item:last-child {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
    -webkit-animation-delay: 1.2s;
  }
}
</style>