<template>
  <!-- 歌单 -->
  <div class="playList" @click="toPlayList">
    <div class="playListImg">
      <img :src="item.coverImgUrl" alt="" />
    </div>
    <div class="playListDetail">
      <div class="playListName">
        <van-text-ellipsis :content="item.name" />
      </div>
      <div class="playListInfo">{{ item.trackCount }}首，by {{ item.creator.nickname }}，播放{{ item.playCount }}次</div>
      <!-- <div class="playListInfo">{{ item.trackCount }}首，by {{ item.creator.nickname }}，播放1</div> -->

    </div>
  </div>
</template>

<script>
export default {
    props:["item"],
    methods:{
        toPlayList(){
            this.$router.push({path:'/songlist',query:{id:this.item.id}})
        }
    },
};
</script>

<style lang="less" scoped>
.playList {
  height: 1.2rem;
  margin: 10px auto;
  display: flex;
  .playListImg {
    width: 2rem;
    height: 1.2rem;
    overflow: hidden;
    img {
      width: 80%;
    }
  }
  .playListDetail {
    width: 100%;
    .playListName {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 18px;
    }
    .playListInfo {
      font-size: 12px;
    }
  }
}
</style>
