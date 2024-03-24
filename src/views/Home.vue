<template>
  <div class="home">
    <!-- 側邊導航 -->
    <aside class="sidebar">
      <!-- 導航列表項 -->
      <nav>
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <!-- 其他列表項... -->
        </ul>
      </nav>
    </aside>

    <!-- 主內容 -->
    <section class="feed">
      <!-- 發文框 -->
      <div class="post-box">
        <textarea placeholder="What's happening?"></textarea>
        <button>Post</button>
      </div>

      <!-- 推文和動態 -->
      <div class="tweets">
        <!-- 動態列表 -->
      </div>
    </section>

    <!-- 趨勢和推薦 -->
    <aside class="trends">
      <!-- 趨勢列表 -->
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // 這裡可以加入腳本邏輯
};
</script>

<style scoped>
.home {
  display: flex;
}

.sidebar {
  /* 側邊欄樣式 */
}

.feed {
  /* 主要內容區樣式 */
}

.trends {
  /* 趨勢區塊樣式 */
}

/* 更多樣式... */
</style>
