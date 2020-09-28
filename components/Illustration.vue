<template>
  <v-container class="brown lighten-5">
    <v-row>
      <v-col cols="12" sm="12" md="12" xl="12">
        <v-row>
          <v-col cols="12" sm="6" lg="6" xl="6">
            <v-card color="blue lighten-4" max-width="500" class="mx-0.2">
              <v-img
                :src="require('@/assets/images/IMG_0280.PNG')"
                :aspect-ratio="1"
                class="white--text"
              >
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="6" xl="6">
            <v-card color="blue lighten-4" max-width="500" class="mx-0.2">
              <v-img
                :src="require('@/assets/images/tombo.PNG')"
                :aspect-ratio="1"
                class="white--text"
              >
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="6" xl="6">
            <v-card color="blue lighten-4" max-width="500" class="mx-0.2">
              <v-img
                :src="require('@/assets/images/autom.PNG')"
                :aspect-ratio="1"
                class="white--text"
              >
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="6" xl="6">
            <v-card color="blue lighten-4" max-width="500" class="mx-0.2">
              <v-img
                :src="require('@/assets/images/xmas.PNG')"
                :aspect-ratio="1"
                class="white--text"
              >
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <!-- "require('@/assets/image/picture.jpg')" -->
        <!-- <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
          circle
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>
