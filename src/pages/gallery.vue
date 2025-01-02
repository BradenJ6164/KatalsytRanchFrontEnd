<template>
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
          <template v-slot:default>
            <v-card-title>Get Featured?</v-card-title>
            <v-card-text>
              Send photos of your fun adventures to katrina@katalystranch.com or tag us on instagram!
            </v-card-text>
            <v-img  max-height="175px" aspect-ratio="1" src="https://i.imgur.com/LAf5YiV.png">

            </v-img>
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
          <template v-slot:placeholder>
            <v-row
              align="center"
              class="fill-height ma-0"
              justify="center"
            >
              <v-progress-circular
                color="grey-lighten-5"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
</script>
