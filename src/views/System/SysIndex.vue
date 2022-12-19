<template>
    <div>
        <div class="top">
            <el-input v-model="blog.title" placeholder="请输入内容"></el-input>
            <el-select v-model="blog.typeFlag" placeholder="请选择">
                <el-option v-for="item in types" :key="item.id" :label="item.type" :value="item.id">
                </el-option>
            </el-select>
            <el-button @click="waitaddBlog" type="primary" :disabled="disabled1">暂存/更新文章</el-button>
            <el-button @click="waitaddNotes" type="success" :disabled="disabled2">暂存/更新笔记</el-button>
        </div>
        <div class="content">
            <mavon-editor :value="blog.content" @change="valueChange" />
            <div class="right">
                <div class="introduce">
                    <el-input type="textarea" :rows="10" placeholder="文章简介" v-model="blog.introduce">
                    </el-input>
                </div>
                <el-date-picker v-model="blog.addTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </div>
        </div>

    </div>
</template>

<script>
import { getTypes, getArticleById, addBlog, updateBlog, getNotesById, updateNotes, addNote } from '@/http/api'

export default {
    data() {
        return {
            blog: {
                id: 0,
                title: '',
                introduce: '',
                content: '# 用二级标题且不要加符号',
                addTime: '',
                typeFlag: 0,
                views: 1,
                pubFlag: 0
            },
            types: [],
            disabled1: false,
            disabled2: false,
            fromPath: ''
        }
    },
    methods: {
        valueChange(value) {
            //(value, render) value: 你输入的文本, render: markdown编译之后返回的HTML文本
            this.blog.content = value
        },
        waitaddBlog() {
            let data = {
                id: this.blog.id,
                title: this.blog.title,
                introduce: this.blog.introduce,
                content: this.blog.content,
                addTime: this.$moment(this.blog.addTime).format("YYYY-MM-DD HH:mm:ss"),
                typeFlag: this.blog.typeFlag,
                views: this.blog.views,
                pubFlag: this.blog.pubFlag
            }
            // console.log('@data', data)
            if (data.id === 0) {
                // 暂存文章
                addBlog(data).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message.success('暂存文章成功')
                    }

                }).catch(() => {
                    this.$message.error('暂存文章失败')
                })
            } else {
                // 更新文章内容
                updateBlog(data).then(() => {
                    // console.log(res)
                    this.$message.success('更新文章成功')
                })
            }
        },
        waitaddNotes() {
            let data = {
                id: this.blog.id,
                title: this.blog.title,
                content: this.blog.content,
                addTime: this.$moment(this.blog.addTime).format("YYYY-MM-DD HH:mm:ss"),
                views: this.blog.views,
                pubFlag: this.blog.pubFlag
            }
            // console.log('@data', data)
            if (data.id === 0) {
                // 暂存文章
                addNote(data).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message.success('暂存笔记成功')
                    }

                }).catch(() => {
                    this.$message.error('暂存笔记失败')
                })
            } else {
                // 更新文章内容
                updateNotes(data).then(() => {
                    // console.log(res)
                    this.$message.success('更新文章成功')
                })
            }

        }
    },
    mounted() {
        getTypes().then((res) => {
                    this.types = res.data
                })
        if (JSON.stringify(this.$route.query) !== '{}') {
            let id = this.$route.query
            if (this.fromPath === '/sysManage') {
                
                // 接收当前路由的参数  将对象强制转成 {} 字符串进行比较 https://blog.csdn.net/Granters/article/details/122943406
                // console.log(JSON.stringify(this.$route.query))
                getArticleById(id).then((res) => {
                    this.blog = res.data[0]
                })
            } else if (this.fromPath === '/sysNotes') {
                getNotesById(id).then((res) => {
                    this.blog = res.data[0]
                })
            }
        }

    },
    beforeRouteEnter(to, from, next) {
        // vm是 VueComponent
        next(vm => {
            vm.fromPath = from.fullPath
            if (from.fullPath === '/sysManage') {
                vm.disabled2 = true
            } else if (from.fullPath === '/sysNotes') {
                vm.disabled1 = true
            }
        })
    }

}
</script>

<style lang="scss" scoped>
@import url(@/assets/css/github-markdown.min.css);

.top {
    .el-input {
        width: 60%;
    }

    .el-select {
        width: 10%;
        margin-left: 10px;
    }

    .el-button {
        margin-left: 20px;
    }
}

.content {
    display: flex;
    width: 90%;
    height: calc(100vh - 250px);
    margin-top: 20px;

    .right {
        margin-left: 10px;

        .introduce {
            margin-bottom: 10px;
        }
    }

}
</style>