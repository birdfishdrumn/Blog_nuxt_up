<template>
  <div class="my-drawer">
    <v-app class="height:0">
      <v-app-bar
        app
        tite
        :clipped-left="isPointDown"
        :clipped-right="!isPointDown"
        :hide-on-scroll="hideOnScroll"
        :scroll-threshold="barHeight"
        :height="barHeight"
        elevate-on-scroll
        color="rgb(0,0,0,0.1)"
      >
        <!--  my-container コンポーネントからv-slotの名前を呼び出す。
        これはcssを整えるために挿入している。-->
        <!-- <my-container #padding> -->
        <template>
          <v-row class="my-align-center ma-0">
            <v-app-bar-nav-icon
              :class="hiddenClass"
              aria-hidden="false"
              aria-label="nav"
              @click.stop="drawer = !drawer"
            />
            <nuxt-link to="/" class="my-site-title my-link-black">{{
              siteName
            }}</nuxt-link>
            <v-spacer />
            <div data-app>
              <search-form />
            </div>
            <div>
              <ul class="nav-display">
                <nuxt-link to="/profile">
                  <li>Profile</li>
                </nuxt-link>
              </ul>
            </div>
            <v-toolbar-items
              class="hidden-ipad-and-down"
              :style="{ height: `${barHeight}px` }"
            >
              <v-btn
                v-for="(cat, i) in categories"
                :key="i"
                text
                exact
                class="my-font-bold"
                :to="linkTo('categories', cat)"
              ></v-btn>
            </v-toolbar-items>
            <div class="hidden-ipad-and-up" style="width: 48px"></div>
            <div class="menubtn-responsive">
              <menu-btn :categories="categories" />
            </div>
          </v-row>
          <!-- </my-container> -->
        </template>
      </v-app-bar>
    </v-app>
    <!-- <my-container #content> -->
    <template>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        floating
        :right="!isPointDown"
        :mobile-break-point="breakpoint"
        :color="drawerlayout.color"
        :width="drawerlayout.width"
        :style="drawerlayout.style"
      >
        こんにちはん
        <v-card-text :class="hiddenClass">
          <v-btn block text @click.stop="drawer = false">
            <v-icon aria-hidden="false" aria-label="close"
              >mdi-chevron-left</v-icon
            >close
          </v-btn>
        </v-card-text>
        <!-- <div class="my-drawer-content">
        <!-- <ad-fixed />-->
        <!-- <slot name="drawer" />
        </div>-->
      </v-navigation-drawer>
      <v-content>
        <loading v-if="loading" />
        <!-- v-else => _post.vue/Syntaxhighlight(Prism) NG!! d-none => OK!! -->
        <!-- <div :class="['my-main-content', { 'd-none': loading }]">
        <!-- <ad-responsive v-if="!loading" />-->
        <!-- </div> -->
      </v-content>
      <!-- </my-container> -->
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import menuBtn from "@/components/ui/menuBtn";
import loading from "@/components/ui/loading";
// import adFixed from "../ui/adsense/fixed";
// import adResponsive from "../ui/adsense/responsive";

export default {
  components: {
    menuBtn,
    loading,
    // adFixed,
    // adResponsive
  },
  props: {
    hideOnScroll: {
      type: Boolean,
      default: false,
    },
  },
  data({ $store }) {
    return {
      siteName: process.env.SITE_NAME,
      drawer: null,
      breakpoint: 960,
      hiddenClass: "hidden-md-and-up",
      barHeight: $store.state.layout.toolbarHeight,
      loading: false,
      cats: ["profile", "works", "blog", "contact"],
    };
  },
  computed: {
    ...mapState(["layout"]),
    ...mapGetters(["linkTo"]),
    categories() {
      return this.$store.getters.mainCategories();
    },
    windowWidth() {
      return this.$vuetify.breakpoint.width;
    },
    isPointDown() {
      return this.breakpoint > this.windowWidth;
    },
    isMaxWidthUp() {
      return this.windowWidth > this.layout.width;
    },
    drawerlayout() {
      const width = this.layout.drawerWidth + this.layout.padding * 2;
      const color = this.isPointDown ? "background" : "transparent";
      const right = this.isMaxWidthUp
        ? Math.round((this.windowWidth - this.layout.width) / 2)
        : 0;
      return { width, color, style: { right: `${right}px` } };
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style lang="scss">
$py: 48px;
$px: 16px;
.v-application--wrap {
  min-height: 0vh;
}
@media (min-width: 959px) {
  .v-app-bar__nav-icon {
    display: none !important;
  }
  .v-navigation-drawer {
    display: none !important;
  }
  a.my-site-title {
    margin-left: 30px;
  }
  .menubtn-responsive {
    display: none;
  }
}

.my-drawer {
  .v-toolbar__content {
    padding: 4px 0 !important;
  }
  a.my-site-title {
    font-size: 0.875rem;
    letter-spacing: 0.9px;
    text-decoration: none;
    font-weight: 600;
  }
  .my-main-content,
  .my-drawer-content {
    padding: $py $px;
  }
  // 959以下
  @media (max-width: 959px) {
    .my-drawer-content {
      padding: 0 $px $py;
    }
    .nav-display {
      display: none;
    }
    .my-main-content {
      max-width: (768px + $px * 2);
      margin: 0 auto;
    }
  }
  // 599以下
  @media (max-width: 599px) {
    .my-main-content {
      padding: ($py / 2) 0 $py;
    }
  }
}
</style>
