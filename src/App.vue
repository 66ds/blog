<template>
  <div>
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
      :moveSpeed="5"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <el-container class="is-vertical">
      <pc-header v-if="isShow" />
      <phone-header v-if="!isShow" />
      <index-main>
        <router-view></router-view>
      </index-main>
      <index-footer />
    </el-container>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import IndexHeader from "@/components/header/Header";
import IndexMain from "@/components/main/Main";
import IndexFooter from "@/components/footer/Footer";
import PcHeader from "@/components/header/pc/Pc";
import PhoneHeader from "@/components/header/phone/Phone";
import BackToTop from "../node_modules/element-ui/packages/backtop/index";
export default {
  name: "App",
  data() {
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        lineHeight: "45px", // 请保持与高度一致以垂直居中
        background: "#e7eaf1", // 按钮的背景颜色
      },
      isShow: true,
    };
  },
  components: {
    IndexHeader,
    IndexMain,
    IndexFooter,
    PcHeader,
    PhoneHeader,
    BackToTop,
  },
  created() {},
  methods: {
    computeWidth() {
      window.innerWidth <= 1000 ? (this.isShow = false) : (this.isShow = true);
    }
  },
  mounted() {
    this.computeWidth();
    window.onresize = () => {
      this.computeWidth();
    };
  },
};
</script>


<style lang="less">

@import 'assets/styles/reset.css';

@import 'assets/styles/border.css';



#particles-js {
  width: 100%;
  height: calc(100%);
  position: fixed;
  z-index: -1;
}



</style>
