<script setup>
import { MapboxMap,StoreLocator, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import '@studiometa/vue-mapbox-gl/index.css';

// Import Mapbox required CSS stylesheets
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

const mapCenter = ref([-105.966,38.508])

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
<!--  <MapboxMap   access-token="pk.eyJ1IjoiZHJiYWphIiwiYSI6ImNqNnYyYXc0NzByMmszM3RiaW1vbG15dHgifQ.7TWOiKyqeIzuc6zAbBy7CA"-->
<!--               style="width: 100vw; height: 100%"-->
<!--               :center="mapCenter"-->
<!--             :zoom="12">-->
<!--    <MapboxMarker :lng-lat="[-105.966,38.508]" />-->
<!--  </MapboxMap>-->

  <v-main>
<!--    <div id="map-container" style="width:100vw;height:100%"></div>-->
    <StoreLocator
      :items="records"
      :access-token="token"
      :mapbox-map="{ mapStyle: 'mapbox://styles/mapbox/streets-v11',
                     style:'width: 100vw; height: 100%'}
">

      <!-- Loader slot -->
      <template #loader>
        <div class="z-50 absolute inset-0 bg-white flex items-center justify-center">
          <div class="absolute inset-0 bg-gray-300 rounded animate-pulse" />
          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </template>

      <!-- Before list slot -->
      <template #before-list="{ filteredItems }">
        <p class="m-0">Total: {{ filteredItems.length }}</p>
      </template>

      <!-- After list slot -->
      <template #after-list="{ filteredItems }">
        <p v-if="filteredItems.length <= 0">
          No result.
        </p>
      </template>

      <!-- Panel slot -->
      <template #panel="{ close, item }">
        <button @click="close">Close</button>
        <p>{{ item }}</p>
      </template>
    </StoreLocator>

   </v-main>





</template>

