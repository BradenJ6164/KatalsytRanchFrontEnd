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
  const updateGuides = async () => {


    await axiosInstance.get(`/api/guides/getGuides`).then((response) => {
      const body = response.data;
      currentGuides.value = body.result as GuideData[];
    }).catch(() => {
      currentGuides.value = []
    });


  };


  const updateGuideInterval = setInterval(updateGuides, 15000);
  onBeforeUnmount(() => {
    clearInterval(updateGuideInterval);
  });
  updateGuides();
  return {
    currentGuides,
    refresh: updateGuides,
  };
};

