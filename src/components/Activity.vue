<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle"
          :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg' + avatarPrefix">
        <span class="username text-muted">Junson</span>
        <span class="description">2021-10-24</span>
      </div>
      <p>
        技术永远是最纯粹的东西,复杂的往往是人。
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-thumb" />
            点赞
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle"
          :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg' + avatarPrefix">
        <span class="username text-muted">Junson</span>
        <span class="description">2021-10-24</span>
      </div>
      <p>
        人，从来不缺少发现技术的眼睛，而是缺少一份学习技术的耐心。
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-thumb" />
            点赞
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle"
          :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg' + avatarPrefix">
        <span class="username">Spider Man</span>
        <span class="description">2021-10-24</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item + carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-thumb" />
            点赞
          </span>
        </li>
      </ul>
    </div>
    <el-upload
              ref="uploadplan"
              class="upload-demo"
              action=""
              accept=".md,.docx,.pdf"
              :http-request="uploadHttpRequest"
              :limit="1"
              :file-list="fileList"
            >
              <el-button type="primary" size="small">
                上传
              </el-button>
            </el-upload>

  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import axios from 'axios'
export default {
  data() {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      fileList: [],//上传的文件列表

    }
  },
  methods: {
  //自定义上传方法
    uploadHttpRequest(param) {
      console.log(param.file);//查看是否选取到文件
      let formData = new FormData(); //FormData对象，添加参数只能通过append('key', value)的形式添加
      // formData.append("id", this.tid);//添加id（这里是项目需要，根据个人情况选择是否添加）
      formData.append("file", param.file); //添加文件对象
      axios.post("http://localhost:9922/uploadFile",formData,{
           headers: {
              "Content-Type": "multipart/form-data",//配置header，我们上传的文件编码格式就是multipart/form-data
            },
        }).then((res)=>{
          console.log(res)
        })
    },

 }

}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
