<template>
  <!-- 歌单详情 -->
  <!-- 返回键 歌单标题 -->
  <div class="playListName">
    <!-- 返回键 -->
    <div class="return" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <!-- 歌单标题 -->
    <span>歌单</span>
  </div>
  <!-- 歌单简介 -->
  <div class="PlayListDetail">
    <!-- 歌单封面 播放量 歌单标题 作者 -->
    <div class="info">
      <div class="coverImg">
        <img :src="state.detail.coverImgUrl" alt="" />
        <span class="playCount">
          {{ changeCount(state.detail.playCount) }}
        </span>
      </div>
      <div class="listInfo">
        <div class="name">{{ state.detail.name }}</div>
        <div class="artist">
          xzkk
        </div>
      </div>
    </div>
    <!-- 歌单介绍 -->
    <div class="introduce">
      <van-text-ellipsis :content="state.detail.description" />
    </div>
  </div>
  <!-- 歌单操作  播放全部 -->
  <div class="control">
    <!-- playAll -->
    <div class="playAll">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <span>播放全部</span>
    </div>
  </div>
  <!-- 歌单歌曲 -->
  <div class="playList">
    <music v-for="(song, i) in state.songs" :song="song" :i="i"></music>
  </div>
</template>
<script>
import { reqSongListDetail, reqSongList } from "@/API/index";
import { reactive } from "vue";
import music from "@/components/list/music.vue"
export default {
  name: "playList",
  components:{music},
  setup() {
    const state = reactive({
      songs: [],
      detail: {},
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return {
      state,
      changeCount,
    };
  },
  mounted() {
    // 获取歌单详情
    reqSongListDetail(this.$route.query.id).then((res) => {
      this.state.detail = res.playlist;
      // console.log(this.state.detail);
    });
    // 获取歌单音乐列表
    reqSongList(this.$route.query.id).then((res) => {
      this.state.songs = res.songs;
      // console.log(this.state.songs);
    });
    
  },
  methods:{
    playMusicSon(song){
      this.$store.commit("updataPlayMusicId",song.id)
      this.$store.commit("updateisPlaying",true)
      this.$store.commit("pushMusicList",song.id)
      this.$store.commit("")
    }
  }
};
</script>

<style lang="less" scoped>
.playListName {
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  .return {
    width: 1rem;
    height: 1rem;
    display: flex;
    .icon {
      margin: auto;
    }
  }
  span{
    font-size: 24px;
    font-weight: 600;
  }
}
.PlayListDetail {
  width: 100%;
  height: 20vh;
  .info {
    width: 100%;
    height: 15vh;
    display: flex;
    .coverImg {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      border-radius: 10%;
      overflow: hidden;
      margin:0 10px;
      img {
        margin: auto;
        width: 100%;
      }
      .playCount {
        font-size: 14px;
        position: absolute;
        z-index: 100;
        right: 0.2rem;
        color: white;
        margin-top: 0.06rem;
      }
    }
    .listInfo {
      .name{  
        font-size: 20px;
      }
      .artist{
        padding: 10px ;
      }
    }
  }
  .introduce {
    width: 100%;
    height: 5vh;
    padding: 10px 10px;
  }
}
.control {
  width: 100%;
  height: 7vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  .playAll{
    height: 60%;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: rgb(240, 238, 238);
    margin: 0 20px;
    padding: 5px;
    .icon{
      width: 0.6rem;
      padding: 0 5px;
      
    }
    span{
      padding: 0px 5px;
    }
  }
}
.playList {
  width: 100%;
  height: 55vh;
  overflow: scroll;
  padding: 0.2rem;
}
</style>
