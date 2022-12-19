<template>
    <div>
        <div class="backg">
            <div class="bg-left">
                <div class="title">
                    <div class="sysname">贾克杰森博客后台系统</div>
                    <img src="@/assets/picture/bg_left.png" alt="">
                </div>
            </div>
            <div class="bg-right">
                <!-- login -->
                <div class="login">
                    <div style="font-size:25px;margin:30px auto">登录博客系统</div>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="demo-ruleForm"
                        label-position="left">
                        <el-form-item label="账号:" prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="resetForm('loginForm')">重置</el-button>
                            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from '@/http/api'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],

            }
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            console.log(this.loginForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.loginForm).then((res) => {
                        window.localStorage.setItem('blog_token',res.data[0].token)
                        window.localStorage.setItem('user_name',res.data[0].user.username)
                        this.$message.success('登陆成功')
                        this.$router.push('/sysHome')
                    }).catch(err =>{ 
                        console.log(err)
                        this.$message.error('登录失败')
                    })
                    
                } else {
                    this.$message.error('登陆失败')
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.backg {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    background: url('@/assets/svg/backg.svg') no-repeat;
    background-size: 100%,100%;

    .bg-left {
        width: 45vw;
        height: 100vh;

        .title {
            width: 500px;
            height: 500px;
            transform: translate(110px, 70px);

            .sysname {
                font-size: 30px;
                font-weight: bold;
                color: #fff;
            }

            img {
                width: 300px;
                height: 200px;
                border-radius: 18px;
                margin-top: 20px;
            }
        }
    }

    .bg-right {
        width: 50vw;
        height: 100vh;

        .login {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 400px;
            height: 400px;
            color: #fff;
            background-color: transparent;
            transform: translate(180px, 100px);
            border-radius: 20px;

            .el-form {
                width: 350px;

                .el-form-item:nth-child(3) {
                    margin-left: 40px;
                }
            }
        }
    }
}
</style>