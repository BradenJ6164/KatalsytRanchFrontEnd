// stores/auth.ts
import {defineStore} from 'pinia';
import {onMounted, onUnmounted, ref} from 'vue';
import {useCookies} from "@vueuse/integrations/useCookies";
import {axiosInstance} from "@/plugins/axios";

export interface UserInformation {
  id: number,
  name: string,
  email: string,
  role: string,
  avatar: string,
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const userInformation = ref<UserInformation | null>(null);

  let intervalId: number | null = null;

  //API call to check authentication
  async function fetchUser() {
    const cookies = useCookies(["baja-security"])
    const token = cookies.get("baja-security")
    if (token !== undefined && token !== "") {


      axiosInstance.post("/api/auth/verifyToken").then((res) => {
        isAuthenticated.value = res?.data?.success ?? false
        if (isAuthenticated.value) {
          userInformation.value = res?.data?.user
        } else {
          userInformation.value = null
        }
      }).catch(() => {
        isAuthenticated.value = false
        userInformation.value = null
        cookies.remove("baja-security")
      });

    } else {
      isAuthenticated.value = false
    }

  }

  // Start polling for authentication status
  function startPolling() {
    // Immediately fetch user data
    fetchUser();

    // Set up the interval to poll every 30 seconds
    intervalId = setInterval(fetchUser, 30000);
  }

  // Stop polling
  function stopPolling() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Lifecycle hook to start/stop polling
  onMounted(startPolling);
  onUnmounted(stopPolling);

  return {
    isAuthenticated,
    userInformation,
    startPolling,
    stopPolling,
    fetchUser,
  };
});
