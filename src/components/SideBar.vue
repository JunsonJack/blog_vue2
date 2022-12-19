<template>
    <div>
        <aside class="sidebar">
            <div class="fixed">
                <div class="widget widget-tabs">
                    <el-tabs type="border-card">
                        <el-tab-pane label="个人介绍" class="mymsg">
                            <div class="photo">
                            </div>
                            <div class="msg">
                                昵称：贾克杰森 <br>
                                Web-Developer
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="网站信息">
                            <h3>日志总数: {{ count }}篇</h3>
                            <h3>
                                网站运行:
                                <span id="sitetime">{{ total_day }}天 </span>
                            </h3>
                        </el-tab-pane>
                        <el-tab-pane label="联系站长">
                            <h3>Email: 2528316938@qq.com</h3>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="widget widget_search">

                    <div class="input-group">
                        <input type="text" v-model="title" class="form-control" size="35" placeholder="请输入文章标题"
                            maxlength="15" autocomplete="off" required />
                        <span class="input-group-btn">
                            <button class="btn btn-default btn-search" @click="SearchBlog">
                                搜索
                            </button>
                        </span>
                    </div>

                </div>
            </div>
            <div class="widget widget_hot">
                <h3>搜索您需要的文章</h3>
                <ul>
                    <li v-for="item in blog[pageIndex]" :key="item.id">
                        <router-link :to="{ path: '/detail', query: { id: item.id } }" >
                            <span class="thumbnail">
                                <img class="thumb" src="../assets/picture/vue2.0.png" alt="" style="display: block" />
                            </span>
                            <span class="text">{{ item.title }}</span>
                            <span class="muted"><i class="glyphicon glyphicon-time"></i>
                                {{ $moment(item.addTime).format("YYYY-MM-DD") }}
                            </span>
                            <span class="muted"><i class="glyphicon glyphicon-eye-open"></i>
                                {{ item.views }}
                            </span>
                        </router-link>
                    </li>
                    <!-- 分页 注意：默认page-size为10-->
                    <nav class="pagination" v-show="blog.length">
                        <el-pagination @current-change="currentChange" background layout="prev, pager, next"
                            :page-size="3" :total="total">
                        </el-pagination>
                    </nav>

                </ul>
            </div>

            <div class="widget widget_sentence">
                <h3>Github链接</h3>
                <div class="widget-sentence-link">
                    <a href="https://github.com/JunsonJack" title="Github" target="_blank">
                        贾克杰森的Github
                    </a>&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </aside>

    </div>
</template>

<script>
import { getByTitle } from '../http/api'
export default {
    name: 'SideBar',
    props: ['count'],
    data() {
        return {
            blog: [],
            title: 'vue',
            total: 10,
            pageIndex: 0
        }
    },
    computed: {
        total_day() {
            let now = this.$moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
            let before = this.$moment('2021-10-24 00:00:00').format('YYYY-MM-DD HH:MM:SS')

            return this.$moment(now).diff(before, 'day')
        }

    },
    methods: {
        SearchBlog() {
            // 根据文章标题搜索文章
            let data = {
                title: this.title
            }
            if (this.title === '') {
                this.$message.warning('请输入关键字')
            } else {
                getByTitle(data).then((res) => {
                    // console.log(res)
                    
                    this.total = res.data.length
                    this.sliceList(res.data)
                    
                    // this.blog = res.data
                }).catch((res) => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                    }
                })
            }

        },
        sliceList(arr) {
            this.blog = [];
            for (let index = 0; index < arr.length; index += 3) {
                let list = arr.slice(index, index + 3);
                this.blog.push(list);
            }
        },
        currentChange(page) {
            // 索引是从0开始，页码从1开始
            this.pageIndex = page - 1;
        }
    },

}
</script>

<style lang="scss" scoped>
.el-tabs {
    height: 100%;

    .mymsg {
        display: flex;

        .photo {
            width: 100px;
            height: 100px;
            background-color: pink;
            border-radius: 50%;
            background: url(../assets/picture/wx.jpg) no-repeat;
            background-size: 90px 90px;
            border: 5px #3399cc solid;
        }

        .msg {
            margin: 20px 20px;
            // background-color: pink;
            font-size: 18px;
            text-align: center;
        }
    }

}
</style>