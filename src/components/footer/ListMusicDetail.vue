<template>
  <!-- 当前播放列表 -->
  <div class="listMusicDetail">
    <div class="nowPlayList">
      <h2>当前播放</h2>({{ ListMusicDetail.length }})
    </div>
    <!-- 列表控制器 -->
    <div class="control">

    </div>
    <!-- 列表 -->
    <ListMusic v-for="(item) in ListMusicDetail" :songD="item"></ListMusic>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListMusic from '../list/ListMusic.vue';
export default {
    components:{ListMusic},
    computed:{
        ...mapState(["ListMusicDetail"])
    },
    mounted() {
      console.log(this.ListMusicDetail);  
    },
}
</script>

<style lang="less" scoped>
  .listMusicDetail{
    background-color: rgb(25, 25, 25);
    color: #fff;
    margin: 0 auto;
    z-index: 100;
    .nowPlayList{
      display: flex;
      height: 0.8rem;
      align-items: center;
      padding: 0 0.4rem;
    }
    .control{
      background-color: #ccc;
      width: 100%;
      height: 5vh;
    }
  }
</style>