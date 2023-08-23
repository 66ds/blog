<template>
  <div class="person-blog">
    <div class="left">
      <search @searchListToParentOne="searchChildListOne(arguments)" @searchListToParentTwo="searchChildListTwo(arguments)"  ref="search" />
      <div
        class="msg-message"
        v-if="
          info.searchSaveVos !== undefined && info.searchSaveVos.length == 0
        "
      >
        <!-- <p>空空如也</p> -->
        <img src="~assets/empty/empty.png" />
      </div>
      <el-card
        class="left-box-card animated fadeIn"
        v-for="item in info.searchSaveVos"
        :key="item.articleId"
      >
        <div>
          <a href="javascript:void(0)" @click="articleDetail(item.articleId)">{{
            item.articleTitle
          }}</a>
        </div>
        <div>
          <el-link icon="el-icon-user">
            <div
              v-html="
                '作者:' +
                (item.isNameHigh == 0
                  ? item.userNickname
                  : item.userNicknameNew)
              "
            ></div>
          </el-link>
          <el-link icon="el-icon-time"
            >发表于:{{ item.articleDate | convertTime }}</el-link
          >
          <el-link icon="el-icon-s-unfold">
            <div v-html="'分类:' + item.sortNameNew"></div>
          </el-link>
          <el-link icon="el-icon-view">
            <div v-html="'阅读量:' + item.articleViewsNew"></div>
          </el-link>
          <el-link icon="el-icon-chat-line-round">
            <div v-html="'评论数:' + item.articleCommentCountNew"></div
          ></el-link>
          <el-link icon="el-icon-star-on">
            <div v-html="'赞数:' + item.articleLikeCountNew"></div>
          </el-link>
        </div>
        <div
          v-html="
            item.isIntroduceHigh == 0
              ? item.articleIntroduce
              : item.articleIntroduceNew
          "
        ></div>
        <div>
          <el-tag
            v-for="(labelName, i) in item.labelsEntities.split(',')"
            :key="labelName"
            :type="labelRemark(i)"
            v-html="labelName"
          >
          </el-tag>
        </div>
      </el-card>
      <div
        class="pagination"
        v-if="info.searchSaveVos !== undefined && info.searchSaveVos.length > 0"
      >
        <el-pagination
          layout="prev, pager, next"
          :current-page="query.page"
          :page-size="query.limit"
          :total="info.pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <div class="right animated fadeIn">
      <el-card class="right-box-card">
        <div slot="header" class="clearfix" style="height: 40px">
          <el-avatar
            :size="40"
            :src="userCardData.userImg"
            style="float: left; margin-right: 10px"
          ></el-avatar
          ><span style="float: left; line-height: 40px"
            >{{ userCardData.userName }}的名片</span
          >
        </div>
        <div class="item" style="display: flex">
          <dl class="text-align">
            <dt><span class="count"></span>{{ userCardData.userName }}</dt>
            <dd>昵称</dd>
          </dl>
          <dl class="text-align">
            <dt>
              <span class="count"></span>{{ userCardData.allArticlesNumber }}
            </dt>
            <dd>文章</dd>
          </dl>
          <dl class="text-align">
            <dt>
              <span class="count"></span
              >{{ userCardData.allArticlesLikeNumber }}
            </dt>
            <dd>赞数</dd>
          </dl>
          <dl class="text-align">
            <dt>
              <span class="count"></span
              >{{ userCardData.allArticleViewsNumber }}
            </dt>
            <dd>访问</dd>
          </dl>
          <dl class="text-align">
            <dt>
              <span class="count"></span
              >{{ userCardData.allArticlesCommentsNumber }}
            </dt>
            <dd>评论</dd>
          </dl>
        </div>
        <div class="item">
          <el-button type="info" @click="sendLetterToOther">私信</el-button>
          <el-button type="danger" @click="followOther" v-if="isFollow"
            >关注</el-button
          >
          <el-button @click="followOther" v-else>已关注</el-button>
        </div>
      </el-card>
      <el-card class="right-box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span
            >最热文章</span
          >
        </div>
        <div class="item">
          <el-link
            :underline="false"
            @click="articleDetail(item.articleId)"
            v-for="(item, key) in newTableHotData"
            :key="key"
            ><i>{{ key + 1 }}</i
            >{{ item.articleIntroduce }}</el-link
          >
        </div>
      </el-card>
      <el-card class="right-box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span
            >最新文章</span
          >
        </div>
        <div class="item">
          <el-link
            :underline="false"
            v-for="(item, key) in info.newTableData"
            :key="key"
            ><i>{{ key + 1 }}</i
            >{{ item.articleIntroduce }}</el-link
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import mixin from "mixins";
export default {
  data() {
    return {
      newTableHotData: [],
      userCardData: {},
    };
  },
  mixins: [mixin],
  methods: {},
  created() {},
};
</script>

<style>
.person-blog {
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.person-blog .right {
  width: 40%;
}

.person-blog .left {
  width: 58%;
}

.person-blog .item {
  font-size: 15px;
  margin-bottom: 18px;
}

.person-blog .clearfix:before,
.person-blog .clearfix:after {
  display: table;
  content: "";
}

.person-blog .clearfix:after {
  clear: both;
}

.person-blog .right-box-card {
  width: 100%;
  margin-bottom: 20px;
}

.person-blog .left-box-card {
  width: 100%;
  margin-bottom: 20px;
}

.person-blog .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

.person-blog .left-box-card > div > div {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.person-blog .left-box-card > div > div a {
  padding: 5px;
}

.person-blog .left-box-card > div > div:nth-child(1) {
  font-size: 18px;
}

.person-blog .left-box-card > div > div:nth-child(3) {
  line-height: 35px;
  letter-spacing: 1px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}


.person-blog .left-box-card > div > div:nth-child(4) > span {
  margin-right: 10px;
}

.person-blog .el-card {
  background-color: unset;
}

.person-blog .el-card .item .count {
  color: #4a4d52;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}

.person-blog .el-card .item dd {
  color: #999aaa;
  font-size: 14px;
  line-height: 22px;
  padding: 3px 0;
}

.person-blog .el-card .item .text-align {
  text-align: center;
  flex: 1;
}

.person-blog .el-card .item .el-link {
  display: block;
  line-height: 2.5;
}

.person-blog .el-card i {
  font-size: 14px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

.el-pagination {
  position: relative;
  z-index: 9999;
}

.person-blog .el-card .item .el-link .el-link--inner {
  clear: both;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

@media screen and (max-width: 1000px) and (min-width: 0px) {
  .person-blog .right {
    display: none;
  }

  .person-blog {
    width: 90%;
  }

  .person-blog .left {
    width: 100%;
    /*padding: 0 20px;*/
  }
}
</style>
