<template>
  <DefaultLayout>
    <v-container>
      <v-row>
        <!--        <v-col-->


        <!--          cols="1"-->
        <!--        >-->
        <!--          -->
        <!--          <v-img-->

        <!--            aspect-ratio="1"-->
        <!--            class="bg-grey-lighten-2"-->
        <!--            cover-->
        <!--          >-->
        <!--            <template #default>-->
        <!--              <v-card-title>Get Featured?</v-card-title>-->
        <!--              <v-card-text>-->
        <!--                Send photos of your fun adventures to katrina@katalystranch.com or tag us on instagram!-->
        <!--              </v-card-text>-->
        <!--              <v-img-->
        <!--                aspect-ratio="1"-->
        <!--                max-height="175px"-->
        <!--                src="https://i.imgur.com/LAf5YiV.png"-->
        <!--              />-->
        <!--            </template>-->
        <!--          </v-img>-->
        <!--        </v-col>-->
        <v-col

          v-for="image in images"
          :key="image"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-img
            :key="image"
            :lazy-src="image"
            :src="image"
            aspect-ratio="1"
            class="bg-grey-lighten-2"
            cover
          >
            <template #placeholder>
              <v-row
                align="center"
                class="fill-height ma-0"
                justify="center"
              >
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>
<script lang="ts" setup>
import DefaultLayout from "@/layouts/defaultLayout.vue";

const images = [
  "https://i.imgur.com/LAf5YiV.png",
  "https://i.imgur.com/dgkQvJf.jpeg",
  "https://i.imgur.com/OCZOoow.jpeg",
  "https://i.imgur.com/y7h4UsZ.jpeg",
  "https://i.imgur.com/jWLrmuR.jpeg",
  "https://i.imgur.com/09VpuGf.jpeg",
  "https://i.imgur.com/G3wRb5s.jpeg"

]
</script>
