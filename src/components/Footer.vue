<template>
  <!-- 音乐播放器 -->
  <!-- bug  歌曲名太长无法显示 songInfo 转到下一行 -->
  <div class="FooterMusic">
    <!-- 弹出框  歌曲详情页 播放界面  -->
    <van-popup
      v-model:show="show"
      closeable
      :style="{ width: '100%', height: '100vh' }"
      position="right"
      close-icon-position="top-left"
    >
      <PlayView
        :playingMusic="state.playingMusic"
        :musicPicUrl="state.musicPicUrl"
        :play="play"
        :next="next"
        :duration="state.duration"
        :isPlaying="isPlaying"
        :updateAudioTime="updateAudioTime"
      />
    </van-popup>
    <!-- 弹出框  播放列表 -->
    <van-popup
      v-model:show="showList"
      round
      :style="{ width: '100%', height: '60vh' }"
      position="bottom"
      close-icon-position="top-left"
    >
      <ListMusicDetail></ListMusicDetail>
    </van-popup>
    <!-- 歌曲封面 歌曲名 歌手-->
    <div class="footerLeft" @click="showPopup">
      <div class="songimg">
        <img :src="state.musicPicUrl" alt="" />
      </div>
      <div class="songInfo">
        <!-- 歌曲名 -->
        <span class="songName">{{ state.playingMusic.name }}</span>
        <span class="songAr">{{ state.playingMusic.ar[0].name }}</span>
      </div>
    </div>
    <!-- 歌曲操作按钮 -->
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-show="isPlaying" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-show="!isPlaying" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="showPopupList">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>
    <!-- 播放器 -->
    <audio ref="audio" 
      :src="playingMusicUrl" 
      @ended="next(1)"
      @canplay="canplaysong"></audio>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { mapMutations, mapState } from "vuex";
import { reqMusicDetail } from "@/API/index";
import PlayView from "@/components/music/PlayView.vue";
import ListMusicDetail from "./footer/ListMusicDetail.vue";
export default {
  name: "Footer",
  components: { PlayView ,ListMusicDetail},
  setup() {
    const state = reactive({
      playingId: "",
      playingMusic: { name: "音乐的力量", ar: [{ name: "" }] },
      musicPicUrl: "https://s1.ax1x.com/2022/09/24/xAJfFe.jpg",
      duration: 0,
    });
    const show = ref(false);
    const showList=ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const showPopupList = () =>{
      showList.value = true;
    }
    return {
      state,
      show,
      showList,
      showPopup,
      showPopupList
    };
  },
  computed: {
    ...mapState([
      "musicList",
      "playingIndex",
      "playingMusicUrl",
      "playingMusicId",
      "isPlaying",
      "ListMusicDetail",
    ]),
  },
  methods: {
    ...mapMutations(["updataCurrentTime", "updateisPlaying"]),
    play() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateisPlaying(true);
        this.updateTime(); //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.updateisPlaying(false);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    next(value) {
      let newIndex = this.playingIndex;
      let musicListLength = this.musicList.length;
      newIndex += value;
      if (newIndex == musicListLength) {
        newIndex = 0;
      }
      if (newIndex < 0) {
        newIndex = parseInt(musicListLength) - 1;
      }
      this.$store.commit("updatePlayListIndex", newIndex);
      this.$store.commit("updataPlayMusicId", this.musicList[newIndex]);
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updataCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    updateAudioTime:function(value){
      // this.$refs.audio.currentTime=value
    },
    canplaysong(){
      this.state.duration=this.$refs.audio.duration
    }
  },
  watch: {
    // 监听播放列表 如果播放列表发生变化
    playingMusicId: {
      handler(newValue, oldValue) {
        if (newValue == oldValue) {
          this.$refs.audio.loop = true;
        } else {
          this.state.playingId = newValue;
          reqMusicDetail(this.state.playingId).then((res) => {
            console.log(res);
            this.state.musicPicUrl = res.songs[0].al.picUrl;
            this.state.playingMusic = res.songs[0];
            console.log("正在播放   "+res.songs[0].name);
          });
          this.$store.dispatch("getPlayMuUrl", this.state.playingId);
          this.$refs.audio.autoplay = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.updateTime();
    console.log(this.ListMusicDetail);
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  position: sticky;
  // position: relative;
  bottom: 0px;
  width: 100%;
  height: 10vh;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .footerLeft {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 30px;
      overflow: hidden;
    }
    .songInfo {
      // margin-left: 1.5rem;
      width: 2.5rem;
      .songName {
        display: block;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .footerRight {
    display: flex;
    padding-right: 10px;
    .icon {
      margin-left: 10px;
      width: 0.6rem;
    }
  }
}
</style>
