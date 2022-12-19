<template>
  <div>
      <div class="content-wrap">
        <div class="content">
          <div class="title">
            <h3 style="line-height: 1.3">博客列表</h3>
          </div>
          <transition-group
          appear
          name="animate__animated animate__bounce"
          enter-active-class="animate__bounceInDown">         
          <article class="excerpt excerpt-1" v-for="item in articleList[pageIndex]" :key="item.id">
            <router-link :to="{ path: '/detail', query: { id: item.id } }" class="focus">
              <img class="thumb" data-original="" src="../assets/picture/vue2.0.png" alt="vue学习"
                style="display: inline" />
            </router-link>
            <header>
              <a class="cat"  title="推荐博客">{{item.type}}<i></i></a>
              <h2>
                <router-link :to="{ path: '/detail', query: { id: item.id } }">{{ item.title }}</router-link>
              </h2>
            </header>
            <p class="meta">
              <time class="time"><i class="glyphicon glyphicon-time"></i> {{$moment(item.addTime).format("YYYY-MM-DD")}}</time>
              <span class="views"><i class="glyphicon glyphicon-eye-open"></i> {{item.views}}</span>
              <a class="comment"  title="评论" ><i class="glyphicon glyphicon-comment"></i>
                666</a>
            </p>
            <p class="note">
              {{ item.introduce }}
            </p>
          </article>
        </transition-group>
          <!-- 分页 注意：默认page-size为10-->
          <nav class="pagination" >
            <el-pagination 
            @current-change="currentChange"
            background 
            layout="prev, pager, next" 
            :page-size="5"  
            :total="total">
            </el-pagination>
          </nav>
        </div>
      </div>
      <!-- 侧边栏 -->
    <SideBar></SideBar>
  </div>
</template>

<script>
import { getArticleList } from '../http/api'
import SideBar from '@/components/SideBar'
export default {
  components: { SideBar },
  data() {
    return {
      articleList: [],
      total: 10,
      pageIndex:0
    }
  },
  mounted() {
    getArticleList().then((res) => {
      // console.log(res.data)
      // this.articleList = res.data;
      this.total = res.data.length;
      this.sliceList(res.data)
      console.log(this.total)
      console.log('this.articleList',this.articleList)
    })
  },
  methods: {
    sliceList(arr) {
      this.articleList = [];
      for (let index = 0; index < arr.length; index += 5) {
        let list = arr.slice(index, index + 5);
        this.articleList.push(list);
      }
    },
    currentChange(page) {
      // 索引是从0开始，页码从1开始
      this.pageIndex = page - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>