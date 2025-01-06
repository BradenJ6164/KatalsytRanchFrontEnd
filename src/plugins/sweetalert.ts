import Swal from "sweetalert2";
import {processErrors} from "@/utils/processErrors";

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export async function SendSuccess(text: string) {
  await Toast.fire({
    text: text,
    icon: "success",
  })
}

export async function SendError(error: any) {
  await Swal.fire({
    icon: 'error',
    title: "Error",
    text: processErrors(error.response.data.errors),
    confirmButtonText: "OK",
  })
}

export function showLoading() {
  Swal.fire({
    title: "Loading",
    allowEscapeKey: false,
    allowOutsideClick: false,
  })
  Swal.showLoading()
}

export function hideLoading() {
  Swal.close()
  Swal.showLoading()
}
