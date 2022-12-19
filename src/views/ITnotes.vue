<template>
  <div>
    <el-skeleton
      style="width: 100%"
      :loading="loading"
      animated
      :throttle="500"
      :count="3"
    >
      <template slot="template">
        <div style="display: flex">
          <div>
            <el-skeleton-item
              variant="image"
              style="width: 240px; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 200px" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                  margin-top: 16px;
                  height: 16px;
                  width: 240px;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </div>
          <div>
            <el-skeleton-item
              variant="image"
              style="width: 240px; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 200px" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                  margin-top: 16px;
                  height: 16px;
                  width: 240px;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </div>
          <div>
            <el-skeleton-item
              variant="image"
              style="width: 240px; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 200px" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                  margin-top: 16px;
                  height: 16px;
                  width: 240px;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template>
        <el-row :gutter="20">
          <!-- xs <768px ; sm ≥768px ; md ≥992px; lg ≥1200px;xl ≥1920px-->
          <el-col
            class="itnote"
            :xs="12"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            v-for="item in notesList"
            :key="item.id"
          >
            <transition
              appear
              name="animate__animated animate__bounce"
              enter-active-class="animate__backInDown"
              leave-active-class="animate__backOutUp"
            >
              <el-card :body-style="{ padding: '0px' }">
                <router-link :to="{ path: '/detail', query: { id: item.id } }">
                  <img src="../assets/picture/vue2.0.png" />
                </router-link>

                <div style="padding: 14px">
                  <router-link
                    :to="{ path: '/detail', query: { id: item.id } }"
                  >
                    <span>{{ item.title }}</span>
                  </router-link>

                  <div class="bottom clearfix">
                    <time class="time">{{
                      $moment(item.addTime).format("YYYY-MM-DD")
                    }}</time>
                  </div>
                </div>
              </el-card>
            </transition>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { getNotesList } from "@/http/api";
import "animate.css";
export default {
  data() {
    return {
      loading: true,
      currentDate: "2021-06-01",
      notesList: [],
    };
  },
  methods: {},
  mounted() {
    getNotesList().then((res) => {
      this.notesList = res.data;
      if (res.data.length) {
        this.loading = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.itnote {
  .el-card {
    margin-top: 20px;
    border-radius: 18px;
  }

  span {
    color: #16b5f0;
    cursor: pointer;

    &:hover {
      color: purple;
    }
  }
}

// <!-- xs <768px ; sm ≥768px ; md ≥992px; lg ≥1200px;xl ≥1920px-->

@media (max-width: 992px) {
  .el-card {
    height: 210px;
  }

  img {
    width: 100%;
    height: 150px;
  }

  span {
    font-size: 14px;
  }
}

@media (min-width: 992px) {
  .el-card {
    height: 400px;
  }

  img {
    width: 100%;
    height: 300px;
  }

  span {
    font-size: 24px;
  }
}
</style>