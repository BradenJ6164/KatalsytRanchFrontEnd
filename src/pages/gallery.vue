<template>
  <DefaultLayout>
    <v-container>
      <v-row>
        <v-col


          class="d-flex child-flex"
          cols="4"
        >
          <v-img

            aspect-ratio="1"
            class="bg-grey-lighten-2"
            cover
          >
            <template #default>
              <v-card-title>Get Featured?</v-card-title>
              <v-card-text>
                Send photos of your fun adventures to katrina@katalystranch.com or tag us on instagram!
              </v-card-text>
              <v-img
                aspect-ratio="1"
                max-height="175px"
                src="https://i.imgur.com/LAf5YiV.png"
              />
            </template>
          </v-img>
        </v-col>
        <v-col
          v-for="n in 9"
          :key="n"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
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
</script>
