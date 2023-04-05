<template>
  <!-- 首页 -->
  <!-- 头部导航栏 -->
  <Header v-show="$route.meta.HeaderShow"></Header>
  <!-- 主体显示区域 -->
  <!-- 默认界面发现音乐 搜索界面 seeting界面 个人界面 -->
  <router-view></router-view>
  <Footer v-show="$route.meta.FooterShow"></Footer>
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  export default{
    name:"App",
    components:{Header,Footer},
    
  }
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
}
.icon {
  width: 0.8rem;
  height: 0.8rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
