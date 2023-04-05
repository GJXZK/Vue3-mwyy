<template>
  <!-- 发现音乐  标题 查看更多-->
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <!-- 发现音乐  内容 -->
    <div class="musicContent">
      <!-- 横向 手动 轮播  -->
      <van-swipe
        :loop="false"
        :width="130"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/songlist', query: { id: item.id } }">
            <!-- 图片 -->
            <img :src="item.picUrl" alt="" />
            <!-- 图片右上角播放量 -->
            <span class="playCount">
              {{ changeCount(item.playCount) }}
            </span>
            <!-- 歌单标题 -->
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { reqPersonalized } from "@/API/index";
import { onMounted, reactive } from "vue";
export default {
  name: "MusicList",
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    const get = () => {
      reqPersonalized().then((res) => {
        state.musicList = res.result;
      });
    };
    onMounted(get);
    return {
      state,
      changeCount,
    };
  },
};
</script>
<style lang="less" scoped>
// 发现歌单部分 高度5rem
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  a {
    text-decoration: none;
  }
  // 发现歌单头部标题 查看更多 高度0.6rem
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    // 文字 发现好歌单
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    // 文字 更多音乐
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  // 歌单具体内容 高度 3.6rem 横向轮播
  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        color:rgb(37, 36, 36);
        bottom: 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
