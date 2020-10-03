<template>
  <v-container fluid id="footer" justify-center>
    <v-card-text class="text-center white--text" size="50px">Tags</v-card-text>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
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

      <!-- <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text> -->
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex"; // 追記

export default {
  computed: {
    ...mapState(["tags"]), // 追記
    ...mapState(["categories"]),
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["linkTo"]) // 追記
  }
};
</script>
<style scoped>
#footer {
  background: linear-gradient(-135deg, #e4a972, #9941d8);
}
</style>
