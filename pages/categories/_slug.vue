<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <v-container fluid>
      <h1>カテゴリー：{{ category.fields.name }}</h1>
      <v-row>
        <v-col cols="12" sm="12" md="12" xl="12">
          <v-row>
            <v-col
              v-for="(work, i) in relatedPosts"
              :key="i"
              cols="12"
              sm="6"
              lg="6"
              xl="6"
            >
              <v-card color="blue lighten-4" max-width="500" class="mx-auto">
                <v-img
                  :src="setEyeCatch(work).url"
                  :alt="work.fields.image.fields.title"
                  :aspect-ratio="16 / 9"
                  max-height="200"
                  class="white--text"
                >
                  <v-card-text>
                    <v-chip
                      small
                      dark
                      :color="categoryColor(work.fields.category)"
                    >
                      {{ work.fields.category.fields.name }}
                    </v-chip>
                  </v-card-text>
                </v-img>
                <v-card-title class="align-end fill-height font-weight-bold">{{
                  work.fields.title
                }}</v-card-title>
                <v-card-text text color="white">
                  {{ formatDate(work.fields.date) }}
                  <span :is="draftChip(work)" />
                </v-card-text>

                <v-list-item three-line style="min-height: unset">
                  <v-list-item-subtitle>{{
                    work.fields.content
                  }}</v-list-item-subtitle>
                </v-list-item>

                <v-card-actions>
                  <v-spacer />
                  <!-- linkToの引数はstoteの方で二つ取っている為、('xx',xx)というように分けてあげる必要がある。 -->
                  <v-btn text color="primary" :to="linkTo('works', work)"
                    >この記事をみる</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"; // 追記
import draftChip from "~/components/works/draftChip";
export default {
  components: {
    draftChip,
  },
  async asyncData({ payload, store, params, error }) {
    const category = await store.state.categories.find(
      (cat) => cat.fields.slug === params.slug
    );
    if (payload) {
      return { category };
    }
    if (category) {
      return { category };
    } else {
      return error({ statusCode: 400 });
    }
  },
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category);
    },
    ...mapState(["works"]), // 追記
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"]), // 追記
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
      return [{ icon: "mdi-tag-outline", text: "カテゴリー一覧" }];
    },
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
};
</script>
