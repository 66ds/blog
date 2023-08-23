<template>
  <div class="tags">
    <div class="tag-cloud" v-custom-loading = "data">
      <div>
        <div class="tag-cloud-title">目前共计 {{ data.length }} 个标签</div>
        <div class="tag-cloud-tags animated zoomIn">
          <router-link
            tag="li"
            :style="randomRgb(item)"
            v-for="(item, i) in data"
            :key="i"
            :to="{ name: 'main', params: { labelName: item.labelName } }"
          >
            {{ item.labelName }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { labelsListApi } from "api/labels";
export default {
  data() {
    return {
      data: [],
      loading:true
    };
  },
  methods: {
    randomRgb() {
      let R = Math.floor(Math.random() * 255);
      let G = Math.floor(Math.random() * 255);
      let B = Math.floor(Math.random() * 255);
      return {
        fontSize: "14.88px",
        color: "rgb(" + R + "," + G + "," + B + ")",
      };
    },
  },

  mounted() {
    this.loading = true;
    labelsListApi()
      .then((res) => {
        if (res == undefined) return;
        this.data = res.data;
        this.loading = false;
      })
      .catch((e) => {
        this.$message.error(e);
      });
  }
};
</script>

<style>
.tags {
  width: 70%;
  text-align: center;
  line-height: 2;
  margin: 0 auto;
}

.tags .tag-cloud {
  margin: 10% auto;
}

.tags .tag-cloud-title {
  font-size: 17px;
}

.tags .tag-cloud li {
  list-style: none;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .tags,
  .tag-cloud {
    width: 100% !important;
  }
}
</style>
