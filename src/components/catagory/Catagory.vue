<template>
  <div class="catagory">
    <el-row :gutter="10">
      <el-col :sm="3" class="catagory-left animated fadeInLeft">
        <div>
          <el-link
            @click="sortNameClick(sortName)"
            :underline="false"
            v-for="(sortName, i) in info.sortNames"
            :key="i"
            v-text="sortName"
            class="animated fadeIn"
            ></el-link
          >
        </div>
      </el-col>
      <el-col :sm="21" class="catagory-right">
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
          class="right-catagory-card animated fadeIn"
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
          v-if="
            info.searchSaveVos !== undefined && info.searchSaveVos.length > 0
          "
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page="query.page"
            :page-size="query.limit"
            :total="info.pageTotal"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mixin from "mixins";
export default {
  data() {
    return {};
  },
  mixins: [mixin],
  methods: {},
  created: function () {
  },
};
</script>

<style>
.catagory {
  width: 70%;
  margin-top: 20px;
}

.catagory .color {
  color: #409eff;
}
.catagory .catagory-left{
  min-height: 36px;
}
.catagory .catagory-left .el-link.el-link--default {
  display: block;
  line-height: 3;
  font-size: 16px;
}

.catagory .right-catagory-card {
  width: 100%;
  margin-bottom: 20px;
}

.catagory .right-catagory-card > div > div {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.right-catagory-card > div > div a {
  padding: 5px;
}

.catagory .right-catagory-card > div > div:nth-child(1) {
  font-size: 20px;
}

.catagory .el-card i {
  font-size: 14px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

.catagory .right-catagory-card > div > div:nth-child(3) {
  line-height: 35px;
  letter-spacing: 1px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.catagory .right-catagory-card > div > div:nth-child(4) > span {
  margin-right: 10px;
}

.catagory .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 900px) and (min-width: 0px) {
  .catagory {
    width: 90%;
  }
}

@media screen and (max-width: 768px) {
  .catagory .catagory-left {
    z-index: 999;
    left: 0;
    width: 25%;
    background-color: #fff;
    padding: 0;
    text-align: center;
    position: fixed;
  }
}
</style>
