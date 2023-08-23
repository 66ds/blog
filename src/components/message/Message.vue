<template>
  <div class="message">
    <h2>留言互动</h2>
    <div class="el-row">
      <!-- <img src="https://www.myong.top/static/img/timg.94467a8.gif" alt=""> -->
    </div>
    <el-card class="message-box-card animated fadeIn">
      <div class="tips">
        <p>
          <i class="el-icon-info" style="color: red; font-size: 14px"></i>
          留言说明:
        </p>
        <p data-v-0eafe26a="">
          务必填写有效的邮箱地址，否则不会收到回复信息的~
        </p>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="内容" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 5 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <Loading v-if="loading"></Loading>
      <div v-else>
        <div class="commnet-total">
          <span>共{{ totalCount }}条评论</span
          ><span v-if="totalCount == 0">,快来成为第一个评论的吧~</span>
        </div>
        <div class="comment">
          <ul style="list-style: none" v-for="(item, i) in stayList" :key="i">
            <li class="who">
              <!--                        <span class="page">{{i+1}}.</span>-->
              <span
                class="user"
                @click="$router.push('/person-blog/' + item.stayUserId)"
                >{{ item.userName }}</span
              >
              <span class="sys">{{ item.staySys }}</span>
              <span class="exe">{{ item.stayChrome }}</span>
              <span class="time">{{ item.messageStayTime }}</span>
            </li>
            <li class="write">
              {{ item.messageContent }}
            </li>
            <div
              style="border-bottom: 1px solid #ececec"
              v-if="item.stayMessageEntity != null"
            >
              <li class="who" style="padding-left: 40px">
                <!--                        <span class="page">{{i+1}}.</span>-->
                <span
                  class="user"
                  @click="
                    $router.push(
                      '/person-blog/' + item.stayMessageEntity.stayUserId
                    )
                  "
                  >{{ item.stayMessageEntity.userName }}</span
                >
                <span class="sys">{{ item.stayMessageEntity.staySys }}</span>
                <span class="exe">{{ item.stayMessageEntity.stayChrome }}</span>
                <span class="time">{{
                  item.stayMessageEntity.messageStayTime
                }}</span>
              </li>
              <li class="write" style="padding-left: 40px">
                {{ item.stayMessageEntity.messageContent }}
              </li>
            </div>
          </ul>
          <div class="pagination" style="text-align: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page="query.page"
              :page-size="query.limit"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addStayMessageApi, selectStayMessageListApi } from "api/stayMessage";
import Loading from "components/common/loading/Loading";
export default {
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
      },
      commentDesc: "",
      pageTotal: 0,
      totalCount: 0,
      stayList: [],
      loading: true,
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加留言
          this.addStayMessage(this.ruleForm.desc);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //公共模块 添加留言并重新刷新留言
    async addStayMessage(content) {
      try {
        const res = await addStayMessageApi(content, 0);
        if (res == undefined) return;
        this.$message.success(res.msg);
        //删除上面textarea内容
        this.ruleForm.desc = "";
        //重新文章下的所有评论
        this.$set(this.query, "page", 1);
        this.selectStayMessageList(this.query);
      } catch (e) {
        this.$message.error(e);
      }
    },
    //获取所有留言列表
    async selectStayMessageList(query) {
      try {
        this.loading = true;
        const res = await selectStayMessageListApi(query);
        if (res == undefined) return;
        //遍历数据展示在留言列表上
        this.stayList = res.data.list;
        this.totalCount = res.data.totalCount || 0;
        this.pageTotal = res.data.totalCount || 0;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$message.error(e);
      }
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "page", val);
      this.selectStayMessageList(this.query);
    },
  },
  components: {
    Loading,
  },
  created() {
    //获取文章下的所有评论
    this.selectStayMessageList(this.query);
  },
};
</script>

<style>
.message {
  width: 70%;
}

.message .el-row,
.message h2 {
  color: #555;
  width: 100%;
  text-align: center;
  margin: 40px 0;
  font-size: 20px;
}

.message .tips {
  line-height: 2;
  padding: 10px 0 20px;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px;
}

.message .comment ul {
  padding-left: 70px;
}

.message .comment .who {
  margin-top: 5px;
  line-height: 30px;
  display: flex;
  align-items: center;
}

.message .comment .who .page {
  margin-right: 10px;
}

.message .comment .who .user {
  color: #1abc9c;
  margin-right: 10px;
  cursor: pointer;
}

.message .comment .who .sys,
.exe,
.time {
  text-align: center;
  font-size: 12px;
  /*background-color: #ededed;*/
  padding: 0 10px;
  margin-right: 10px;
}

.message .comment .write {
  padding: 10px 0;
  line-height: 18px;
  letter-spacing: 1px;
}

.message .el-form-item__content {
  line-height: 0px !important;
}

.message .commnet-total {
  color: #303133;
  line-height: 36px;
  margin-left: 70px;
}

.message .ul,
.el-pager {
  padding-left: 0px !important;
}

.message .el-form .form-top {
  display: flex;
}

.message .el-form .form-top .el-form-item {
  flex: 1;
}

.message .el-form-item__content {
  line-height: 0px !important;
}

.message .commnet-total {
  color: #303133;
  line-height: 36px;
  margin-left: 70px;
}

@media screen and (max-width: 1000px) and (min-width: 0px) {
  .message {
    width: 100%;
    padding: 0 20px;
  }

  .message .form-top {
    flex-direction: column;
  }

  .message .commnet-total {
    margin-left: 0px;
  }

  .message .comment ul {
    padding-left: 0px;
  }

  .message .el-form-item__label {
    text-align: left;
  }

  .message img {
    width: 100%;
  }
}
</style>
