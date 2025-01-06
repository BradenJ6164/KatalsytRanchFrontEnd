import Swal from "sweetalert2";
import {axiosInstance} from "@/plugins/axios";
import {processErrors} from "@/utils/processErrors";
import {Toast} from "@/plugins/sweetalert";
import {useCookies} from "@vueuse/integrations/useCookies";

const cookies = useCookies(["baja-security"])

export async function logout() {
  let returning = false
  await Swal.fire({
    title: "Do you want to logout of the panel?",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Logout",
    showLoaderOnConfirm: true,
    preConfirm: async () => {

      await axiosInstance.post("/api/auth/logout").then(async () => {
        cookies.remove("baja-security")

      }).catch((error) => {
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })

    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      returning = true;
      Toast.fire({
        icon: "success",
        text: "Logout success!",
      })
    }
  })
  return returning;
}

export async function login() {
  let returning = false

  interface sessionResult {
    success: boolean;
    result: {
      session: {
        token: string;
      }
    }
  }

  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement

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
      await axiosInstance.post("/api/auth/login", {
        email: username,
        password: password,
      }).then(async (response) => {
        const data = response.data as sessionResult
        cookies.set("baja-security", data.result.session.token, {
          path: "/",
          secure: true,
          maxAge: 604800,
          sameSite: "strict"
        })
      }).catch((error) => {
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      returning = true
      Toast.fire({
        icon: "success",
        text: "Login success!",
      })
    }
  });
  return returning
}

export async function register() {
  let emailInput: HTMLInputElement
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let entitlementInput: HTMLInputElement

  let returning = false
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
      await axiosInstance.post("/api/auth/register", {
        name: username,
        email: email,
        password: password,
        ["registration_key"]: entitlement,
      }).then(() => {

      }).catch((error) => {
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })
    },


  }).then((result) => {
    if (result.isConfirmed) {
      returning = true;
      Toast.fire({
        icon: "success",
        text: "Register success!",
      })

    }
  });
  return returning

}
