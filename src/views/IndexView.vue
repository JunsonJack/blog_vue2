<template>
  <div>
    <div class="content-wrap">
      <div class="content">
        <!-- 轮播图 -->
        <div id="focusslide" class="carousel slide" data-ride="carousel">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, k) in imgs" :key="k">
                <img :src="item" alt="" />
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>


        <article class="excerpt-minic excerpt-minic-index">
          <h2>
            <router-link :to="{ path: '/detail', query: { id: 1 } }">
              <span class="red">【推荐】</span>
              为什么选择Vue？
            </router-link>
          </h2>
          <p class="note">
            Vue.js（读音 /vju/, 类似于 view） 是一套构建用户界面的渐进式框架。
            Vue关注视图层，采用自底向上增量开发的设计。
            通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。
            不仅易于上手，还便于与第三方库或既有项目整合。
            另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue也能够为复杂的单页应用提供驱动。
          </p>
        </article>
        <div class="title">
          <h3>最新发布</h3>
          <div class="more">
            <router-link to="/itnotes">IT技术笔记</router-link>
            <router-link to="/daily">日常分享</router-link>
          </div>
        </div>
        <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInLeft">
        <article class="excerpt excerpt-1" style="" v-for="item in newBlogs[this.pageIndex]" :key="item.id">
          <router-link :to="{ path: '/detail', query: { id: item.id } }" class="focus">
            <img class="thumb" data-original="" src="../assets/picture/vue2.0.png" 
              style="display: inline" />
          </router-link>
          <header>
            <a class="cat"   title="MZ-NetBlog主题">{{item.type}}<i></i></a>
            <h2>
              <router-link :to="{ path: '/detail', query: { id: item.id } }">{{item.title}}</router-link>
            </h2>
          </header>
          <p class="meta">
            <time class="time"><i class="glyphicon glyphicon-time"></i> {{$moment(item.addTime).format("YYYY-MM-DD")}}</time>
            <span class="views"><i class="glyphicon glyphicon-eye-open"></i> {{item.views}}</span>
            <a class="comment"   title="评论"><i class="glyphicon glyphicon-comment"></i>
              666</a>
          </p>
          <p class="note">
            {{item.introduce}}
           </p>
        </article>
      </transition-group>
        <!-- 分页 -->
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
    <SideBar :count="total_blog"></SideBar>

  </div>
</template>

<script>
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
import SideBar from '@/components/SideBar'
import { getNewarticle} from '@/http/api'

export default {
  components: { SideBar },
  data() {
    return {
      newBlogs:[],
      total: 10,
      pageIndex:0,
      imgs: [
        require("../assets/picture/vue2.png"),
        require("../assets/picture/vue3.png"),
        require("../assets/picture/vue3x.png"),
      ],
      total_blog: 1
    };
  },
  mounted() {
    getNewarticle().then((res) => {
                console.log(res.data)
                // 获取博客总数 传给sidebar 父——>子
                this.total_blog = res.data.length
                this.sliceList(res.data)
            });

    new Swiper(".swiper-container", {
      direction: "horizontal",
      //mousewheel: true, //滚轮
      autoplay: {
        //自动开始
        delay: 2500, //时间间隔
        disableOnInteraction: false, //*手动操作轮播图后不会暂停*
      },
      // loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // 分页器可以点击
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });
  },

  methods: {
    sliceList(arr) {
      this.newBlogs = [];
      for (let index = 0; index < arr.length; index += 5) {
        let list = arr.slice(index, index + 5);
        this.newBlogs.push(list);
      }
    },
    currentChange(page) {
      // 索引是从0开始，页码从1开始
      this.pageIndex = page - 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #248cc0;
  --swiper-navigation-color: #248cc0;
  --swiper-navigation-size: 20px;
}

.swiper-slide  {
  width: 820px;
  height: 200px;
  display: flex;
  justify-content: center;
  // background-color: pink;
  img {
    width: 100%;
  }
}
</style>