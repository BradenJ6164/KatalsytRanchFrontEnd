import {onBeforeUnmount, ref} from "vue";

import {axiosInstance} from "@/plugins/axios";

interface GuideData {
  name: number;
  guide_id: string;
  content: string;
}

export const useGuide = (id: number | Ref<number>) => {
  const currentGuide = ref<GuideData | undefined>(undefined);
  const updateGuide = async () => {


    const response = await axiosInstance.get(`/api/guides/getGuide?id=${unref(id)}`);
    const body = response.data;

    currentGuide.value = body.result as GuideData | undefined;

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
  updateGuide()
  return {
    currentGuide,
    refresh: updateGuide,
  };
};

