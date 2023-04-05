<template>
  <div class="cHeader">评论({{ state.AllComment.total }})</div>
  <div class="select">
    <div class="zHot" @click="hot()">最热</div>
    <div class="zNew" @click="bnew()">最新</div>
  </div>
  <div class="comments">
    <comment v-for="(item) in state.commentsList" :item="item"></comment>
  </div>
</template>

<script>
import {reactive} from 'vue'
import comment  from '@/components/list/comment.vue';
import {reqMusicComment} from "@/API/index"
export default {
  setup(){
    const state = reactive({
      AllComment:{},
      commentsList:[]
    });
    return {state}
  },
  props:["playingMusicId"],
  components:{comment},
  methods:{
    bnew(){
      this.state.commentsList=this.state.AllComment.comments
    },
    hot(){
      this.state.commentsList=this.state.AllComment.hotComments
    }
  },
  mounted() {
    reqMusicComment(this.playingMusicId).then((res)=>{
      this.state.AllComment=res
      this.state.commentsList=res.hotComments
    })
  },
};
</script>

<style lang="less" scoped>
.cHeader {
  position: relative;
  width: 100%;
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  font-size: 18px;
}
.select {
  width: 100%;
  height: 0.4rem;
  display: flex;
  
  div {
    padding-left: 10px;
    font-size: 10px;
  }
}
.comments{
  width: 100%;
}
</style>
