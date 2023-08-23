<template>
  <div class="person-catagory">
    <el-row :gutter="10">
      <el-col :sm="4" class="catagory-left animated fadeInLeft">
        <div
          @mousedown="down"
          @touchstart="down"
          @mousemove="move"
          @touchmove.prevent="move"
          @mouseup="end"
          @touchend="end"
          ref="moveDiv"
        >
          <el-link
            @click="isShow = !isShow"
            :underline="false"
            v-text="isShow ? '点我收起' : '点我展开'"
            >点我收起</el-link
          >
          <el-link
            @click="sortNameClick(sortName)"
            :underline="false"
            v-for="(sortName, i) in info.sortNames"
            :key="i"
            v-text="sortName"
            >全部</el-link
          >
        </div>
      </el-col>
      <el-col :sm="20" class="catagory-right">
        <search
          @searchListToParentOne="searchChildListOne(arguments)"
          @searchListToParentTwo="searchChildListTwo(arguments)"
          ref="search"
        />
        <div
          class="msg-message"
          v-if="info.searchSaveVos.length == 0
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
      isShow: true,
      id: "",
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
    };
  },
  mixins: [mixin],
  methods: {
    // 实现移动端拖拽
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.moveDiv.offsetLeft;
      this.dy = this.$refs.moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;

        const maxWidth = window.screen.width - 45; //屏幕分辨率宽度减去悬浮框宽高
        const maxHeight = window.screen.height - 45;
        if (this.xPum < 0) {
          //屏幕x限制
          this.xPum = 0;
        } else if (this.xPum > maxWidth) {
          this.xPum = maxWidth;
        }
        if (this.yPum < 0) {
          //屏幕y限制
          this.yPum = 0;
        } else if (this.yPum > maxHeight) {
          this.yPum = maxHeight;
        }
        this.$refs.moveDiv.style.left = this.xPum + "px";
        this.$refs.moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function () {
            // event.preventDefault();
            event.stopPropagation();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
  },
  created() {},
};
</script>

<style>
.person-catagory {
  width: 65%;
  margin-top: 20px;
}

.person-catagory .color {
  color: #409eff;
}

.person-catagory .catagory-left .el-link.el-link--default {
  display: block;
  line-height: 3;
  font-size: 16px;
}

.person-catagory .right-catagory-card {
  width: 100%;
  margin-bottom: 20px;
}

.person-catagory .right-catagory-card > div > div {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.person-catagory .right-catagory-card > div > div a {
  padding: 5px;
}

.person-catagory .el-card i {
  font-size: 14px;
  color: #437dff;
  font-weight: 700;
  padding: 0 5px 0 0;
}

.person-catagory  .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

.person-catagory .right-catagory-card > div > div:nth-child(1) {
  font-size: 20px;
}

.person-catagory .right-catagory-card > div > div:nth-child(3) {
  line-height: 35px;
  letter-spacing: 1px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.person-catagory .right-catagory-card > div > div:nth-child(4) > span {
  margin-right: 10px;
}

@media screen and (max-width: 900px) and (min-width: 0px) {
  .person-catagory {
    width: 90%;
  }
}

@media screen and (max-width: 768px) {
  .person-catagory .catagory-left {
    z-index: 999;
    left: 0;
    width: 25%;
    background-color: #fff;
    padding: 0;
    text-align: center;
    position: fixed;
    overflow: auto;
    cursor: move;
  }
}
</style>
