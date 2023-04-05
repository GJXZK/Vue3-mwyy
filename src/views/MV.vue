<template>
  <!-- MV界面 -->
  <div class="VideoBox">
    <video :src="state.MVUrl" controls autoplay="true"></video>
    <div class="return" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui1"></use>
      </svg>
    </div>
  </div>
  <!-- MV详情 -->
  <div class="videoInfo">
    <div class="artist">
      <!-- 圓形头像 -->
      <div class="arimg">
        <img :src="state.MVDetail.artists[0].img1v1Url" alt="" />
      </div>
      <div class="arinfo">
        <p class="arname">{{ state.MVDetail.artistName }}</p>
        <p class="araffect">110万</p>
      </div>
    </div>
    <div class="music">
      <p class="music-name">{{ state.MVDetail.name }}</p>
      <!-- <p class="music-desc">{{ state.MVDetail.desc }}</p> -->
      <van-text-ellipsis class="music-desc" rows="1" :content="state.MVDetail.desc" />
      <p class="music-playCount">
        {{ state.MVDetail.playCount }}次观看
        {{ state.MVDetail.publishTime }}发布
      </p>
    </div>
  </div>
  <!-- MV评论 -->
  <div class="videoComments">
    <div class="commentsHeader">
      <p>评论区</p>
    </div>
    <div class="comments">
      <comment v-for="(item) in this.state.MVComments" :item="item"></comment>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { reqMVComments, reqMVDetail, reqMVUrl } from "@/API/index";
import comment from "@/components/list/comment.vue"
export default {
  components:{
    comment
  },
  setup() {
    const state = reactive({
      MVId: "",
      MVDetail: { artists: [{ img1v1Url: "" }], desc: "" },
      MVUrl: "",
      MVComments:[]
    });
    return {
      state,
    };
  },
  mounted() {
    console.log(this.$route.query.mvid);
    this.state.MVId = this.$route.query.mvid;
    reqMVDetail(this.state.MVId).then((res) => {
      this.state.MVDetail = res.data;
    });
    reqMVUrl(this.state.MVId).then((res) => {
      this.state.MVUrl = res.data.url;
    });
    reqMVComments(this.state.MVId).then((res) => {
      console.log(res);
      this.state.MVComments=res.hotComments
    });
  },
};
</script>

<style lang="less" scoped>
.VideoBox {
  width: 100%;
  height: 25vh;
  position: relative;
  background-color: #09010c;
  z-index: 0;
  video {
    position: absolute;
    width: 100%;
    height: 25vh;
    z-index: 2;
    // webkit-filter:grayscale(100%)
  }
  .return {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    svg {
      margin: auto;
    }
  }
}
.videoInfo {
  width: 100%;
  height: 20vh;
  background-color: pink;
  .artist {
    width: 80%;
    height: 10vh;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .arimg {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 0.6rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        width: 130%;
      }
    }
    .arinfo {
      margin-left: 20px;
    }
  }
  .music {
    width: 80%;
    height: 10vh;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.videoComments {
  width: 100%;
  .commentsHeader {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    p {
      padding-left: 20px;
      font-size: 16px;
    }
  }
  .comments {
    width: 100%;
  }
}
</style>
