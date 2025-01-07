<template>
  <v-speed-dial
    app

    location="top end"
    transition="fade-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-fab
        app
        color="primary"
        icon="mdi-dots-horizontal"
        location="bottom end"
        size="large"
        sticky
        style="margin-bottom: 75px;"

        v-bind="activatorProps"
      />
    </template>


    <v-btn
      v-if="!authStore.isAuthenticated"
      key="5"
      icon="mdi-account-plus"
      @click="async ()=>{await register().then((res)=>{if(res){login()}})}"
    />

    <v-btn
      v-if="!authStore.isAuthenticated"
      key="4"
      icon="mdi-login"
      @click="async ()=>{await login(); await authStore.fetchUser()}"
    />

    <v-btn
      v-if="authStore.isAuthenticated"
      key="3"
      icon="mdi-wrench-cog-outline"
      to="/admin"
    />
    <v-btn
      v-if="authStore.isAuthenticated"
      key="2"
      icon="mdi-logout"
      @click="async ()=>{await logout(); await authStore.fetchUser()}"
    />


    <v-btn
      key="1"
      icon="mdi-refresh"
      @click="reload"
    />
  </v-speed-dial>
  <v-bottom-navigation
    bg-color="primary"
    dark
    fixed
  >
    <v-btn
      to="/guides/1"
      value="guides"
    >
      <v-icon>mdi-text-box-multiple-outline</v-icon>

      <span>Guides</span>
    </v-btn>
    <v-btn
      to="/guides/2"
      value="rules"
    >
      <v-icon>mdi-script-text-outline</v-icon>

      <span>House Rules</span>
    </v-btn>

    <v-btn
      to="/"
      value="home"
    >
      <v-icon>mdi-home</v-icon>

      <span>Home</span>
    </v-btn>

    <v-btn
      to="/nearby"
      value="nearby"
    >
      <v-icon>mdi-map-marker</v-icon>

      <span>Nearby</span>
    </v-btn>
    <v-btn
      to="/gallery"
      value="gallery"
    >
      <v-icon>mdi-image-multiple</v-icon>

      <span>Gallery</span>
    </v-btn>
  </v-bottom-navigation>
</template>


<script lang="ts" setup>
import '@sweetalert2/themes/dark/dark.css';
import {useAuthStore} from "@/stores/auth";
import {login, logout, register} from "@/ui-flows/auth";
import {useDisplay} from "vuetify";

const display = useDisplay()

const authStore = useAuthStore()


function reload() {
  window.location.reload()
}
</script>
