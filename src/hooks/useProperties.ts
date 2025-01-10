import {onBeforeUnmount, ref} from "vue";

import {axiosInstance} from "@/plugins/axios";
import {useAuthStore} from "@/stores/auth";

interface PropertyData {
  property_id: string;
  name: string;
  address: string;
  description: string;
}

export const useProperties = () => {
  const auth = useAuthStore()
  const currentProperties = ref<PropertyData[]>([]);
  const loading = ref(false)
  const route = useRoute();
  const updateProperties = async () => {

    if (!auth.isAuthenticated) return {}
    loading.value = true;
    await axiosInstance.get("/api/properties/getProperties").then((res) => {
      // console.log(res.data);

      currentProperties.value = res.data.result;
      // console.log(currentProperties.value)
    }).catch((e) => {
      console.log(e)
      currentProperties.value = []
    }).finally(() => {
      loading.value = false;
    });


  };

  watch(route, () => {
    updateProperties();
  })


  const updatePropertiesInterval = setInterval(updateProperties, 15000);
  onBeforeUnmount(() => {
    clearInterval(updatePropertiesInterval);
  });
  updateProperties();
  return {
    loading,
    currentProperties,
    refresh: updateProperties,
  };
};

