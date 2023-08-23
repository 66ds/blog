<template>
  <div class="index">
    <div class="left">
      <search
        @searchListToParentOne="searchChildListOne(arguments)"
        @searchListToParentTwo="searchChildListTwo(arguments)"
        ref="search"
      />
      <div
        class="msg-message"
        v-if="
          !info.loading && info.searchSaveVos !== undefined && info.searchSaveVos.length == 0
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
          <a
            href="javascript:void(0)"
            @click="articleDetail(item.articleId)"
            v-html="
              item.isTitleHigh == 0 ? item.articleTitle : item.articleTitleNew
            "
          ></a>
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
        <!-- eslint-disable vue/no-v-html -->
        <div>
          <el-tag
            v-for="(labelName, i) in item.labelsEntities.split(',')"
            :key="labelName"
            :type="labelRemark(i)"
            v-html="labelName"
          >
          </el-tag>
        </div>
        <!--eslint-enable-->
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
    <div class="right">
      <el-card class="right-box-card animated fadeIn">
        <!-- <Loading v-if="Object.keys(userCardData).length == 0"/> -->
        <div slot="header" class="clearfix">
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
      <el-card class="right-box-card animated fadeIn">
        <div slot="header" class="clearfix">
          <i class="el-icon-paperclip" style="color: #437dff"></i>&nbsp;<span
            >标签云</span
          >
        </div>
        <div style="font-size: 20px">
          <tag-cloud></tag-cloud>
        </div>
      </el-card>
      <el-card class="right-box-card animated fadeIn">
        <div slot="header" class="clearfix">
          <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span
            >最热文章</span
          >
        </div>
        <div class="item">
          <loading v-if="newTableHotData.length == 0"></loading>
          <el-link
            v-else
            :underline="false"
            @click="articleDetail(item.articleId)"
            v-for="(item, key) in newTableHotData"
            :key="key"
            ><i>{{ parseInt(key) + 1 }}</i
            >{{ item.articleIntroduce }}</el-link
          >
        </div>
      </el-card>
      <el-card class="right-box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: green"></i>&nbsp;<span
            >文章归档</span
          >
        </div>

        <div class="item circle">
          <loading v-if="newTableTimeData.length == 0"></loading>
          <el-link
            :underline="false"
            v-for="(item, key) in newTableTimeData"
            :key="key"
            >{{ item }}</el-link
          >
        </div>
      </el-card>
      <el-card class="right-box-card animated fadeIn">
        <div slot="header" class="clearfix">
          <i class="el-icon-star-on" style="color: red"></i>&nbsp;<span
            >最新文章</span
          >
        </div>
        <div class="item">
          <loading v-if="newTableNewData.length == 0" />
          <el-link
            v-else
            :underline="false"
            @click="articleDetail(item.articleId)"
            v-for="(item, key) in newTableNewData"
            :key="key"
            ><i>{{ parseInt(key) + 1 }}</i
            >{{ item.articleIntroduce }}</el-link
          >
        </div>
      </el-card>
      <el-card class="right-box-card animated fadeIn">
        <div slot="header" class="clearfix">
          <i class="el-icon-link" style="color: red"></i>&nbsp;<span>友链</span>
        </div>
        <div class="item circle">
          <!-- <el-link
            :underline="false"
            v-for="(item, key) in linkData"
            @click="window.open(item.linkUrl)"
            :key="key"
            ><i>{{ key + 1 }}</i
            >{{ item.linkName }}</el-link
          > -->
          <loading />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import TagCloud from "components/common/TagCloud";
import Loading from "components/common/loading/Loading";
import { articlesTimeListApi } from "api/articles";
import { selectFriendLinkListApi } from "api/link";
import mixin from "mixins";
export default {
  data() {
    return {
      newTableTimeData: [],
      linkData: [],
    };
  },
  computed: {},
  mixins: [mixin],
  methods: {
    //查询10条的文章归档时间
    async articlesTimeList() {
      try {
        const res = await articlesTimeListApi();
        if (res == undefined) return;
        this.newTableTimeData = res.data.slice(0, 10);
      } catch (e) {
        this.$message.error(e);
      }
    },
    //查询所有友链信息
    async selectFriendLink() {
      try {
        const res = await selectFriendLinkListApi();
        if (res == undefined) return;
        this.linkData = res.data;
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
  components: {
    TagCloud,
    Loading,
  },
  created() {
    this.articlesTimeList();
    this.selectFriendLink();
  },
};
</script>

<style>
.index {
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.index .right {
  width: 40%;
}

.index .left {
  width: 58%;
}

.item {
  font-size: 15px;
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.right-box-card {
  width: 100%;
  margin-bottom: 20px;
}

.left-box-card {
  width: 100%;
  margin-bottom: 20px;
}

.left-box-card > div > div {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.left-box-card > div > div a {
  padding: 5px;
}

.left-box-card > div > div:nth-child(1) {
  font-size: 18px;
}

.left-box-card > div > div:nth-child(3) {
  margin-left: 5px;
  line-height: 35px;
  letter-spacing: 1px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.left-box-card > div > div:nth-child(4) > span {
  margin-left: 5px;
}

.el-card {
  background-color: unset;
}

.el-card .item .count {
  color: #4a4d52;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}

.el-card .item .text-align {
  text-align: center;
  flex: 1;
}

.el-card .item dd {
  color: #999aaa;
  font-size: 14px;
  line-height: 22px;
  padding: 3px 0;
}

.el-card .item .el-link {
  display: block;
  line-height: 2.5;
}

.el-card i {
  font-size: 14px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

.el-card .item .el-link .el-link--inner {
  clear: both;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.el-card .circle .el-link {
  display: inline-block;
  width: 50%;
  line-height: 2;
}

.el-pagination {
  position: relative;
  z-index: 9999;
}

.index .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 1000px) and (min-width: 0px) {
  .right {
    display: none;
  }

  .index {
    width: 90%;
  }

  .index .left {
    width: 100%;
    /*padding: 0 20px;*/
  }
}
</style>
