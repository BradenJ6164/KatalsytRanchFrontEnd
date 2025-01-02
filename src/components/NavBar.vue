<template>

  <v-speed-dial
    app
    location="top end"
    transition="fade-transition"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab
        size="large"
        v-bind="activatorProps"
        style="margin-bottom: 75px;"
        color="primary"
        icon="mdi-dots-horizontal"
        location="bottom end"
        app
        absolute

      ></v-fab>
    </template>

    <v-btn key="1" @click="reload" icon="mdi-refresh"></v-btn>

  </v-speed-dial>
  <v-bottom-navigation bg-color="primary" dark fixed height="56">
    <v-btn to="/guides/guides" value="guides">
      <v-icon>mdi-text-box-multiple-outline</v-icon>

      <span>Guides</span>
    </v-btn>
    <v-btn to="/guides/houseRules" value="rules">
      <v-icon>mdi-script-text-outline</v-icon>

      <span>House Rules</span>
    </v-btn>

    <v-btn to="/" value="home">
      <v-icon>mdi-home</v-icon>

      <span>Home</span>

    </v-btn>

<!--    <v-btn  to="/nearby" value="nearby">-->
<!--      <v-icon>mdi-map-marker</v-icon>-->

<!--      <span>Nearby</span>-->
<!--    </v-btn>-->
  </v-bottom-navigation>


</template>


<script setup lang="ts">

function reload() {
  window.location.reload()
}
</script>
