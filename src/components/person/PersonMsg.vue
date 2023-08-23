<template>
  <div class="person-message">
    <div class="content el-row animated fadeIn">
      <div class="left_box">
        <ul class="aside" style="list-style: none">
          <li class="list">
            <router-link to="/person-msg/index" active-class="active"
              ><span>评论</span></router-link
            >
          </li>
          <li class="list">
            <router-link to="/person-msg/attention" active-class="active"
              ><span>关注</span></router-link
            >
          </li>
          <li class="list">
            <router-link to="/person-msg/like" active-class="active"
              ><span>点赞</span></router-link
            >
          </li>
          <li class="list">
            <router-link to="/chat" active-class="active"
              ><span>私信</span></router-link
            >
          </li>
          <li class="list">
            <router-link to="/person-msg/notice" active-class="active"
              ><span>系统通知</span></router-link
            >
          </li>
        </ul>
      </div>
      <div class="view-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  created() {},
};
</script>

<style>
.person-message {
  width: 70%;
  /* padding: 0 20px; */
  box-sizing: border-box;
}

.person-message .left_box {
  width: 159px;
  float: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.person-message .left_box .aside {
  background: #fff;
  border: 1px solid #ebeef5;
  padding-top: 16px;
  border-radius: 2px;
  background-color: unset;
}

.person-message .left_box .aside li {
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #4d4d4d;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto 16px;
  position: relative;
  border-radius: 17.5px;
  text-align: center;
}

.person-message .left_box .aside li > a {
  font-size: 14px;
  color: #4d4d4d;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-weight: 400;
}

.person-message .left_box .aside li > .active {
  color: #409eff !important;
}

.person-message .left_box .aside li > a:hover {
  color: #409eff;
}

.person-message .view-container {
  position: relative;
  margin-left: 168px;
  padding: 24px 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: unset;
}

.person-message .msg-message {
  text-align: center;
  justify-content: center;
  align-content: center;
  height: calc(100vh - 255px);
}

.person-message .msg-info-wrap {
  margin-bottom: 8px;
}

.person-message .msg-info a {
  color: #4a90e2;
  float: right;
  cursor: pointer;
}

.person-message .clearfix {
  display: block;
  overflow: hidden;
  zoom: 1;
}

.person-message .msg-list {
  padding: 0 0 0 15px;
  height: calc(100vh - 255px);
}

.person-message .msg-list ul {
  font-size: 13px;
  list-style: none;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.person-message .msg-list ul::-webkit-scrollbar {
  display: none;
}

.person-message .msg-list ul li {
  position: relative;
  padding: 18px 0;
  border-bottom: 1px solid #e0e0e0;
}

.person-message .msg-type {
  display: inline-block;
  height: 20px;
  line-height: 18px;
  padding: 0 5px;
  color: #4d4d4d;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  vertical-align: top;
}

.person-message .msg-list ul li .msg-title {
  width: 80%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  color: #4d4d4d;
}

.person-message .msg-list ul li .msg-title a {
  display: inline-block;
  margin-right: 8px;
}

.person-message .msg-list .msg-read a,
.msg-list .msg-unread a {
  color: #3399ea;
}

.person-message .msg-list .btn-rush {
  color: #999 !important;
}

.person-message .btn-rush {
  position: absolute;
  right: 0;
  top: 20px;
  color: #999;
}

.person-message .msg-list ul li .msg-text {
  display: block;
  margin-top: 12px;
  padding: 0;
  color: #4d4d4d;
}

.person-message .msg-list ul li .msg-text span {
  width: 80%;
  position: relative;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.person-message .msg-list ul li .msg-text span a {
  color: #4d4d4d;
}

.person-message .msg-list ul li .msg-text em,
.msg-list ul li .msg-text span {
  display: inline-block;
}

.person-message .msg-list em {
  font-style: normal;
  color: #ccc;
  float: right;
}

@media screen and (max-width: 768px) and (min-width: 0px) {
  .person-message {
    width: 100%;
    padding: 0 20px;
  }

  .person-message .left_box {
    z-index: 999;
    left: 0;
    top: 20%;
    width: 30%;
    background-color: #fff;
    padding: 0;
    position: fixed;
  }

  .person-message .view-container {
    width: 100%;
    margin-left: 0px;
    padding: 0px;
  }
}
</style>
