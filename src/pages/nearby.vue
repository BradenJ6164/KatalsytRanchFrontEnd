<script setup>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
</script>

<template>
  <MapboxMap access-token="pk.eyJ1IjoiZHJiYWphIiwiYSI6ImNtNHVybG5jNjBwdW4ya29oYTJtNDRsMXoifQ.RfqwluD-LUJvtdrv8R8AIg" map-style="mapbox://styles/drbaja/cm4us9jqb000n01skftpv15z3">
    <MapboxMarker position="[0, 0]" />
  </MapboxMap>
</template>
