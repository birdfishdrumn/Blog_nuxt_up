<template>
  <v-container class="brown lighten-5">
    <v-row>
      <v-col cols="12" sm="12" md="12" xl="12">
        <v-row v-if="works.length">
          <v-col
            v-for="work in displayLists"
            :key="work.sys.id"
            cols="12"
            sm="6"
            lg="6"
            xl="6"
          >
            <v-card color="blue lighten-4" max-width="500" class="mx-0.2">
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
                    :to="linkTo('categories', work.fields.category)"
                    class="category-chip font-weight-bold"
                  >
                    {{ work.fields.category.fields.name }}
                  </v-chip>
                </v-card-text>
              </v-img>
              <v-card-text text color="white" class="date">
                <v-icon>mdi-calendar-range</v-icon>
                {{ formatDate(work.fields.date) }}
                <span :is="draftChip(work)" />
              </v-card-text>
              <v-card-title
                class="align-end fill-height pt-0 mt-0 font-weight-bold"
                >{{ work.fields.title }}</v-card-title
              >

              <v-list-item three-line style="min-height: unset">
                <v-list-item-subtitle>{{
                  work.fields.content
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-card-text>
                <template v-if="work.fields.tags">
                  <v-chip
                    v-for="tag in work.fields.tags"
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
                </template>
              </v-card-text>
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

        <div v-else class="text-center">投稿された記事はありません。</div>
        <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
          circle
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import { mapGetters } from "vuex";
// import draftChip from "~/components/works/draftChip";
// import { createClient } from "~/plugins/contentful.js";
// const client = createClient();

import { mapState, mapGetters } from "vuex"; // 追記
import draftChip from "~/components/works/draftChip";
export default {
  data() {
    return {
      page: 1,
      length: 0,
      displayLists: [],
      cats: ["profile", "works", "blog", "contact"],
      pageSize: 6,
    };
  },

  components: {
    draftChip,
  },
  computed: {
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
  },
  mounted: function () {
    this.works;
    // 例えば１ぺーじに３つのカードが入るとしたら、記事が4この場合、4/3で１より大きいので、1ページ分は確保される。
    // 6記事の場合は２ページ分となる。
    this.length = Math.ceil(this.works.length / this.pageSize);

    this.displayLists = this.works.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },

  // data() {
  //   return {
  //     page: 1,
  //     length: 0,
  //     displayLists: [],
  //     works: [],
  //     pageSize: 2,
  //   };
  // },
  // components: {
  //   draftChip,
  // },
  methods: {
    formatDate(iso) {
      const date = new Date(iso);
      const yyyy = new String(date.getFullYear());
      const mm = new String(date.getMonth() + 1).padStart(2, "0");
      const dd = new String(date.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    },
    pageChange: function (pageNumber) {
      this.displayLists = this.works.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>
<style scoped>
.date {
  padding-bottom: 0 !important;
}
</style>
