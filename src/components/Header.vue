<template>
  <!-- 头部盒子 -->
  <div class="box">
    <!-- 列表seting -->
    <!-- 方块盒子  包含一个图标 -->
    <div class="list">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <!-- 搜索栏  点击进去搜索界面 -->
    <div class="search">
      <!-- 搜索栏 黑边框 加角度 -->
      <div class="search-box">
        <router-link to="/search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </router-link>
      </div>
    </div>
    <!-- user -->
    <div class="user">
      <!-- 圆形头像 -->
      <div class="user-box">
        <router-link to="/user">
          <img src="https://s1.ax1x.com/2022/09/24/xAJfFe.jpg" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  setup() {},
};
</script>

<style lang="less">
.box {
  position: relative;
  width: 100%;
  height: 10vh;
  display: flex;
  .list {
    display: flex;
    width: 18%;
    height: 100%;
    svg {
      margin: auto;
    }
  }
  .search {
    display: flex;
    width: 64%;
    height: 100%;
    .search-box {
      width: 90%;
      height: 30px;
      border: 0.05rem solid rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      margin: auto;
      svg {
        height: 30px;
        // line-height: 80px;
      }
    }
  }
  .user {
    display: flex;
    width: 18%;
    height: 100%;
    .user-box {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      margin: auto;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
}
</style>
