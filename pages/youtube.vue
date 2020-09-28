<template>
  <v-container class="brown lighten-5">
    <v-row>
      <v-col cols="12" sm="11" md="12" xl="6">
        <!-- <v-row v-if="works.length">
          <v-col
            v-for="work in works"
            :key="work.sys.id"
            cols="12"
            sm="6"
            lg="6"
            xl="2"
          > -->
        <v-card-text>
          <template>
            <v-chip
              v-for="tag in tags"
              :key="tag.sys.id"
              :to="linkTo('tags', tag)"
              small
              label
              outlined
              class="ma-1 black"
            >
              <v-icon left size="18" color="grey">
                mdi-label
              </v-icon>
              {{ tag.fields.name }}
            </v-chip>
          </template>
        </v-card-text>
        <!-- </v-col>
        </v-row> -->

        <!-- <div v-else class="text-center">投稿された記事はありません。</div> -->
        <!-- <div>{{ tableItems() }}</div>
        <div>{{ msg }}</div> -->
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

export default {
  computed: {
    ...mapState(["tags"]), // 追記
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["linkTo"]) // 追記
  }
  // methods: {
  //   tableItems() {
  //     const tags = [];

  //     for (let i = 0; i < this.tags.length; i++) {
  //       const tag = this.tags[i];
  //       // タグに関連づいた記事の数はstoreにある、タグに関連する記事一覧から取得する。
  //       tag.fields.postcount = this.$store.getters.associatePosts(tag).length;
  //       tags.push(tag);

  //       console.log(tag.fields.name);
  //       msg = tag.fields.name;
  //     }
  //     // return tags.fields;
  //   }
};

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

// asyncData() {
//   return Promise.all([
//     client.getEntries({
//       content_type: "work", // workタイプの記事データを全取得

//       order: "-sys.createdAt", // 作成日時順に並べる
//     }),
//   ])
//     .then(([works]) => {
//       return {
//         works: works.items, // 取得したデータを配列worksに入れる
//       };
//     })
//     .catch(console.error);
// },
// computed: {
//   linkTo: () => (obj) => {
//     return { name: "work-slug", params: { slug: obj.fields.slug } };
//   },
//   ...mapGetters(["setEyeCatch", "draftChip"]),
// },
// };
</script>
