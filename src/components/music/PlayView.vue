<template>
  <!-- 点击下方播放器 从下到上弹出这个组件 -->
  <div class="musicBox">
    <img class="bg-blur" :src="musicPicUrl" alt="">
    <!-- 歌曲的详情  歌词 进度条 -->
    <div class="musicName">
      {{ playingMusic.name }}({{ playingMusic.ar[0].name }})
    </div>
    <!-- 动态播放图片  喜欢操作栏 -->
    <div class="detailContent" v-show="!isLyricShow">
      <!-- 动态播放图 -->
      <div class="musicPlayImg">
        <!-- 尖 -->
        <img
          src="@/assets/needle-ab.png"
          alt=""
          class="img_needle"
          :class="{ img_needle_active: isPlaying }"
        />
        <!-- 碟 -->
        <img src="@/assets/cd.png" alt="" class="img_cd" />
        <!-- 图 -->
        <img
          :src="musicPicUrl"
          alt=""
          class="img_ar"
          @click="isLyricShow = true"
          :class="{ img_ar_active: isPlaying, img_ar_pauesd: !isPlaying }"
        />
      </div>
      <!-- 喜欢 评论 更多 -->
      <div class="music-like">
        <!-- 喜欢 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
        <!-- 评论 -->
        <svg class="icon" aria-hidden="true" @click="showPopup">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <van-popup
          v-model:show="show"
          closeable
          :style="{ width: '100%', height: '90%' }"
          position="bottom"
          close-icon-position="top-left"
          ><musicComment :playingMusicId="playingMusicId"></musicComment>
        </van-popup>
        <!-- 其他 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qita"></use>
        </svg>
      </div>
    </div>
    <!-- 歌词部分 -->
    <div
      class="musicLyric"
      ref="musicLyric"
      v-show="isLyricShow"
      @click="isLyricShow = false"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <input
        ref="progress"
        id="progress"
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
        @change="changeBar"
        @input="inputBar"
      />
    </div>
    <!-- 音乐控制器 -->
    <div class="musicCrtl">
      <div class="turn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danquxunhuan"></use>
        </svg>
      </div>
      <!--上一曲 下一曲 播放 暂停  -->
      <div class="bnpp">
        <!-- 上一曲 -->
        <svg class="icon" aria-hidden="true" @click="next(-1)">
          <use xlink:href="#icon-diyiyeshouyeshangyishou"></use>
        </svg>
        <!-- 播放 -->
        <svg class="icon" aria-hidden="true" v-show="!isPlaying" @click="play">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <!-- 暂停 -->
        <svg class="icon" aria-hidden="true" v-show="isPlaying" @click="play">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <!-- 下一曲 -->
        <svg class="icon" aria-hidden="true" @click="next(1)">
          <use xlink:href="#icon-zuihouyiyemoyexiayishou"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ref } from "vue";
import musicComment from "@/components/music/musicComment";
export default {
  name: "playview",
  components: { musicComment },
  setup() {
    let isLyricShow = ref(false);
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    return {
      isLyricShow,
      show,
      showPopup,
    };
  },
  props: [
    "playingMusic",
    "musicPicUrl",
    "play",
    "next",
    "duration",
    "isPlaying",
    "updateAudioTime"
  ],
  computed: {
    ...mapState(["currentTime", "playingMusicId","musicList", "lyricList"]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  methods: {
    changeBar() {
      let range=document.getElementById('progress')
      this.updateAudioTime(range.value)
    },
    inputBar() {
      console.log("inputBar");
    },
  },
  watch: {
    playingMusicId: {
      handler(newValue) {
        this.$store.dispatch("reqMusicLyric", newValue);
      },
    },
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.musicList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  mounted() {
    this.$store.dispatch("reqMusicLyric", this.playingMusicId);
  },
};
</script>
<style lang="less" scoped>
.musicBox {
  width: 100%;
  // height: 100vh;
  position: relative;
  .bg-blur{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -99;
    filter: blur(300px);
  }
  .musicName {
    width: 100%;
    height: 8vh;
    line-height: 7vh;
    text-align: center;
    font-size: 18px;
    
  }
  .detailContent {
    width: 100%;
    height: 70vh;
    z-index: 99;
    .musicPlayImg {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 60vh;
      //尖
      .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 55%;
        transform-origin: 0 0;
        transform: rotate(-5deg);
        transition: all 2s;
      }
      .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 49%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
      }
      // 碟
      .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: 1.3rem;
        z-index: -1;
      }
      // 图
      .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        top: 2.14rem;
        animation: rotate_ar 10s linear infinite;
      }
      .img_ar_active {
        animation-play-state: running;
      }
      .img_ar_pauesd {
        animation-play-state: paused;
      }
      @keyframes rotate_ar {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
    .music-like {
      display: flex;
      justify-content: space-around;
    }
  }
  .musicLyric {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    p {
      color: rgb(255, 254, 254);
      margin-bottom: 0.3rem;
    }
    .active {
      font-size: 0.5rem;
      color: rgb(61, 60, 60);
    }
  }
  .progress {
    width: 90%;
    margin: 6px auto;
    .range {
      width: 100%;
      height: 0.06rem;
    }
  }
  .musicCrtl {
    width: 100%;
    height: 20vh;
    display: flex;
    align-items: center;
    position: relative;
    .turn {
      position: absolute;
      left: 9%;
    }
    .bnpp {
      position: absolute;
      width: 50%;
      display: flex;
      justify-content: space-around;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
