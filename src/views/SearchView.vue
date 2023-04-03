<template>
  <!-- 搜索输入框 返回按键 -->
  <div class="input-search">
    <!-- 返回按钮 -->
    <div class="return" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <!-- 输入框 -->
    <div class="input">
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="state.keyword"
        @keydown.enter="enterKey"
      />
    </div>
  </div>
  <!-- searchHistory -->
  <div class="searchHistory">
    <!-- 文字 历史 -->
    <span class="history">历史</span>
    <!-- 搜索历史 -->
    <span class="history-content" v-for="item in state.keyWorldList" @click="getSearch(item)"> {{ item}} </span>
    <!-- 删除 -->
    <svg class="delet" aria-hidden="true" @click="delHistory()">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <!-- 搜索结果 -->
  <div class="itemList">
    <song v-for="(song,i) in state.searchList" :song="song" :i="i"></song>
  </div>
</template>
<script>
import { reqSearchMusic } from "@/API/index";
import { onMounted, reactive } from "vue";
import song from "@/components/list/song.vue"
export default {
  name: "SearchView",
  components:{song},
  setup() {
    const state = reactive({
      keyword: "",
      historySearchList: [],
      searchList: [],
      keyWorldList: [],
    });
    // 获取搜索结果
    function getSearch(value) {
      let data = state.keyword || value;
      reqSearchMusic(data).then((res) => {
        state.searchList = res.result.songs;
        console.log(res.result.songs);
      });
    }
    // 搜索键
    function enterKey() {
      if (state.keyword !== "") {
        state.keyWorldList.unshift(state.keyword);
        //   去重
        state.keyWorldList = [...new Set(state.keyWorldList)];
        // 固定长度
        if (state.keyWorldList.length > 10) {
          state.keyWorldList.splice(state.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(state.keyWorldList));
        getSearch();
        state.keyword = "";
      }
    }
    // 删除历史记录
    function delHistory() {
      localStorage.removeItem("keyWorldList");
      state.keyWorldList = [];
    }
    onMounted(()=>{
      state.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
    })
    return {
      state,
      enterKey,
      delHistory,
      getSearch
    };
  },
  
};
</script>
<style lang="less" scoped>
.input-search {
  display: flex;
  width: 100%;
  height: 10vh;
  padding: 0 0.2rem;
  align-items: center;
  .input {
    width: 90%;
    input {
      margin-left: 0.2rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      padding: 0.1rem;
    }
  }
}
.searchHistory {
  position: relative;
  width: 100%;
  height: 5vh;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  .history {
    font-size: 18px;
    font-weight: 800;
  }
  .history-content {
    height: 24px;
    line-height: 24px;
    padding: 0 6px;
    border-radius: 12px;
    background-color: #ccc;
    margin-left: 0.2rem;
  }
  .delet {
    position: absolute;
    width: 36px;
    bottom: -40px;
    right: 2px;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
  height: 75vh;
  overflow-y: scroll;
}
</style>
