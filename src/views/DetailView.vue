<template>
  <div>
    <div class="content-wrap">
      <div class="content">
        <header class="article-header">
          <h1 class="article-title">
            {{ article.title }}
          </h1>
          <div class="article-meta">
            <span class="item article-meta-time">
              <time class="time"><i class="glyphicon glyphicon-time"></i>
                {{ article.addTime | format('YYYY-MM-DD') }}</time>
            </span>
            <span class="item article-meta-source"><i class="glyphicon glyphicon-globe"></i> 贾克杰森Blog</span>
            <span class="item article-meta-category"><i class="glyphicon glyphicon-list"></i>
              <a>{{ article.type }}</a></span>
            <span class="item article-meta-views"><i class="glyphicon glyphicon-eye-open"></i>{{ article.views }}</span>
            <span class="item article-meta-comment"><i class="glyphicon glyphicon-comment"></i> 666</span>
          </div>
        </header>
        <article class="article-content">
          <!-- 获取文章内容 -->
          <div v-html="markdownToHtml" class="markdown-body" id="blogcontent">

          </div>
        </article>
        <div class="article-tags">
          标签：<a rel="tag">技术博客</a><a rel="tag">贾克杰森の博客</a><a rel="tag">技术分享</a><a rel="tag">修复优化</a>
        </div>
        <div class="relates">
          <div class="title">
            <h3>相关推荐</h3>
          </div>
          <ul>
            <li>
              <a title="">用vue做一个独立博客网站（响应式模板）</a>
            </li>
          </ul>
        </div>
        <div class="title" id="comment">
          <h3>评论</h3>
        </div>
        <div id="respond">
          <div class="comment">
            <input name="" id="" class="form-control" size="22" placeholder="您的昵称（必填）" maxlength="15" autocomplete="off"
              tabindex="1" type="text" />
            <input name="" id="" class="form-control" size="22" placeholder="您的网址或邮箱（非必填）" maxlength="58"
              autocomplete="off" tabindex="2" type="text" />
            <div class="comment-box">
              <textarea placeholder="您的评论或留言（必填）" name="comment-textarea" id="comment-textarea" cols="100%" rows="3"
                tabindex="3"></textarea>
              <div class="comment-ctrl">
                <div class="comment-prompt" style="display: none">
                  <i class="fa fa-spin fa-circle-o-notch"></i>
                  <span class="comment-prompt-text">评论正在提交中...请稍后</span>
                </div>
                <div class="comment-success" style="display: block">
                  <i class="fa fa-check"></i>
                  <span class="comment-prompt-text">评论提交成功...</span>
                </div>
                <button type="submit" name="comment-submit" id="comment-submit" tabindex="4">
                  评论
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="postcomments">
          <ol id="comment_list" class="commentlist">
            <li class="comment-content">
              <span class="comment-f">#2</span>
              <div class="comment-main">
                <p>
                  <a class="address" rel="nofollow">贾克杰森博客</a><span class="time">(2021/10/28
                    11:41:03)</span><br />不错的网站主题，看着相当舒服
                </p>
              </div>
            </li>
            <li class="comment-content">
              <span class="comment-f">#1</span>
              <div class="comment-main">
                <p>
                  <a class="address" rel="nofollow">贾克杰森博客</a><span class="time">(2022/10/14
                    21:02:39)</span><br />博客做得好漂亮哦！
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <!-- 侧边文章目录 -->
    <aside class="sidebar" v-if="show">
      <div class="items">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章目录</span>
          </div>
          <div style="overflow-y: scroll" class="catalogue">
            <!-- <a v-for="(o, k) in catalogue" :key="k" class="text item" :href="['#' + o.content]">
              {{ o.content }}
            </a> -->
            <li v-for="(o, k) in catalogue" :key="k" class="text item" @click="goTo(o.content)">
              {{ o.content }}
            </li>
          </div>

        </el-card>

      </div>
    </aside>
  </div>
</template>

<script>
import { getArticleById, updateView, getNotesById ,updateNoteView} from '../http/api'
import { marked } from 'marked'
import hljs from 'highlight.js'
import "highlight.js/styles/atom-one-dark.css"; // 引入高亮样式,可以自己选择好喜欢的
import { mixin_date } from '@/mixin/mixin_date'
export default {
  data() {
    return {
      article: {},
      catalogue: [],
      show: false,
      fromPath: ''
    }
  },
  computed: {
    markdownToHtml() {
      // 给个默认值防止解析空，报错
      // 注意* marked解析会把h标签里面的空格解析成-  而.和括号会被移除  大写字母会变成小写
      return marked.parse(this.article.content || '# ')
    },
  },
  mixins: [mixin_date],
  methods: {
    getCatalogue() {
      var content = document.getElementById('blogcontent').children
      var arr = [{
        content: ''
      }]
      let h2 = 0
      // console.log('content', content)
      for (let i = 0; i < content.length; i++) {
        var element = { content: '' }
        if (content[i].localName === 'h2') {
          element.content = content[i].innerHTML.toLowerCase()
          if (h2 === 0) {
            arr[0] = element;
            h2++;
          } else {
            arr.push(element)
            h2++
          }

        }

      }
      this.catalogue = arr
      if (arr.length > 1) {
        this.show = true
      }
    },
    goTo(id) {
      // console.log(id)
      let el = document.getElementById(id)
      // console.log(el)
      if (el) {
        el.scrollIntoView()
      }
    }

  },
  mounted() {
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });


    // 根据路由拿到当前路由的参数，向后端请求数据
    // console.log(this.$route.query) => {id: xx}
    let id = this.$route.query
    if (this.fromPath === '/itnotes') {
      getNotesById(id).then((res) => {
        this.article = res.data[0]
      })

      this.$nextTick(() => {
      // 访问量：每次进来先获取文章浏览量，浏览超过5s再给对应的文章浏览量加1
      setTimeout(() => {
        let data = {
          id: this.$route.query.id,
          views: this.article.views + 1
        }
        updateNoteView(data).then(() => {

        })
      }, 5000);
    })
    } else {
      getArticleById(id).then((res) => {
        this.article = res.data[0]
        // console.log(this.article)
      })

      
    this.$nextTick(() => {
      // 访问量：每次进来先获取文章浏览量，浏览超过5s再给对应的文章浏览量加1
      setTimeout(() => {
        let data = {
          id: this.$route.query.id,
          views: this.article.views + 1
        }
        updateView(data).then(() => {

        })
      }, 5000);
    })


    }

    // https://blog.csdn.net/qq_35260798/article/details/123273679
    this.$nextTick(() => {
      setTimeout(() => {
        this.getCatalogue()
      }, 1000);

    })


  },
  beforeRouteEnter(to, from, next) {
    // vm是 VueComponent
    next(vm => {
      vm.fromPath = from.path
    })
  },
};
</script>

<style lang="scss" scoped>
@import url(../assets/css/github-markdown.min.css);

.article-header,
.article-content {
  background-color: #fff;
}

.items {
  width: 356px;
  // height: 50px;
  background-color: #fff;
  position: fixed;

  span {
    font-size: 20px;
  }

  .text {
    display: flex;
    flex-direction: column;
    font-size: 18px;
  }

  .item {
    margin-bottom: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .catalogue {
    width: 100%;
    height: 370px;

    li {
      cursor: pointer;
      color: #00aeef;

      &:hover {
        color: purple
      }
    }
  }

}
</style>