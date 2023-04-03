<template>
  <div class="item">
    <!-- 结果标记 -->
    <span>{{ i + 1 }}</span>
    <!-- 歌曲名 歌手  -->
    <div class="songInfo" @click="playMusicSon(song)">
      <div class="song-name">{{ song.name }}</div>
      <div class="singer">{{ song.ar[0].name }}</div>
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
export default {
  props: ["song", "i"],
  methods: {
    playMusicSon(song) {
      this.$store.commit("updataPlayMusicId", song.id);
      this.$store.commit("updateisPlaying", true);
      this.$store.commit("pushMusicList", song.id);
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
