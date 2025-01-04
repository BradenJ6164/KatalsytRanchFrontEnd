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


      <v-btn v-if="!authStore.isAuthenticated" key="4" @click="register" icon="mdi-account-plus"></v-btn>

      <v-btn v-if="!authStore.isAuthenticated" key="3" @click="login" icon="mdi-login"></v-btn>

      <v-btn v-if="authStore.isAuthenticated" key="2" @click="logout" icon="mdi-logout"></v-btn>



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
import {axiosInstance} from "@/plugins/axios";
import {useCookies} from "@vueuse/integrations/useCookies";
import {hideLoading, showLoading, Toast} from "@/plugins/sweetalert";
import {useAuthStore} from "@/stores/auth";
import {processErrors} from "@/utils/processErrors";

const authStore = useAuthStore()


const cookies = useCookies(["baja-security"])

async function logout() {
  Swal.fire({
    title: "Do you want to logout of the panel?",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Logout",
    showLoaderOnConfirm: true,
    preConfirm: async () => {

       await axiosInstance.post("/api/auth/logout").then(async()=>{
          cookies.remove("baja-security")
          await authStore.fetchUser()

        }).catch((error)=>{
          Swal.showValidationMessage(processErrors(error.response.data.errors));
        })

    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Toast.fire({
        icon: "success",
        text: "Logout success!",
      })
    }
  })
}

async function login() {
  interface sessionResult {
    success: boolean;
    result : {
      session: {
        token: string;
      }
    }
  }

  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement

  interface formResponse {
    username: string,
    password: string
  }
 await Swal.fire({
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
    showLoaderOnConfirm: true,
    preConfirm: async () => {

      const username = usernameInput.value
      const password = passwordInput.value
      if (!username || !password) {
        Swal.showValidationMessage(`Please enter email and password`)
      }
      await axiosInstance.post("/api/auth/login",{
        email: username,
        password: password,
      }).then(async (response) => {
        const data = response.data as sessionResult
        cookies.set("baja-security",data.result.session.token,{sameSite:"strict"})
        await authStore.fetchUser()
      }).catch((error)=>{
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Toast.fire({
        icon: "success",
        text: "Login success!",
      })
    }
  });
}

async function register() {
  let emailInput: HTMLInputElement
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let entitlementInput: HTMLInputElement
  interface formResponse {
    username: string,
    email: string,
    password: string,
    entitlement: string
  }
  await Swal.fire({
    title: "Register to Panel",
    html: `
    <input id="username" class="swal2-input" type="text" placeholder="Username">
     <input id="email" class="swal2-input" type="email" placeholder="Email address">
    <input id="password" class="swal2-input" type="password" placeholder="Password">
     <input id="entitlement" class="swal2-input" type="password" placeholder="Entitlement ID">
  `,
    focusConfirm: false,
    showCancelButton: true,
    didOpen: () => {
      const popup = Swal.getPopup()!
      emailInput = popup.querySelector('#email') as HTMLInputElement
      usernameInput = popup.querySelector('#username') as HTMLInputElement
      passwordInput = popup.querySelector('#password') as HTMLInputElement
      entitlementInput = popup.querySelector('#entitlement') as HTMLInputElement
      emailInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      entitlementInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
    },
    confirmButtonText: 'Register',
    showLoaderOnConfirm: true,
    preConfirm: async () => {

      const email = emailInput.value
      const username = usernameInput.value
      const password = passwordInput.value
      const entitlement = entitlementInput.value
      if (!username || !password || !entitlement || !email) {
        Swal.showValidationMessage(`Please enter user, email, password, and entitlement. `)
      }
      await  axiosInstance.post("/api/auth/register",{
        name: username,
        email: email,
        password: password,
        ["registration_key"]: entitlement,
      }).then(() => {

      }).catch((error)=>{
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })
    },


  }).then((result) => {
    if (result.isConfirmed) {
      Toast.fire({
        icon: "success",
        text: "Register success!",
      })
      login()
    }
  });


}
function reload() {
  window.location.reload()
}
</script>
