<template>
    <div>
        <el-container>
            <el-header>
                <el-col :span="6">
                    贾克杰森博客后台系统
                </el-col>
                <el-col :span="4" :offset="14">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link" style="color:#fff">
                            <span style="margin-left:10px;font-size: 20px;"><i
                                    class="el-icon-user-solid"></i>{{ username }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- 需要在click事件上使用native修饰才能触发  el-dropdown-item  navtive可以监听根元素的原生事件-->
                            <el-dropdown-item icon="el-icon-circle-check" @click.native="logOut">注销登录</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus" @click.native="dialogFormVisible = true">修改密码
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </el-col>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="/sysIndex" class="el-menu-vertical-demo" background-color="#409eff"
                        text-color="#fff" active-text-color="#ffd04b" router>
                        <el-menu-item :index="i.path" v-for="i in routerList" :key="i.path">
                            <i :class="i.meta.icon"></i>
                            <span slot="title">{{ i.meta.title }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 修改密码对话框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="450px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newSecret">
                    <el-input v-model="form.newSecret" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newSecret1">
                    <el-input v-model="form.newSecret1" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ToUpdate">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { updateSecret } from '@/http/api'
export default {
    data() {
        return {
            routerList: [],
            dialogFormVisible: false,
            form: {
                newSecret: '',
                newSecret1: ''
            },
            formLabelWidth: '100px',
            rules: {
                newSecret: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                newSecret1: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            },
            username: window.localStorage.getItem('user_name')
        }
    },
    methods: {
        logOut() {
            window.localStorage.removeItem('blog_token')
            this.$router.replace('/')
        },
        ToUpdate() {
            this.dialogFormVisible = false
            let username = window.localStorage.getItem('user_name')
            let data = {
                username,
                password: this.form.newSecret
            }
            console.log(data)
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.form.newSecret === this.form.newSecret1) {
                        updateSecret(data).then((res) => {
                            console.log(res)
                        })
                    } else {
                        this.$message.warning('两次密码不相同')
                    }

                } else {
                    this.$message.error('校验失败')
                }
            })

        }

    },
    mounted() {
        console.log(this.$router.options.routes[2].children)
        let arr = this.$router.options.routes[2].children;
        this.routerList = arr
    }
}
</script>

<style lang="scss" scoped>
.el-header {
    height: 100px;
    background-color: #409eff;

    .el-col {
        height: 100%;
        color: #fff;
        font-size: 20px;
        line-height: 60px;
    }
}

.el-menu {
    height: calc(100vh - 50px);
}

[class^=el-icon] {
    color: #fff;
}
</style>