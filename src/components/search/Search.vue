<template>
  <div>
    <el-input
      placeholder="请输入内容"
      v-model="query.keyWord"
      class="animated fadeIn"
      style="box-shadow: 0 2px 2px 0 rgb(0 0 0 / 6%); margin-bottom: 20px"
      @keyup.enter.native="$refs.btnButton.$el.click()"
      v-leftClick="this"
      maxlength="50"
      show-word-limit
    >
      <el-button
        ref="btnButton"
        slot="append"
        icon="el-icon-search"
        @click="searchList(query)"
        :loading="btnLoading"
        >{{ searchLoading }}</el-button
      >
    </el-input>
  </div>
</template>

<script>
import {
  articlesListApi,
  selectHotListApi,
  selectNewListApi,
} from "api/articles";
import { selectAttentionInfoApi } from "api/attention";
import { userCardInfoById } from "api/users";
import { mapState } from "vuex";
// import throttle from "utils/debounce";
export default {
  data() {
    return {
      info: {
        searchSaveVos: [],
        pageTotal: 0,
        loading: true,
        sortNames: [],
        archivesTimes: [],
      },
      query: {
        page: 1,
        limit: 10,
        keyWord: "",
        sortName: "",
        archivesTime: "",
        userId: this.$route.params.id,
        labelName: "",
      },
      btnLoading: false,
      searchLoading: "",
      isFollow: false,
      userCardData: [],
      newTableHotData: [],
      newTableNewData: [],
    };
  },
  computed: {
    ...mapState({ user: "user", token: "token" }),
  },
  methods: {
    //获取所有文章
    async searchList(query) {
      try {
        this.info.loading = true;
        //数据清空,页面效果更好[这里的清空没有意义,因为这里的this.info不会影响到home等页面],采用一下方法即可
        this.info.searchSaveVos = [];
        this.info.sortNames = [];
        this.info.archivesTimes = [];
        //将数据传给相应的组件[这里为什么这些？ 解决点击搜索时,页面数据不充值卡顿的效果]
        this.$emit("searchListToParentOne", this.info, query);
        this.$set(query, "labelName", this.$route.params.labelName);
        const res = await articlesListApi(query);
        let { searchSaveVos, pageTotal, sortNames, archivesTimes } = res.data;
        this.info = {
          searchSaveVos,
          pageTotal,
          sortNames,
          archivesTimes,
          loading: false,
        };
        //将数据传给相应的组件
        this.$emit("searchListToParentOne", this.info, query);
        //清空原来的标签属性
        this.$route.params.labelName = "";
        // this.$set(this.query,"labelName","")
        // this.$message.success("搜索完成");
      } catch (e) {
        this.info.loading = false;
        this.$message.error(e);
      }
    },
    //判断登陆者是不是关注了其它用户
    async selectAttentionInfo(attentionId) {
      try {
        const res = await selectAttentionInfoApi(attentionId);
        if (res && res.data !== null) {
          this.isFollow = !this.isFollow;
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    //获取某用户的名片信息
    async userCardInfo(userId) {
      try {
        const res = await userCardInfoById(userId);
        if (res == undefined) return;
        this.userCardData = res.data;
        //将数据传给相应的组件
      } catch (error) {
        this.$message.error(error);
      }
    },
    //查询10条最火文章
    async selectHotList(userId) {
      try {
        const res = await selectHotListApi(userId);
        if (res == undefined) return;
        this.newTableHotData = res.data.list;
        //将数据传给相应的组件
      } catch (e) {
        this.$message.error(e);
      }
    },
    //查询最火文章
    async selectNewlist(userId) {
      try {
        const res = await selectNewListApi(userId);
        if (res == undefined) return;
        this.newTableNewData = res.data.list;
        //将数据传给相应的组件
      } catch (error) {
        this.$message.error(error);
      }
    },
    //上面四个方法执行完之后在执行某件事
    async afterMethods() {
      const userId = this.query.userId;
      await this.searchList(this.query);
      await this.selectHotList(userId != "" ? userId : 3);
      await this.selectNewlist(userId != "" ? userId : 3);
      if (this.token) {
        await this.selectAttentionInfo(userId == undefined ? 3 : userId);
      }
      await this.userCardInfo(userId ?? 3);
      this.$emit(
        "searchListToParentTwo",
        this.isFollow,
        this.newTableHotData,
        this.userCardData,
        this.newTableNewData
      );
    },
  },
  created() {
    this.afterMethods();
  }
};
</script>

<style>
</style>