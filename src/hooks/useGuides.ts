import {onBeforeUnmount, ref} from "vue";

import {axiosInstance} from "@/plugins/axios";

interface GuideData {
  name: number;
  guide_id: string;
  last_save: number;
  created_at: number;
}

export const useGuides = () => {
  const currentGuides = ref<GuideData[]>([]);
  const loading = ref(false)
  const route = useRoute();
  const updateGuides = async () => {

    loading.value = true;
    await axiosInstance.get(`/api/guides/getGuides?property_id=${route.params.id}`).then((response) => {
      const body = response.data;
      currentGuides.value = body.result as GuideData[];
    }).catch(() => {
      currentGuides.value = []
    }).finally(() => {
      loading.value = false;
    });


  };


  watch(route, () => {
    updateGuides();
  })

  const updateGuideInterval = setInterval(updateGuides, 15000);
  onBeforeUnmount(() => {
    clearInterval(updateGuideInterval);
  });
  updateGuides();
  return {
    loading,
    currentGuides,
    refresh: updateGuides,
  };
};

