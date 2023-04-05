<template>
  <!-- 评论 -->
  <div class="comment">
    <!-- 评论 -->
    <div class="userImg">
      <img :src="item.user.avatarUrl" alt="" />
    </div>
    <div class="commentContent">
      <!-- user信息 发布时间 点赞 -->
      <div class="user">
        <div class="userInfo">
          <p class="username">{{ item.user.nickname }}</p>
          <p class="commentTime">{{ item.timeStr }}</p>
        </div>
        <div class="like">
          <p>{{ item.likedCount }}</p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan"></use>
          </svg>
        </div>
      </div>
      <div class="content">
        <van-text-ellipsis rows="2" :content="item.content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["item"]
};
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  min-height: 1.5rem;
  display: flex;
  padding: 0.2rem .1rem;
  .userImg {
    width: 16%;
    display: flex;
    justify-content: center;
    padding-top: 0rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
  }
  .commentContent {
    width: 100%;
    padding-left: 5px;
    min-height: 100%;
    .user {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 0.5rem;
      .userInfo {
        display: flex;
        width: 100%;
        height: 0.5rem;
        .username {
          font-size: 14px;
        }
        .commentTime {
          padding-left: 10px;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 10px;
        }
      }
      .like {
        width: 120px;
        display: flex;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 12px;
        svg {
          height: 0.4rem;
          line-height: 0.5rem;
        }
      }
    }
    .content {
      width: 100%;
      min-height: 1rem;
      font-size: 14px;
      .van-text-ellipsis{
        width: 100%;
        height: 1rem;
      }
    }
  }
}
</style>
