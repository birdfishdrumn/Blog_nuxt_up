<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <!--  :sort-by="sortByは投稿すうの多い順にタグを並び替える。-->
            <!-- :page.sync="page"  はデータとページネーションの連携 -->
            <v-data-table
              :headers="headers"
              :items="tableItems"
              :search="search"
              :sort-by="sortBy"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              hide-default-footer
              sort-desc
              @page-count="pageCount = $event"
            >
              <template v-slot:item.fields.name="{ item }">
                <v-icon size="18">
                  mdi-tag-outline
                </v-icon>

                <nuxt-link :to="linkTo('tags', item)">
                  {{ item.fields.name }}
                </nuxt-link>
              </template></v-data-table
            >
            <div class="text-center py-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="totalVisible"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    // １ページに表示されるタグの個数を設定
    itemsPerPage: 5,
    page: 1, // 追記
    pageCount: 0,
    totalVisible: 5,
    sortBy: "fields.postcount",
    search: "",
    headers: [
      { text: "タグ", aligen: "left", value: "fields.name" },
      {
        text: "投稿数",
        align: "center",
        width: 150,
        value: "fields.postcount" // この値を指定する
      }
    ]
  }),

  computed: {
    ...mapState(["tags"]),
    ...mapGetters(["linkTo"]),
    // 削除する
    // postCount() {
    //   return (currentTag) => {
    //     return this.$store.getters.associatePosts(currentTag).length
    //   }
    // },
    addBreads() {
      return [
        {
          icon: "mdi-tag-outline",
          text: "タグ一覧",
          to: "/tags",
          disabled: true,
          iconColor: "grey"
        }
      ];
    },

    tableItems() {
      const tags = [];
      for (let i = 0; i < this.tags.length; i++) {
        const tag = this.tags[i];
        // タグに関連づいた記事の数はstoreにある、タグに関連する記事一覧から取得する。
        tag.fields.postcount = this.$store.getters.associatePosts(tag).length;
        tags.push(tag);
      }
      return tags;
    }
  }
};
</script>
