<template>
  <div class="searchBox">
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
          @click="historyShow()"
          @keydown.enter="enterKey"
        />
      </div>
    </div>
    <!-- 分类 -->
    <div class="classify">
      <!-- 横向 手动 轮播  -->
      <van-swipe
        :loop="false"
        :width="70"
        class="my-swpie"
        :show-indicators="false"
      >
        <!-- type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
     1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014:
      视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) -->
        <van-swipe-item>
          <div class="class" @click="SearchComprehensive">综合</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchSong">单曲</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchPlaylist">歌单</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchMV">MV</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchSinger">歌手</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchAlbum">专辑</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchLyrics">歌词</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchUser">用户</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="class" @click="SearchVideo">视频</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- searchHistory -->
    <div class="searchHistory" v-show="state.historyShow">
      <!-- 文字 历史 -->
      <span class="history">历史</span>
      <!-- 搜索历史 -->
      <span
        class="history-content"
        v-for="item in state.keyWorldList"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
      <!-- 删除 -->
      <svg class="delet" aria-hidden="true" @click="delHistory()">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <!-- 搜索结果 -->
    <div class="itemList">
      <!-- 单曲 -->
      <div class="songs">
        <music
          class="song"
          v-for="(song) in state.song"
          :song="song"
        ></music>
      </div>
      <!-- 歌单 -->
      <div class="playLists">
        <playList
          class="playList"
          v-for="item in state.playList"
          :item="item"
        ></playList>
      </div>
    </div>
  </div>
</template>
<script>
import { reqSearchMusic } from "@/API/index";
import { onMounted, reactive } from "vue";
import music from "@/components/list/music.vue";
import playList from "@/components/list/playList";
export default {
  name: "SearchView",
  components: { music, playList },
  setup() {
    const state = reactive({
      keyword: "",
      classifyId: 1018,
      historySearchList: [],
      keyWorldList: [],
      historyShow: true,
      song: [],
      playList: [],
    });
    function historyShow() {
      state.historyShow = true;
    }
    // 获取综合搜索结果
    function SearchComprehensive() {
      let data = state.keyword;
      reqSearchMusic(data, state.classifyId).then((res) => {
        console.log(res);
        state.song = res.result.song.songs;
        state.playList = res.result.playList.playLists;
        state.historyShow = false;
      });
    }
    // 历史记录重新搜索
    function searchHistory(value) {
      state.keyword = value;
      state.classifyId = 1018;
      SearchComprehensive();
    }
    // 获取音乐搜索结果
    function SearchSong() {
      reqSearchMusic(state.keyword, 1).then((res) => {
        console.log(res);
        state.song = res.result.songs;
        state.playList = [];
        console.log(state.playList);
      });
    }
    // 获取歌单搜索结果
    function SearchPlaylist() {
      reqSearchMusic(state.keyword, 1000).then((res) => {
        console.log(res);
        state.playList = res.result.playlists;
        state.song = [];
        console.log(state.playList);
      });
    }
    // 获取歌词搜索结果
    function SearchLyrics() {
      reqSearchMusic(state.keyword, 1006).then((res) => {
        console.log(res);
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
        localStorage.setItem(
          "keyWorldList",
          JSON.stringify(state.keyWorldList)
        );
        SearchComprehensive();
        state.historyShow = false;
      }
    }
    // 删除历史记录
    function delHistory() {
      localStorage.removeItem("keyWorldList");
      state.keyWorldList = [];
    }
    onMounted(() => {
      state.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
        ? JSON.parse(localStorage.getItem("keyWorldList"))
        : [];
    });
    return {
      state,
      enterKey,
      delHistory,
      historyShow,
      SearchComprehensive,
      searchHistory,
      SearchSong,
      SearchPlaylist,
      SearchLyrics,
    };
  },
};
</script>
<style lang="less" scoped>
.searchBox {
  width: 100%;
  height: 100vh;
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
  .classify {
    width: 100%;
    height: 5vh;
    .class {
      text-align: center;
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
    min-height: 70vh;
    max-height: 75vh;
    overflow-y: scroll;

    .songs {
      margin: 10px auto;
      width: 90%;
      background-color: #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      .song {
        width: 80%;
      }
    }
    .playLists {
      margin: 20px auto;
      width: 90%;
      background-color: #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      overflow: hidden;
      .playList {
        width: 80%;
      }
    }
  }
}
</style>
