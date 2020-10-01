<template>
  <v-menu bottom nudge-width="100">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon aria-hidden="false" aria-label="vertical">
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <!-- <v-list dense>
      <v-list-item
        v-for="(cat, i) in categories"
        :key="i"
        exact
        :to="$store.getters.linkTo('categories', cat)"
      >
        <v-list-item-title>
          {{ cat.fields.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list> -->
    <v-list flat>
      <v-list-item-group v-model="model" color="indigo">
        <v-list-item v-for="(item, i) in items" :key="i">
          <nuxt-link :to="item.link">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </nuxt-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapGetters } from "vuex"; // 追記

export default {
  data: () => ({
    items: [
      {
        icon: "mdi-wifi",
        text: "profile",
        link: "profile",
      },
      {
        icon: "mdi-bluetooth",
        text: "youtube",
        link: "youtube",
      },
      {
        icon: "mdi-chart-donut",
        text: "comic",
        link: "#workshop",
      },
      {
        icon: "mdi-chart-donut",
        text: "contact",
        link: "#request",
      },
    ],
    model: 1,
  }),
  computed: {
    //    ...mapGetters(['setEyeCatch', 'draftChip'])         // 削除
    ...mapGetters(["linkTo"]), // 追記
  },
};
</script>
