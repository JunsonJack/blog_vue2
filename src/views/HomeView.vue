<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-default" id="navbar">
        <div class="container">
          <div class="header-topbar hidden-xs link-border">
            <ul class="site-nav topmenu">
              <li><a>标签云</a></li>
              <li><a rel="nofollow">读者墙</a></li>
              <li>
                <router-link to="/login">我的后台</router-link>
              </li>
            </ul>
            勤记录 爱分享
          </div>
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" @click="drawer = true">
              <span class="sr-only"></span> <span class="icon-bar"></span>
              <span class="icon-bar"></span> <span class="icon-bar"></span>
            </button>
            <div>
              <el-drawer
                title="导航栏"
                size="50%"
                :visible.sync="drawer"
                :with-header="false">
                <span style="margin-left:20px;color:#3399cc;font-size:24px">导航栏</span>
                <ul class="nav navbar-nav navbar-right" style="margin-left:20px">
              <li v-for="item in routerList" :key="item.path">
                <router-link :to="item.path">{{ item.meta.title }}</router-link>
              </li>
            </ul>
            </el-drawer>

            </div>
            <h1 class="logo hvr-bounce-in">
              <a  title="贾克杰森の博客"><img src="../assets/picture/junson.png" alt="贾克杰森の博客" /></a>
            </h1>
          </div>
          <div class="collapse navbar-collapse" id="header-navbar">
            <form class="navbar-form visible-xs" action="/Search" method="post">
              <div class="input-group">
                <input type="text" name="keyword" class="form-control" placeholder="请输入关键字" maxlength="20"
                  autocomplete="off" />
                <span class="input-group-btn">
                  <button class="btn btn-default btn-search" name="search" type="submit">
                    搜索
                  </button>
                </span>
              </div>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li v-for="item in routerList" :key="item.path">
                <router-link :to="item.path">{{ item.meta.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <section class="container">
      <router-view></router-view>
      <!-- 右边侧边栏 -->
    </section>
    <!-- 页尾 -->
    <footer class="footer">
      <div class="container">
        <p>
          Copyright &copy; 2021-2060.Company name All rights reserved.JUNSONJACK
          <a  title="版权所有">版权所有</a>
        </p>
      </div>
      <!-- 回到顶部 -->

      <el-backtop :bottom="100">
        <div style="{
          height: 100px;
          width: 100px;
          background-color: #3399cc;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          border-radius: 8px;
          color: #fff;
      }">
          UP
        </div>
      </el-backtop>
    </footer>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      routerList: [],
      drawer: false
    };
  },
  created() { },
  mounted() {
    // this.routerList = this.$router.getRoutes().filter((o) => o.meta.isShow);
    let list = []
    list = this.$router.options.routes[0].children
    this.routerList = list.filter(o => o.meta.isShow)
    // console.log(this.routerList);
    // console.log(this.$router.options)
  },
};
</script>
  
<style lang="scss" scoped>
@import url("../assets/css/bootstrap.min.css");
@import url("../assets/css/style.css");
@import url("../assets/css/font-awesome.min.css");

</style>