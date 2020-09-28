<template>
  <div>
    <v-container>
      <v-card class="prof mb-20 pt-30"
        ><v-card-text class="prof-title">-Profile-</v-card-text></v-card
      >
      <v-row>
        <v-col
          cols="12"
          sm="11"
          md="4"
          xl="4"
          class="bg-center bg-cover rounded-full shadow photo"
        ></v-col>
        <v-col class="prof-text">
          <h1 class="font-bold ">michi</h1>
          <p class="text-xs  mt-5">
            普段は江戸風鈴のデザインを行なっている、michiと言います。
            日本人が歴史上関わりの深い動物などをイラストを交えて面白く深く紹介していきたいと思いますのでよろしくお願いいたします。
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-tabs
      v-model="tab"
      fixed-tabs
      show-arrows
      slider-color="primary"
      @click="tabClick(i)"
    >
      <v-tab
        v-for="(product, i) in products"
        :key="`product-${i}`"
        class="my-font-bold"
      >
        {{ product }}
      </v-tab>
      <v-tabs-items v-model="tab" light　>
        <v-tab-item background-color="white">
          <Illustration></Illustration>
        </v-tab-item>
        <v-tab-item>
          <Windchaim></Windchaim>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>わら</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: ["Illustration", "Windchaim", "WebDesign"],
      tab: 0,
      texts: ["Illustration", "風鈴", "WebDesign"]
    };
  }
  // methods: {
  //   tabClick(index) {
  //     if (this.tab === index) {
  //       return;
  //     }
  //     this.transition = true;
  //     setTimeout(() => (this.transition = false), 100);
  //   }
  // }
};
</script>
<style scoped>
.prof {
  text-align: center;
  font-size: 1.5rem;
}
.photo {
  min-width: 15rem;
  min-height: 15rem;
  background-image: url("../assets/images/IMG_0280.PNG");
}
.prof-text {
  margin-left: 30px;
}
v-tabs-items {
  background-color: white;
}
@media (max-width: 960px) {
  .prof-text {
    margin-left: 0px;
  }
  .photo {
    width: 5rem;
    height: 25rem;
    background-image: url("../assets/images/IMG_0280.PNG");
  }
  .prof-title {
    font-size: 1.55rem;
  }
}
</style>
