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
              <v-icon left size="18" color="grey"> mdi-label </v-icon>
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
    ...mapGetters(["linkTo"]), // 追記
  },
};

// };
</script>
