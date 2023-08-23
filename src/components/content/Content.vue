<template>
  <div class="article">
    <Loading v-if="articleInfo == ''"></Loading>
    <div v-else>
      <el-card class="article-box-card animated fadeIn">
        <h2 class="title">{{ articleInfo.articleTitle }}</h2>
        <div style="text-align: center">
          <el-link icon="el-icon-user"
            >作者:{{ articleInfo.userNickname }}</el-link
          >&nbsp;|&nbsp;
          <el-link icon="el-icon-time"
            >发表于:{{ articleInfo.articleDate }}</el-link
          >&nbsp;|&nbsp;
          <el-link icon="el-icon-s-unfold"
            >分类:{{ articleInfo.sortName }}</el-link
          >&nbsp;|&nbsp;
          <el-link icon="el-icon-view"
            >阅读量:{{ articleInfo.articleViews }}</el-link
          >&nbsp;|&nbsp;
          <el-link icon="el-icon-chat-line-round"
            >评论数:{{ totalCount }}</el-link
          >
        </div>
        <div
          class="content markdown-body"
          v-html="articleInfo.articleContent"
        ></div>
        <div class="reward-container">
          <button
            type="button"
            class="el-button el-button--primary"
            @click="isShow = !isShow"
          >
            <span>打赏</span>
          </button>
          <div class="much animated bounceIn" v-if="isShow">
            <div style="display: inline-block">
              <img src="../../assets/much/weixin.png" alt="Mr.Qian 微信支付" />
              <p>微信支付</p>
            </div>
            <div style="display: inline-block">
              <img src="../../assets/much/zhifubao.png" alt="Mr.Qian 支付宝" />
              <p>支付宝</p>
            </div>
          </div>
        </div>
        <div class="introduce">
          <ul class="post-copyright">
            <li data-v-f5ca42f6="" class="post-copyright-author">
              <strong data-v-f5ca42f6="">本文作者： </strong
              >{{ articleInfo.userNickname }}
            </li>
            <li data-v-f5ca42f6="" class="post-copyright-link">
              <strong data-v-f5ca42f6="">本文链接：</strong>
              <a
                data-v-f5ca42f6=""
                :href="location"
                title="客户端连接MySQL8提示 caching-sha2-password 问题"
                >{{ location }}</a
              >
            </li>
            <li data-v-f5ca42f6="" class="post-copyright-license">
              <strong data-v-f5ca42f6="">版权声明： </strong
              >本博客所有文章除特别声明外，均采用
              <a
                data-v-f5ca42f6=""
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                rel="noopener"
                target="_blank"
                ><i
                  data-v-f5ca42f6=""
                  class="iconfont icon-creative-commons"
                ></i>
                BY-NC-SA</a
              >
              许可协议。转载请注明出处！
            </li>
          </ul>
        </div>
        <div class="thank">
          <div class="article-end">
            -------------本文结束感谢您的阅读.亲,举手之劳,点个赞呗<i
              :class="likeClass"
              @click="like"
            ></i
            >-------------
          </div>
        </div>
      </el-card>
      <el-card class="article-box-card animated fadeIn">
        <div class="tips">
          <p>
            <i class="el-icon-info" style="color: red; font-size: 14px"></i>
            评论说明:
          </p>
          <p data-v-0eafe26a="">务必填写有效的内容o，否则不会收到回复信息的~</p>
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
        <div v-else class="commnet-total">
          <span>共{{ totalCount }}条评论</span
          ><span v-if="totalCount == 0">,快来成为第一个评论的吧~</span>
        </div>
        <div class="comment">
          <ul
            style="list-style: none"
            v-for="(item, i) in commentsInfo"
            :key="i"
          >
            <li class="who">
              <span
                class="user"
                @click="$router.push('/person-blog/' + item.usersEntity.userId)"
              >
                <el-avatar
                  :size="30"
                  :src="item.usersEntity.userProfilePhoto"
                  style="float: left; margin-right: 10px"
                ></el-avatar
                >{{ item.usersEntity.userNickname }}</span
              >
              <span class="sys">{{ item.commentSys }}</span>
              <span class="exe">{{ item.commentChrome }}</span>
              <span class="time">{{ item.commentDate }}</span>
              <span
                @click="(isActive = item.commentId), (commentDesc = '')"
                :class="{
                  commentActive: isActive == item.commentId,
                  reply: true,
                }"
                >回复</span
              >
              <span
                @click="isActive = ''"
                :class="{
                  commentActive: isActive != item.commentId,
                  reply: true,
                }"
                >取消回复</span
              >
              <span
                @click="reply(item.commentId)"
                :class="{
                  commentActive: isActive != item.commentId,
                  reply: true,
                }"
                >发表评论</span
              >
              <span class="dig"
                ><i
                  :class="
                    commentsList.includes(item.commentId)
                      ? 'el-icon-star-on'
                      : 'el-icon-star-off'
                  "
                  @click="dig(item.commentId, item)"
                  style="cursor: pointer"
                ></i
                >&nbsp;{{ item.commentLikeCount }}</span
              >
            </li>
            <li
              :class="{ commentActive: isActive != item.commentId }"
              class="animated rubberBand"
            >
              <el-input
                type="textarea"
                v-model="commentDesc"
                maxlength="100"
                show-word-limit
                :autosize="{ minRows: 2, maxRows: 5 }"
              ></el-input>
            </li>
            <li class="write">
              {{ item.commentContent }}
            </li>
            <div
              v-for="(comments, j) in commentsInfo[i].children"
              :key="j"
              style="border-bottom: 1px solid #ececec"
            >
              <li class="who" style="padding-left: 40px">
                <span
                  class="user"
                  @click="
                    $router.push('/person-blog/' + comments.usersEntity.userId)
                  "
                  ><el-avatar
                    :size="30"
                    :src="comments.usersEntity.userProfilePhoto"
                    style="float: left; margin-right: 10px"
                  ></el-avatar
                  >{{ comments.usersEntity.userNickname }}&nbsp;回复:{{
                    comments.parentCommentId == commentsInfo[i].commentId &&
                    commentsInfo[i].parentCommentId == 0
                      ? ""
                      : comments.parentUsersEntity.userNickname
                  }}</span
                >
                <span class="sys">{{ comments.commentSys }}</span>
                <span class="exe">{{ comments.commentChrome }}</span>
                <span class="time">{{ comments.commentDate }}</span>
                <span
                  @click="(isActive = comments.commentId), (commentDesc = '')"
                  :class="{
                    commentActive: isActive == comments.commentId,
                    reply: true,
                  }"
                  >回复</span
                >
                <span
                  @click="isActive = ''"
                  :class="{
                    commentActive: isActive != comments.commentId,
                    reply: true,
                  }"
                  >取消回复</span
                >
                <span
                  @click="reply(comments.commentId)"
                  :class="{
                    commentActive: isActive != comments.commentId,
                    reply: true,
                  }"
                  >发表评论</span
                >
                <span class="dig"
                  ><i
                    @click="dig(comments.commentId, comments)"
                    :class="
                      commentsList.includes(comments.commentId)
                        ? 'el-icon-star-on'
                        : 'el-icon-star-off'
                    "
                    style="cursor: pointer"
                  ></i
                  >&nbsp;{{ comments.commentLikeCount }}</span
                >
              </li>
              <li
                :class="{ commentActive: isActive != comments.commentId }"
                class="animated rubberBand"
              >
                <el-input
                  type="textarea"
                  v-model="commentDesc"
                  maxlength="100"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 5 }"
                ></el-input>
              </li>
              <li class="write" style="padding-left: 40px">
                {{ comments.commentContent }}
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { articlesInfoApi } from "api/articles";
import { selectArticleListLikeApi, likeArticleApi } from "api/likeArticle";
import { selectCommentListLikeApi, likeCommentApi } from "api/likeComment";
import { addCommentApi, selectCommentListApi } from "api/comments";
import { mapState } from "vuex";
import Loading from "components/common/loading/Loading";
export default {
  data() {
    return {
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
      query: {
        page: 1,
        limit: 10,
      },
      commentDesc: "",
      pageTotal: 0,
      totalCount: 0,
      isShow: false,
      loading: true,
      articleInfo: "",
      commentsInfo: "",
      commentsList: "",
      isActive: "",
      location: document.location,
      likeClass: "el-icon-star-off",
      likeCommentClass: "el-icon-star-off",
      articleId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加评论
          this.addComment(this.ruleForm.desc, this.articleId, 0);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //公共模块 添加评论并重新刷新评论
    async addComment(content, articleId, parentCommentId) {
      try {
        const res = await addCommentApi(content, articleId, parentCommentId);
        if (res == undefined) return;
        this.$message.success("评论成功");
        //删除上面textarea内容
        this.ruleForm.desc = "";
        //重新文章下的所有评论
        this.$set(this.query, "page", 1);
        this.selectCommentList(this.articleId, this.query);
        //消除当前下面textarea的内容
        this.isActive = "";
      } catch (e) {
        this.$message.error(e);
      }
    },
    //点赞文章
    async likeArticle(articleId) {
      try {
        const res = await likeArticleApi(articleId);
        if (res == undefined) return;
        if (res.data == null) {
          this.likeClass = "el-icon-star-off";
          this.$message.success("取消成功");
        } else {
          this.likeClass = "el-icon-star-on";
          this.$message.success("点赞成功");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    //点赞评论
    async likeComment(commentId, comment) {
      try {
        const res = await likeCommentApi(commentId);
        if (res == undefined) return;
        if (res.data == null) {
          this.$set(comment, "commentLikeCount", comment.commentLikeCount - 1);
          this.$message.success("取消成功");
        } else {
          this.$set(comment, "commentLikeCount", comment.commentLikeCount + 1);
          this.$message.success("点赞成功");
        }
        //已登录,则判断该用户有么有有没有点赞评论
        this.selectCommentListLike(this.articleId);
      } catch (e) {
        this.$message.error(e);
      }
    },
    //点赞文章
    like() {
      //未登录
      this.likeArticle(this.$route.params.id);
    },
    //点赞评论
    dig(commentId, comment) {
      //未登录
      this.likeComment(commentId, comment);
    },
    async articlesInfo(id) {
      try {
        const res = await articlesInfoApi(id);
        if (res == undefined) return;
        this.articleInfo = res.data;
        //已登录,则判断该用户有么有点赞文章
        if (this.token != "") {
          this.selectArticleListLike(this.articleId);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async selectArticleListLike(id) {
      try {
        const res = await selectArticleListLikeApi(id);
        if (res == undefined) return;
        //已点赞
        if (res.data != null) {
          this.likeClass = "el-icon-star-on";
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    async selectCommentListLike(articleId) {
      try {
        const res = await selectCommentListLikeApi(articleId);
        if (res == undefined) return;
        this.commentsList = res.data;
      } catch (e) {
        this.$message.error(e);
      }
    },
    async selectCommentList(articleId, query) {
      try {
        this.loading = true;
        const res = await selectCommentListApi(articleId, query);
        if (res == undefined) return;
        //遍历数据展示在评论列表上
        this.commentsInfo.splice(0);
        res.data.list.forEach((item) => {
          let arr = new Array();
          item.children = this.getChildren(item.children, arr);
          this.commentsInfo.push(item);
        });
        this.loading = false;
        this.totalCount = res.data.totalCount || 0;
        //分页数
        this.pageTotal = res.data.totalCount || 0;
        //是否登录 获取评论的所有赞
        if (this.token != "") {
          this.selectCommentListLike(this.articleId);
        }
      } catch (e) {
        this.loading = false;
        this.$message.error(e);
      }
    },
    getChildren(item, arr) {
      if (item.length != 0) {
        item.forEach((res) => {
          arr.push(res);
          this.getChildren(res.children, arr);
        });
      }
      return arr;
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "page", val);
      this.selectCommentList(this.articleId, this.query);
    },
    //回复评论(添加评论)
    reply(parentId) {
      if (this.commentDesc == "") {
        return this.$message.warning("请填写内容");
      } else {
        //添加评论
        this.addComment(this.commentDesc, this.articleId, parentId);
      }
    },
  },
  mounted() {
    //获取文章信息
    this.articlesInfo(this.articleId);
    //获取文章下的所有评论
    this.selectCommentList(this.articleId, this.query);
  },
  components: {
    Loading,
  },
};
</script>

<style>
.article {
  width: 70%;
}

.article .title {
  font-size: 20px;
  text-align: center;
  padding-bottom: 20px;
}

.article .el-link i {
  font-size: 14px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

.article .content {
  padding-top: 20px;
}

.article-box-card {
  width: 100%;
  margin-bottom: 20px;
  background-color: unset;
}

.article-box-card:hover {
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
}

.article .prev-next {
  padding: 20px 0;
  line-height: 2;
  font-size: 16px;
}

.article .prev-next span {
  margin-right: 10px;
}

.article .reward-container {
  padding: 10px 0;
  margin: 20px auto;
  width: 90%;
  text-align: center;
}

.article .reward-container .much {
  padding-top: 20px;
}

.article .reward-container .much > div:hover {
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
}

.article .reward-container img {
  width: 180px;
  height: 186px;
}

.article .introduce {
  margin: 2em 0 0;
  padding: 0.5em 1em;
  border-left: 3px solid #ff1700;
  background-color: #f9f9f9;
  line-height: 2;
}

.article .introduce .post-copyright {
  list-style: none;
}

.article .thank .article-end {
  text-align: center;
  color: #ccc;
  font-size: 16px;
  padding: 20px 0;
}

.article .thank .article-end i {
  cursor: pointer;
}

.article .tags > span {
  margin-right: 10px;
}

.article .tips {
  line-height: 2;
  padding: 10px 0 20px;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px;
}

.article .comment ul {
  padding-left: 70px;
}

.article .comment .who {
  margin-top: 5px;
  line-height: 30px;
  display: flex;
  align-items: center;
}

.article .comment .who .page {
  margin-right: 10px;
}

.article .comment .who .user {
  color: #1abc9c;
  margin-right: 10px;
  cursor: pointer;
}

.article .comment .who .reply {
  color: #5893c2;
  margin-right: 10px;
  cursor: pointer;
}

.article .comment .who .sys,
.exe,
.time,
.reply {
  text-align: center;
  font-size: 12px;
  padding: 0 10px;
  margin-right: 10px;
}

.article .comment .who .dig {
  flex: 1;
  text-align: right;
  color: #999;
  font-size: 12px;
}

.article .comment .commentActive {
  display: none;
}

.article .comment .write {
  padding: 10px 0;
  line-height: 18px;
  letter-spacing: 1px;
  word-wrap: break-word;
  word-break: normal;
}

.article .el-form-item__content {
  line-height: 0px !important;
}

.article .commnet-total {
  color: #303133;
  line-height: 36px;
  margin-left: 70px;
}

.article .ul,
.el-pager {
  padding-left: 0px !important;
}

.article .el-card i {
  font-size: 13px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

@media screen and (max-width: 1000px) and (min-width: 0px) {
  .article {
    width: 100%;
    padding: 0 20px;
  }

  .article .commnet-total {
    margin-left: 0px;
  }

  .article .comment ul {
    padding-left: 0px;
  }

  .article .el-form-item__label {
    text-align: left;
  }
}
</style>
