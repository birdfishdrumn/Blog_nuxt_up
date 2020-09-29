<template>
  <div>
    <v-container fluid>
      <h2 class="new-post">最新記事</h2>
      <v-row justify="center">
        <v-col cols="12" sm="11" md="10" xl="8">
          <v-row v-if="works.length">
            <v-col
              v-for="work in limitCount"
              :key="work.sys.id"
              cols="12"
              sm="12"
              lg="12"
              xl="12"
            >
              <v-card width="700" class="mx-auto flex">
                <v-img
                  :src="setEyeCatch(work).url"
                  :alt="work.fields.image.fields.title"
                  max-height="100"
                  class="white--text"
                  md="8"
                  :to="linkTo('works', work)"
                >
                </v-img>

                <v-list-item
                  three-line
                  style="min-height: unset"
                  md="8"
                  :to="linkTo('works', work)"
                >
                  <v-list-item-subtitle>{{
                    work.fields.title
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <div v-else class="text-center">投稿された記事はありません。</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"; // 追記
import client from "~/plugins/contentful";
export default {
  computed: {
    ...mapState(["works"]), // 追記
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["setEyeCatch", "linkTo"]),
    limitCount() {
      return this.works.slice(0, 6);
    }, // 追記
  },
};
</script>
<style>
.new-post {
  margin-top: 20px;
  margin-left: 10px;
  border-left: black 5px solid;
  padding-left: 10px;
}
</style>
