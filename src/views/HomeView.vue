<template>
  <!-- 默认主体部分 发现音乐 -->
  <div class="HomeView">
    <!-- 轮播图 -->
    <div class="banner-box">
      <van-swipe :autoplay="4000" lazy-render :show-indicators="false">
        <van-swipe-item v-for="image in state.list" :key="image">
          <img :src="image.imageUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 推荐导航栏 -->
    <div class="like-nav">
      <!-- 每日推荐 -->
      <div class="like">
        <!-- 图标 -->
        <div class="like-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-meirituijian"></use>
          </svg>
        </div>
        <!-- 图标下面的文字 -->
        <div class="like-txt">每日推荐</div>
      </div>
      <!-- 每日推荐 -->
      <div class="like">
        <!-- 图标 -->
        <div class="like-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sirenFM"></use>
          </svg>
        </div>
        <!-- 图标下面的文字 -->
        <div class="like-txt">私人FM</div>
      </div>
      <!-- 每日推荐 -->
      <div class="like">
        <!-- 图标 -->
        <div class="like-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
          </svg>
        </div>
        <!-- 图标下面的文字 -->
        <div class="like-txt">歌单</div>
      </div>
      <!-- 每日推荐 -->
      <div class="like">
        <!-- 图标 -->
        <div class="like-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daochu1024-02"></use>
          </svg>
        </div>
        <!-- 图标下面的文字 -->
        <div class="like-txt">排行榜</div>
      </div>
    </div>
    <!-- 发现好歌单 -->
    <MusicList></MusicList>
    <MusicList></MusicList>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { reqBannerList } from "../API/index";
import MusicList from '@/components/home/MusicList'
export default {
  name: "Home",
  components:{MusicList},
  setup() {
    const state = reactive({
      list: [],
    });
    // 调取api获取数据
    const getNewsList = () => {
      reqBannerList().then((res) => {
        state.list = res.banners;
      });
    };
    onMounted(getNewsList);
    // ...toRefs()将state里面得对象解构
    return {
      state,
    };
  },
};
</script>

<style lang="less">
.HomeView {
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  // 轮播图
  .banner-box {
    height: 2.6rem;
    width: 95%;
    margin: 2px auto;
    border-radius: 0.1rem;
    overflow: hidden;
    .van-swipe {
      width: 100%;
      .van-swipe__track {
        .van-swipe-item {
          width: 100%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  // 推荐导航栏 like-nav
  .like-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .like {
      flex: 25%;
      margin: 10px;
      height: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .like-icon{
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
