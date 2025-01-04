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

        sticky

      ></v-fab>
    </template>
    <v-btn key="3" @click="register" icon="mdi-account-plus"></v-btn>

    <v-btn key="2" @click="login" icon="mdi-login"></v-btn>
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

    <v-btn  to="/nearby" value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      <span>Nearby</span>
    </v-btn>
    <v-btn  to="/gallery" value="gallery">
      <v-icon>mdi-image-multiple</v-icon>

      <span>Gallery</span>
    </v-btn>
  </v-bottom-navigation>


</template>


<script setup lang="ts">
import Swal from 'sweetalert2'

import '@sweetalert2/themes/dark/dark.css';

async function login() {
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement

  interface formResponse {
    username: string,
    password: string
  }
  let { value: formValues } = await Swal.fire({
    title: "Login to Panel",
    html: `
    <input id="username" class="swal2-input" type="email" placeholder="Email address">
    <input id="password" class="swal2-input" type="password" placeholder="Password">
  `,
    focusConfirm: false,
    showCancelButton: true,
    didOpen: () => {
      const popup = Swal.getPopup()!
      usernameInput = popup.querySelector('#username') as HTMLInputElement
      passwordInput = popup.querySelector('#password') as HTMLInputElement
      usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
    },
    confirmButtonText: 'Login',
    preConfirm: () => {
      const username = usernameInput.value
      const password = passwordInput.value
      if (!username || !password) {
        Swal.showValidationMessage(`Please enter username and password`)
      }
      return { username, password }
    },
  });
  if (formValues) {
    formValues = formValues as formResponse;

  }
}

function register() {
  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
}
function reload() {
  window.location.reload()
}
</script>
