<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.name }}</h1>
    <div v-for="(work, i) in relatedPosts" :key="i">
      {{ work.fields.title }}
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ payload, params, error, store, env }) {
    const tag =
      payload || store.state.tags.find(tag => tag.fields.slug === params.slug);
    if (tag) {
      // 追記
      const relatedPosts = store.getters.associatePosts(tag);
      return { tag, relatedPosts }; // relatedPostsの追記
    } else {
      error({ statusCode: 400 });
    }
  },
  computed: {
    addBreads() {
      return [{ icon: "mdi-tag-outline", text: "タグ一覧", to: "/tags" }];
    }
  }
};
</script>
