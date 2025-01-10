<template>
  <v-container fluid>
    <v-list lines="two">
      <v-list-item
        v-for="item in currentProperties"
        :key="item.property_id"
        :border="true"
        append-icon="mdi-chevron-right"
        class="mb-1"
        link
        @click="switchProperty(item)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        {{ item.description }}
        <v-list-item-subtitle>{{ item.address }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script lang="ts" setup>

import {useProperties} from "@/hooks/useProperties";
import {useRouter} from "vue-router";

const emits = defineEmits(["switched"])

const router = useRouter()
const route = useRoute()

const {currentProperties} = useProperties()
// onMounted(() => {
//   console.log(currentProperties.value)
// })

const regex = /([/](portal|admin)[/])[0-9a-fA-F-]{36}([/])/;

function switchProperty(item) {

  const tbl = route.path.split('/');

  tbl[2] = item.property_id;
  const newUrl = tbl.join('/')
  console.log(newUrl)
  router.push(newUrl)
  emits("switched")
}


</script>
