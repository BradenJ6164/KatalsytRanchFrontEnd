<template>
  <swipe-list
    ref="list"
    :disabled="props.disabled"
    :item-key="props.itemKey"
    :items="props.items"
  >
    <template #default="{ item }">
      <v-sheet
        class="pa-0 px-4 border-t-thin"
      >
        <slot
          :item="item"
          name="default"
        />
      </v-sheet>
    </template>
    <template #right="{item,close}">
      <v-sheet
        class="pa-0 border-t-thin"
      >
        <v-toolbar

          class="pa-0 ma-0"
          color="transparent"
          density="compact"
        >
          <slot
            :close="close"
            :item="item"
            name="actions"
          />
        </v-toolbar>
      </v-sheet>
    </template>
  </swipe-list>
</template>
<script lang="ts" setup>
import {SwipeList} from "vue3-swipe-actions"

export interface CustomSwipeListProps {
  items: Array;
  itemKey: string;
  disabled: boolean;
}

const props = withDefaults(defineProps<CustomSwipeListProps>(), {})


const list = ref(null)
const close = () => {
  list.value.close()
}
defineExpose({
  close,
});
</script>
