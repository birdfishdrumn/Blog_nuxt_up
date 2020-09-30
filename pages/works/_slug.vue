<template>
  <v-container fluid class="brown lighten-5">
    <template v-if="currentPost">
      <!-- パンくずリスト -->
      <breadcrumbs :add-items="addBreads" />
      <!-- パンくずリスト -->
      <v-icon>mdi-calendar-range</v-icon
      >{{ formatDate(currentPost.fields.date) }}
      <h1 class="post-title font-bold">{{ currentPost.fields.title }}</h1>

      <v-img
        :src="setEyeCatch(currentPost).url"
        :alt="currentPost.fields.image.fields.title"
        :aspect-ratio="16 / 9"
        width="700"
        height="400"
        class="mx-auto"
      >
        <v-chip
          medium
          dark
          class="ml-2 mt-2"
          :color="categoryColor(currentPost.fields.category)"
        >
          {{ currentPost.fields.category.fields.name }}</v-chip
        >
      </v-img>

      <div class="mt-20 mb-20">{{ currentPost.fields.content }}</div>
    </template>

    <template v-else>お探しの記事は見つかりませんでした。</template>
    <v-chip
      v-for="tag in currentPost.fields.tags"
      :key="tag.sys.id"
      :to="linkTo('tags', tag)"
      small
      label
      outlined
      class="ma-1 black"
    >
      <v-icon left size="18" color="grey"> mdi-label </v-icon>
      {{ tag.fields.name }}
    </v-chip>
    <client-only>
      <share-btns :page-title="currentPost.fields.title" />
      <follow-btns />
    </client-only>
    <div>
      <v-btn outlined color="primary" to="/">
        <v-icon size="16">fas fa-angle-double-left</v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import shareBtns from "~/components/ui/shareBtns"; // 追記
import followBtns from "~/components/ui/followBtns";
import { mapGetters } from "vuex";
export default {
  components: {
    shareBtns,
    followBtns,
  },
  methods: {
    formatDate(iso) {
      const date = new Date(iso);
      const yyyy = new String(date.getFullYear());
      const mm = new String(date.getMonth() + 1).padStart(2, "0");
      const dd = new String(date.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    },
  },
  async asyncData({ payload, store, params, error }) {
    const currentPost = await store.state.works.find(
      (work) => work.fields.slug === params.slug
    );
    if (payload) {
      return {
        currentPost,
        category: currentPost.fields.category, // 追記
      };
    }
    if (currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category, // 追記
      };
    } else {
      return error({ statusCode: 400 });
    }
  },
  // mounted: function () {
  //   console.log(payload);
  // },
  computed: {
    ...mapGetters(["setEyeCatch", "linkTo"]),
    categoryColor() {
      return (category) => {
        switch (category.fields.name) {
          case "スズカ":
            return "#C73A31";
          case "風鈴":
            return "#236244";
          case "ぬいぐるみ":
            return "primary";
          default:
            return "grey darken-3";
        }
      };
    },
    addBreads() {
      return [
        {
          icon: "mdi-folder-outline",
          text: this.category.fields.name,
          to: this.linkTo("categories", this.category),
        },
      ];
    },
  },
};
</script>
<style scoped>
.post-title {
  font-size: 1.3rem;
  text-align: center;
  margin: 20px 0;
}
</style>
