<template>
  <div>
    <h2 class="new-post">カテゴリー</h2>
    <v-card-text>
      <template>
        <v-list-item
          text
          v-for="cat in categories"
          :key="cat.sys.id"
          :to="linkTo('categories', cat)"
          class="ma-1 black "
        >
          <p class="category mt-3 pb-3">
            <!-- <v-icon left size="18" color="grey"> mdi-label </v-icon -->
            {{ cat.fields.name }}
          </p>
        </v-list-item>
      </template>
    </v-card-text>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"; // 追記

export default {
  computed: {
    ...mapState(["categories"]),
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["linkTo"]) // 追記
  }
};
</script>
<style scoped>
v-text {
  font-size: 1.2rem;
}

.category {
  border-bottom: solid 1px #eee;
}
</style>
