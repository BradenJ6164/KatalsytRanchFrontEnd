<template>
  <v-dialog
    v-model="model"
    :persistent="compProps.persistent"
  >
    <template #activator="{ props: activatorProps }">
      <slot
        name="activator"
        v-bind="{ props: activatorProps }"
      />
    </template>


    <v-card>
      <v-toolbar :color="compProps.color">
        <v-toolbar-title>
          {{ compProps.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          flat
          icon="mdi-close"
          variant="plain"
          @click="topbarClose"
        />
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>

import {watch} from "vue";

interface DialogProps {
  title?: string,
  persistent?: boolean,
  color?: string
  canClose?: () => boolean;
}

const compProps = withDefaults(defineProps<DialogProps>(), {
  title: "",
  persistent: false,
  color: "primary",
})
const emit = defineEmits(["update:modelValue", "close"])

const model = defineModel({default: false})

function topbarClose() {
  if (compProps.canClose !== undefined) {
    if (!compProps.canClose()) return
  }
  model.value = false;
}

watch(model, (newVal) => {
  if (!newVal) {
    emit("close")
  }
})
</script>
