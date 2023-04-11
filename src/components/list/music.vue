<template>
  <div class="item">
    <!-- 结果标记 歌手名 ar -->
    <!-- <span>{{ i + 1 }}</span> -->
    <!-- 歌曲名 歌手  -->
    <div class="songInfo" @click="playMusicSon(song)">
      <!-- <div class="song-name">{{ song.name }}</div>
      <div class="singer">{{ name}}</div> -->
      <van-text-ellipsis :content="musictext"
        rows="1"
      />
    </div>
    <div class="others">
      <!-- MV  有mv就显示 没有不显示 -->
      <div class="song-mv" v-show="mvid">
        <router-link :to="{
          path:'MV',
          query:{
            mvid:mvid
          }
        }">
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
  props: ["song"],
  setup(){
    const state=reactive({
      name:"",
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
    },
    musictext(){
      return this.song.name+"-"+this.name
    },
    mvid(){
      if('mv' in this.song){
        return this.song.mv
      }else{
        return this.song.mvid
      }
    }
  },
  methods: {
    playMusicSon(song) {
      console.log(song);
      this.$store.commit("updataPlayMusicId", song.id);
      this.$store.commit("updateisPlaying", true);
      this.$store.commit("pushMusicList", song.id);
      console.log(song);
      let songDetail={mname:this.song.name,aname:this.name,songid:this.song.id}
      console.log(songDetail);
      this.$store.commit("pushListMusicDetail",songDetail)
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
    // .song-name {
    //   font-size: 18px;
    //   font-weight: 560;
    // }
    // .singer {
    //   font-size: 10px;
    //   font-weight: 300;
    // }
    width: 200px;
    height: 30px;
  }
  .others {
    position: absolute;
    right: 0.1rem;
    width: 1.2rem;
    height: 100%;
    .song-mv {
      position: absolute;
      left: 0px;
      height: 1.2rem;
      line-height: 1.6rem;
      .icon {
        width: 20px;
      }
    }
    .more {
      height: 1.2rem;
      line-height: 1.6rem;
      position: absolute;
      right: 0px;
      .icon {
        width: 25px;
      }
    }
  }
}
</style>
