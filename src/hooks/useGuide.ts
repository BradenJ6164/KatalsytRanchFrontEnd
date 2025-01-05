import {onBeforeUnmount, ref} from "vue";

import {axiosInstance} from "@/plugins/axios";

interface GuideData {
  name: number;
  guide_id: string;
  content: string;
  last_save: number;
  created_at: number;
}

export const useGuide = (id: number | Ref<number>) => {
  const currentGuide = ref<GuideData | undefined | -1>(undefined);
  const updateGuide = async () => {


    await axiosInstance.get(`/api/guides/getGuide?id=${unref(id)}`).then((response) => {
      const body = response.data;
      currentGuide.value = body.result as GuideData | undefined;
    }).catch(() => {
      currentGuide.value = -1
    });


  };
  watch(
    () => unref(id),
    () => {
      updateGuide();
    },
    {immediate: true} // Fetch immediately on hook initialization
  );


  const updateGuideInterval = setInterval(updateGuide, 120000);
  onBeforeUnmount(() => {
    clearInterval(updateGuideInterval);
  });
  return {
    currentGuide,
    refresh: updateGuide,
  };
};

