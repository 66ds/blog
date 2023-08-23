<template>
  <div class="footer">
    <el-footer>
      <div>© 2017 – 2020 粤ICP备18005467号</div>
      <div>本站已安全运行 {{ netInfo.daysRunning }} 天</div>
      <div>
        <i class="el-icon-user-solid"></i>&nbsp;{{ netInfo.userCounts }}人 |
        <i class="el-icon-view"></i>&nbsp;{{ netInfo.rip }}次
      </div>
    </el-footer>
  </div>
</template>

<script>
import { getNetInfo } from "api/footer";
import { constants } from "@/constants";
export default {
  data() {
    return {
      netInfo: "",
    };
  },
  created() {
    this.getNetInformation();
  },
  methods: {
    async getNetInformation() {
      try {
        const response = await fetch(constants.ipUrl);
        const { ip } = await response.json();
        const res = await getNetInfo(ip);
        this.netInfo = res.data;
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style>
.el-footer {
  border-top: 1px solid #ccc;
  color: #333;
  text-align: center;
  line-height: 25px;
  letter-spacing: 1px;
  height: 80px !important;
}
</style>
