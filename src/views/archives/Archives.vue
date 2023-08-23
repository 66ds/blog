<template>
  <div class="archives">
    <el-row :gutter="12">
      <el-col :sm="4" class="archives-left animated fadeInLeft">
        <div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(timestamp, index) in info.archivesTimes"
              :key="index"
              :timestamp="timestamp | convertTime"
              @click.native="change(timestamp)"
              class="animated fadeIn"
              ><!-- :class="{ color: id == index }" -->
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
      <el-col :sm="19" class="archives-right">
        <search
          @searchListToParentOne="searchChildListOne(arguments)"
          @searchListToParentTwo="searchChildListTwo(arguments)"
          ref="search"
        />
        <div
          class="msg-message"
          v-if="
            !info.loading  && info.searchSaveVos.length == 0
          "
        >
          <!-- <p>空空如也</p> -->
          <img src="~assets/empty/empty.png" />
        </div>
        <el-card
          class="archives-right-card animated fadeIn"
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
            <el-link icon="el-icon-time">发表于:{{ item.articleDate | convertTime}}</el-link>
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
              v-for="(label, i) in item.labelsEntityList"
              :key="label.labelId"
              :type="labelRemark(i)"
            >
              {{ label.labelName }}
            </el-tag>
          </div>
        </el-card>
        <div
          class="pagination"
          v-if="
            info.searchSaveVos.length > 0
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
    return {
      reverse: true,
      activities: [],
      articlesData: [],
    };
  },
  methods: {
    change(timestamp) {
      this.$set(this.query, "archivesTime", timestamp);
      this.$refs.search.searchList(this.query);
    },
  },
  mixins: [mixin],
  components: {},
  created() {},
};
</script>

<style>
.archives {
  width: 70%;
  margin-top: 20px;
}

.archives .archives-left {
  /* position: fixed; */
  min-height: 36px;
  bottom: 120px;
  top: 100px;
  overflow: auto;
}

.archives .color .is-bottom {
  color: #409eff;
}

.archives .archives-left::-webkit-scrollbar {
  width: 0;
}

.archives-right-card {
  width: 100%;
  margin-bottom: 20px;
}

.archives-right-card > div > div {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.archives-right-card > div > div a {
  padding: 5px;
}
.archives-right-card > div > div:nth-child(1) {
  font-size: 20px;
}

.archives-right-card > div > div:nth-child(3) {
  line-height: 35px;
  letter-spacing: 1px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.archives .is-bottom:hover {
  color: #409eff;
  cursor: pointer;
}

.archives .el-card i {
    font-size: 14px;
    color: #437dff;
    font-weight: 700;
    padding: 0 5px 0 0;
}

.archives-right-card > div > div:nth-child(4) > span {
  margin-right: 10px;
}

.archives .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 900px) and (min-width: 0px) {
  .archives {
    width: 90%;
  }
}

@media screen and (min-width: 768px) {
  /* .archives-right {
    margin-left: 17%;
  } */
}

@media screen and (max-width: 768px) {
  .archives .archives-left {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 20%;
    width: 30%;
    background-color: #fff;
    padding: 0;
    overflow: auto;
  }
}

</style>
