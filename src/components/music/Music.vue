<template>
  <div class="music animated fadeIn">
    <el-row :gutter="10">
      <el-col :sm="5" class="music-left">
        <div>
          <el-link :underline="false">MUSIC CENTER</el-link>
          <el-link :underline="false"
            ><i class="el-icon-star-off"></i>我的收藏</el-link
          >
          <el-link :underline="false"
            ><i class="el-icon-pie-chart"></i>历史播放</el-link
          >
          <el-link :underline="false"
            ><i class="el-icon-folder-opened"></i>本地音乐</el-link
          >
          <el-link :underline="false"
            ><i class="el-icon-headset"></i>最近播放</el-link
          >
        </div>
      </el-col>
      <el-col :sm="19" class="music-right">
        <div>
          <el-input
            placeholder="请输入歌曲名"
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
              @click="getMusicList(query)"
              :loading="btnLoading"
              >{{ searchLoading }}</el-button
            >
          </el-input>
        </div>

        <div class="middle">
          <h2>专辑编辑</h2>
          <div class="introduce">
            <div
              v-for="item in musicAll.dataTwo"
              :key="item.ziMusicId"
              class="animated fadeIn"
            >
              <img
                :src="item.zjMusicCover"
                @click="
                  playSing(
                    item.zjMusicId,
                    item.zjMusicName,
                    item.zjMusicIsPause
                  )
                "
              />
              <p @click="playSing(item.zjMusicName)">{{ item.zjMusicName }}</p>
            </div>
          </div>
          <div class="msg-message" v-if="musicAll.dataTwo.length == 0" v-cloak>
            <!-- <p>空空如也</p> -->
            <img src="~assets/empty/empty.png" />
          </div>
        </div>
        <div class="footer">
          <div>
            <h2>MV推荐</h2>
            <div class="introduce">
              <div
                v-for="(item, key) in mvAll"
                :key="key"
                class="animated fadeIn"
                @click="mvPlay(item.zjMvUrl)"
              >
                <img :src="item.zjMvPhoto" />
                <p>{{ item.zjMvName }}</p>
              </div>
            </div>
            <div class="msg-message" v-if="mvAll.length == 0">
              <!-- <p>空空如也</p> -->
              <img src="~assets/empty/empty.png" />
            </div>
          </div>
          <div>
            <h2>全部歌曲</h2>
            <el-table
              :data="allSing.data"
              style="width: 100%"
              :header-cell-style="{ color: '#B9B8B1' }"
              :cell-style="cellStyle"
              @cell-click="clickMusicPlay"
            >
              <el-table-column
                prop="name"
                label="歌曲"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="artist"
                label="歌手"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="时长"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="状态"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <i
                    class="el-icon-video-play"
                    v-if="scope.row.isPause == 0"
                  ></i>
                  <img
                    src="~assets/audio/loading.gif"
                    width="20"
                    height="20"
                    v-else
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="collect"
                label="收藏"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <i
                    :class="[
                      scope.row.isCollect === 0
                        ? 'el-icon-star-off'
                        : 'el-icon-star-on',
                    ]"
                  ></i>
                  <!-- {{ scope.row.isCollect == 0 ? "未收藏" : "已收藏" }} -->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                layout="prev, pager, next"
                :current-page="query.page"
                :page-size="query.limit"
                :total="allSing.total"
                @current-change="handlePageChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="24">
        <aplayer :audio="musicAll.dataOne" :lrcType="1" ref="aplayer" />
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      :modal="false"
      :lock-scroll="true"
      :before-close="handleDialogClose"
    >
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMusicList,
  getMusicAll,
  clickMusicPlay,
  collectMusic,
} from "api/music";
import { getMvList } from "api/mv";
export default {
  data() {
    return {
      allSing: {
        total: 0,
        data: [],
      },
      // 音频列表
      query: {
        page: 1,
        limit: 5,
        keyWord: "",
      },
      musicAll: {
        dataOne: [],
        dataTwo: [],
      },
      mvAll: [],
      btnLoading: false,
      searchLoading: "",
      centerDialogVisible: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm", //url地址
          },
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  methods: {
    handlePageChange(val) {
      this.$set(this.query, "page", val);
      this.getMusicList(this.query);
    },
    //播放歌曲
    playSing(id, name, isPause) {
      this.clickMusicPlay({ id, name, isPause }, { label: "状态" });
      this.$message.success("播放成功");
    },
    //查询音乐榜单
    async getMusicList(query) {
      try {
        const res = await getMusicList(query);
        if (res == undefined) return;
        this.allSing.data = res.data.records;
        this.allSing.total = res.data.total;
        //页面还原至1
        // this.$set(this.query, "page", 1);
      } catch (e) {
        this.$message.error(e);
      }
    },
    //获取所有歌曲
    async getMusicAll() {
      try {
        const res = await getMusicAll();
        if (res == undefined) return;
        this.musicAll = res.data;
      } catch (e) {
        this.$message.error(e);
      }
    },
    //列表点击播放音乐
    async clickMusicPlay(row, column) {
      let res = null;
      switch (column.label) {
        case "状态":
          res = await clickMusicPlay(row.id);
          if (res == undefined) return;
          this.getMusicList(this.query);
          const aplayer_app = this.$refs.aplayer;
          row.isPause == 0
            ? (aplayer_app.switch(row.name), aplayer_app.play())
            : aplayer_app.pause();
          break;
        case "收藏":
          res = await collectMusic(row.id);
          if (res == undefined) return;
          row.isCollect == 0
            ? this.$message.success("已收藏")
            : this.$message.success("已取消");
          this.getMusicList(this.query);
          break;
      }
    },
    //查找所有mv
    async getMvList() {
      const res = await getMvList();
      if (res == undefined) return;
      this.mvAll = res.data;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3 || columnIndex === 4) {
        return `fontWeight: 600;cursor:pointer;`;
      } else {
        return `fontWeight: 600;`;
      }
    },
    mvPlay(mvUrl) {
      this.centerDialogVisible = true;
      this.$set(this.playerOptions.sources[0], "src", mvUrl);
    },
    // 关闭之前的回调
    handleDialogClose() {
      //隐藏el-dialog
      this.centerDialogVisible = false;
      this.$refs.videoPlayer.player.pause();
    },
  },
  created() {
    this.getMusicList(this.query);
    this.getMusicAll();
    this.getMvList();
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.music {
  width: 70%;
}

.music .music-left .el-link.el-link--default:first-child {
  margin-top: 9px;
}
.music .music-left .el-link.el-link--default {
  display: block;
  margin-bottom: 50px;
  font-size: 14px;
  font-weight: 600;
}
.el-link.el-link--default i {
  margin-right: 12px;
  color: #4dcde4;
}

.music .search {
  width: 100%;
  background-color: #f9f9f9f9;
  margin-bottom: 32px;
}

.music h2 {
  font-size: 15px;
  font-family: Source Han Sans SC;
  font-weight: 600;
  margin-bottom: 15px;
}
.music .introduce {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
}
.middle .introduce div {
  width: 18%;
  margin-bottom: 10px;
}

.footer {
  margin-top: 20px;
}
.footer .introduce div {
  width: 18%;
  margin-bottom: 25px;
}

.middle .introduce img {
  width: 100%;
  height: 110px;
  border-radius: 4px;
}
.footer .introduce img {
  width: 100%;
  height: 110px;
  border-radius: 4px;
}
.middle img:hover {
  cursor: pointer;
}
.footer .introduce img:hover {
  cursor: pointer;
}
.middle p,
.footer p {
  margin-top: 10px;
  font-size: 12px;
  font-family: Source Han Sans SC;
  color: #333333;
  font-weight: 500;
  text-align: center;
}

.middle p:hover {
  cursor: pointer;
  color: black;
}
.footer p:hover {
  cursor: pointer;
  color: black;
}
.music .msg-message {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}

.music .footer > div {
  flex: 1;
}
::v-deep.el-table .cell {
  padding-left: 0px;
}
::v-deep.el-table th {
  padding-top: 0px;
}
::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #3dc0f3;
  /* cursor: pointer; */
  color: #ffffff;
}
::v-deep.aplayer.aplayer-withlist .aplayer-list {
  display: none;
}
/* ::v-deep .el-dialog__header,.el-dialog__body {
  background: gray;
}
::v-deep .el-dialog--center .el-dialog__body {
  background: gray;
} */
</style>
