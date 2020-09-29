<template>
  <v-container fluid>
    <v-form @submit.prevent="getPosts">
      <v-row align="center">
        <v-col cols="12" sm="10" md="8">
          <v-text-field
            v-model="query"
            outlined
            hide-details
            placeholder="キーワードを入力"
            autofocus
          />
        </v-col>
        <v-col cols="12" sm="2" md="4">
          <v-btn color="primary" @click="getPosts"> 検索する </v-btn>
        </v-col>
        <v-col cols="12">
          <!-- 検索結果件数の表示 -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                検索結果{{ works.length }}件
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- もしloadingがtrueなら -->
          <template v-if="loading">
            <div class="text-center">
              <v-progress-circular indeterminate color="grey" />
            </div>
          </template>
          <template v-else>
            <v-list class="py-0">
              <template v-if="works.length">
                <!-- 実際に記事を表示していく -->
                <v-list-item
                  v-for="(work, i) in works"
                  :key="i"
                  :to="$store.getters.linkTo('works', work)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ work.fields.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item class="justify-center">
                  <div class="text-center">
                    <p>キーワードに一致する投稿がありません。</p>
                    <v-icon> mdi-emoticon-cry-outline </v-icon>
                  </div>
                </v-list-item>
              </template>
            </v-list>
          </template>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";
const client = createClient();
export default {
  // query … このページで使用する検索キーワードが入る変数です。この変数をContentfulに渡し、全文検索を実行します。
  data() {
    return {
      query: "",
      works: [],
      loading: false,
    };
  },
  // 検索欄が空白の時に動作しないようにするため。
  computed: {
    isRequired() {
      return !!this.query && !/^\s+$/.test(this.query);
    },
  },
  // Nuxt.jsのthis.$routeを使ってURLに埋め込まれたクエリーを取得しています。クエリーとは下記のようなURLのq=の後の部分です。
  // ターゲットに変化があればこのhandler内の命令が実行されます。newValには変化があった後の値が入り、第二引数には変化前の古い値が入ります。つまりここには、ヘッダーの検索フォームから渡された検索キーワードが入っています。
  watch: {
    "$route.query.q": {
      handler(newVal) {
        this.query = newVal;
        this.getPosts();
      },
      immediate: true,
      // immediate: trueオプションを付けると描画前に監視を始めます。
    },
  },
  methods: {
    async getPosts() {
      if (this.isRequired) {
        this.loading = "true";
        await client
          .getEntries({
            content_type: "work",
            query: this.query,
          })
          .then(({ items }) => {
            (this.works = items), console.log(items);
          })
          .catch(console.error);
        this.loading = false;
      }
    },
  },
};
</script>
