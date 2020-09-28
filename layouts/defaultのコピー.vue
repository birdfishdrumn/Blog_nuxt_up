<template>
  <div>
    <Navbar></Navbar>
    <div class="l-container">
      <div class="l-main">
        <nuxt />
      </div>
      <div class="l-sidebar">
        <my-sidebar />
      </div>
    </div>
    <my-footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
// サイドバーのコンポーネント (あとで作成)
import MySidebar from "~/components/Sidebar.vue";
export default {
  //　レイアウト名を設定
  components: {
    Navbar,
    MySidebar
  }
};
</script>

<style>
.l-container {
  padding-top: 80px;
  padding-bottom: 80px;
  overflow: hidden;
  max-width: 100%;
  margin-left: 2%;
  margin-right: 2%;
}
.l-main {
  width: 70%;
  float: left;
}
.l-sidebar {
  float: right;
  width: 20%;
}
</style>
