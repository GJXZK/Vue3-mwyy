<template>
  <div class="item">
    <!-- 结果标记 歌手名 ar -->
    <!-- <span>{{ i + 1 }}</span> -->
    <!-- 歌曲名 歌手  -->
    <div class="songInfo" @click="playMusicSon(song)">
      <div class="song-name">{{ song.name }}</div>
      <div class="singer">{{ name}}</div>
    </div>
    <div class="others">
      <!-- MV  有mv就显示 没有不显示 -->
      <div class="song-mv" v-show="song.mvid">
        <router-link to="/MV">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mv1"></use>
          </svg>
        </router-link>
      </div>
      <!-- more 更多操作 -->
      <div class="more">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  props: ["song", "i"],
  setup(){
    const state=reactive({
      name:""
    })
    return {state}
  },
  computed:{
    name(){
      if('ar' in this.song){
        return this.song.ar[0].name
      }else{
        return this.song.artists[0].name
      }
    }
  },
  methods: {
    playMusicSon(song) {
      this.$store.commit("updataPlayMusicId", song.id);
      this.$store.commit("updateisPlaying", true);
      this.$store.commit("pushMusicList", song.id);
      console.log("播放歌曲    "+song.name);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  height: 1.2rem;
  span {
    width: 0.6rem;
  }
  .songInfo {
    .song-name {
      font-size: 18px;
      font-weight: 560;
    }
    .singer {
      font-size: 10px;
      font-weight: 300;
    }
  }
  .others {
    position: absolute;
    right: 0.1rem;
    width: 1.2rem;
    height: 100%;
    .song-mv {
      position: absolute;
      left: 0px;
      .icon {
        width: 20px;
      }
    }
    .more {
      position: absolute;
      right: 0px;
      .icon {
        width: 25px;
      }
    }
  }
}
</style>
