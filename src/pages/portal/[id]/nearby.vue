<script setup>
import {MapboxMap, MapboxMarker} from '@studiometa/vue-mapbox-gl';
import '@studiometa/vue-mapbox-gl/index.css';

// Import Mapbox required CSS stylesheets
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import DefaultLayout from "@/layouts/defaultLayout.vue";

const mapCenter = ref([-105.966, 38.508])

const mapBox = ref(undefined);

const records = ref([])
const token = ref("pk.eyJ1IjoiZHJiYWphIiwiYSI6ImNqNnYyYXc0NzByMmszM3RiaW1vbG15dHgifQ.7TWOiKyqeIzuc6zAbBy7CA")

const documentRef = ref(document)

onMounted(() => {
  // mapBox.value.map.zoomTo(12,{duration:0})
  // mapBox.value.map.panTo([-105.966,38.508],{duration:1000})
})
</script>

<template>
  <DefaultLayout>
    <MapboxMap
      :center="mapCenter"
      :zoom="12"
      access-token="pk.eyJ1IjoiZHJiYWphIiwiYSI6ImNqNnYyYXc0NzByMmszM3RiaW1vbG15dHgifQ.7TWOiKyqeIzuc6zAbBy7CA"
      style="width: 100vw; height: 100%"
    >
      <MapboxMarker :lng-lat="[-105.966,38.508]" />
    </MapboxMap>

    <!--    <v-main>-->
    <!--      &lt;!&ndash;    <div id="map-container" style="width:100vw;height:100%"></div>&ndash;&gt;-->
    <!--      &lt;!&ndash;    <StoreLocator&ndash;&gt;-->
    <!--      &lt;!&ndash;      :items="records"&ndash;&gt;-->
    <!--      &lt;!&ndash;      :access-token="token"&ndash;&gt;-->
    <!--      &lt;!&ndash;      :mapbox-map="{ mapStyle: 'mapbox://styles/mapbox/streets-v11',&ndash;&gt;-->
    <!--      &lt;!&ndash;                     style:'width: 100vw; height: 100%'}&ndash;&gt;-->
    <!--      &lt;!&ndash;">&ndash;&gt;-->

    <!--      &lt;!&ndash;      &lt;!&ndash; Loader slot &ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;      <template #loader>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <div class="z-50 absolute inset-0 bg-white flex items-center justify-center">&ndash;&gt;-->
    <!--      &lt;!&ndash;          <div class="absolute inset-0 bg-gray-300 rounded animate-pulse" />&ndash;&gt;-->
    <!--      &lt;!&ndash;          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">&ndash;&gt;-->
    <!--      &lt;!&ndash;            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>&ndash;&gt;-->
    <!--      &lt;!&ndash;          </svg>&ndash;&gt;-->
    <!--      &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </template>&ndash;&gt;-->

    <!--      &lt;!&ndash;      &lt;!&ndash; Before list slot &ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;      <template #before-list="{ filteredItems }">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <p class="m-0">Total: {{ filteredItems.length }}</p>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </template>&ndash;&gt;-->

    <!--      &lt;!&ndash;      &lt;!&ndash; After list slot &ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;      <template #after-list="{ filteredItems }">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <p v-if="filteredItems.length <= 0">&ndash;&gt;-->
    <!--      &lt;!&ndash;          No result.&ndash;&gt;-->
    <!--      &lt;!&ndash;        </p>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </template>&ndash;&gt;-->

    <!--      &lt;!&ndash;      &lt;!&ndash; Panel slot &ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;      <template #panel="{ close, item }">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <button @click="close">Close</button>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <p>{{ item }}</p>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </template>&ndash;&gt;-->
    <!--      &lt;!&ndash;    </StoreLocator>&ndash;&gt;-->
    <!--    </v-main>-->
  </DefaultLayout>
</template>


