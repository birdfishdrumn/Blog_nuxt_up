<template>
  <div class="nav-block justify-between ">
    <div class="logo">LOGO</div>
    <v-spacer />
    <search-form />
    <div>
      <ul class="nav">
        <nuxt-link to="/profile">
          <li>Profile</li>
        </nuxt-link>
        <nuxt-link to="/youtube">
          <li>Youtube</li>
        </nuxt-link>

        <!-- eslint-disable no-unused-vars  -->
        <nuxt-link to="/">
          <li>Blogs</li>
        </nuxt-link>
        <!-- eslint-disable no-unused-vars  -->
        <nuxt-link to="/contact">
          <li>Contact</li>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.nav-block {
  text-align: left;
  display: inline-block;
  display: flex;
}
.logo {
  margin: 10px;
  font-size: 1.25rem;
}
.nav {
  display: flex;
  list-style: none;
}

.nav li {
  margin: 10px 20px 0;
  font-size: 1.25rem;
}
</style>
