<template>
  <div class="item" @click="playMusic(songD)">
    <div class="itemInfo">{{ songD.mname }}<span>-{{ songD.aname }}</span></div>
    <div class="delete">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-cha"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["songD"],
  methods:{
    playMusic(song) {
      console.log(song);
      this.$store.commit("updataPlayMusicId", song.songid);
      this.$store.commit("updateisPlaying", true);
    },
  }
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  height: 1.2rem;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 0 0.4rem;
  .itemInfo {
    font-size: 16px;
    span {
      font-size: 10px;
    }
  }
  .delete{
    width: 20px;
    svg{
        width: 100%;
    }
  }
}
</style>
