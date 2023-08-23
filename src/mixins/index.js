// 定义一个混入对象
import { saveSecretMessageApi } from "api/message";
import { saveAttentionInfoApi } from "api/attention";
import { mapState } from "vuex";
import Search from 'components/search/Search.vue';
export default {
    data() {
        return {
            info: {
                searchSaveVos: [],
                pageTotal: 0,
                loading: true,
                sortNames: [],
                archivesTimes: [],
            },
            query: {},
            isFollow: false,
            newTableHotData: [],
            newTableNewData: [],
            userCardData: {}
        }
    },
    created: function () {
    },
    computed: {
        ...mapState({ user: "user", token: "token" }),
    },
    methods: {
        //添加用户的关注信息
        async saveAttentionInfo(attentionId) {
            try {
                if (this.user != null && attentionId == this.user.userId) {
                    this.$message.success("不能关注自己o~");
                } else {
                    const res = await saveAttentionInfoApi(attentionId);
                    if (res == undefined) return;
                    this.isFollow = !this.isFollow;
                    this.$message.success(res.msg);
                }
            } catch (e) {
                this.$message.error(e);
            }
        },

        //添加私信(普通用户)
        async saveSecretMessage(userId) {
            try {
                const res = await saveSecretMessageApi({
                    sendId: userId,
                });
                if (res == undefined) return;
                this.$router.push({ path: "/chat", query: { id: userId } });
            } catch (e) {
                this.$message.error(e);
            }
        },
        // 分页导航
        handlePageChange(val) {
            //回到顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.$set(this.query, "page", val);
            this.$refs.search.searchList(this.query)
            //清空原来的数据
            // this.$set(this.query, "page", 1);
            // this.$set(this.query, "sortName", "");
            // this.$set(this.query, "archivesTime", "");
        },
        //获取所有父组件传过来的值(注意这里不能使用注释的两种,如果使用第一种,会使对象的地址不发生改变,导致页面bug出现)
        searchChildListOne(data) {
            // this.info = data[0]
            // this.query = data[1]
            this.info = Object.assign({}, data[0]);
            this.query = Object.assign({}, data[1]);
        },
        searchChildListTwo(data) {
            this.isFollow = !data[0]
            this.newTableHotData = Object.assign([], data[1]);
            this.userCardData = Object.assign([], data[2]);
            this.newTableNewData = Object.assign([], data[3]);
        },
        articleDetail(id) {
            this.$router.push({
                path: "/content/" + id,
            });
        },
        labelRemark(i) {
            if ((i / 2) % 2 == 0) {
                return "";
            }
            if ((i / 2) % 2 == 1) {
                return "success";
            }
            if (((i - 1) / 2) % 2 == 0) {
                return "warning";
            }
            if (((i - 1) / 2) % 2 == 1) {
                return "danger";
            }
        },
        sortNameClick(sortName) {
            this.$set(this.query, "sortName", sortName);
            this.$refs.search.searchList(this.query);
        },
        //私信别人
        sendLetterToOther() {
            const userId = this.query.userId
            this.saveSecretMessage(userId ?? 3);
        },
        //关注别人
        followOther() {
            const userId = this.query.userId
            this.saveAttentionInfo(userId ?? 3);
        },
    },
    components: {
        Search
    },
    filters: {
        convertTime: function (value) {
            const data = new Date(value).toJSON();
            return new Date(+new Date(data) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        }
    }
}
