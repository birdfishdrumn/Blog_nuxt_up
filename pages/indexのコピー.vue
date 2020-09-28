<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10" xl="8">
        <v-row v-if="works.length">
          <v-col v-for="work in works" :key="work.sys.id" cols="12" sm="6" lg="4" xl="3">
            <v-card color="blue lighten-4" max-width="400" class="mx-auto">
              <v-img
                :src="setEyeCatch(work).url"
                :alt="work.fields.image.fields.title"
                :aspect-ratio="16/9"
                max-height="200"
                class="white--text"
              >
                <v-card-title class="align-end fill-height font-weight-bold">{{ work.fields.title }}</v-card-title>
              </v-img>

              <v-card-text text color="white">
                {{ formatDate(work.fields.date) }}
                <span :is="draftChip(work)" />
              </v-card-text>

              <v-list-item three-line style="min-height: unset;">
                <v-list-item-subtitle>{{ work.fields.content }}</v-list-item-subtitle>
              </v-list-item>

              <v-card-actions>
                <v-spacer />
                <!-- linkToの引数はstoteの方で二つ取っている為、('xx',xx)というように分けてあげる必要がある。 -->
                <v-btn text color="primary" :to="linkTo('work',work)">この記事をみる</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <div v-else class="text-center">投稿された記事はありません。</div>
        <v-pagination v-model="page" :length="length" @input="pageChange"></v-pagination>
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
  components: {
    draftChip,
  },
  computed: {
    ...mapState(["works"]), // 追記
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"]), // 追記
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
  },
};
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
