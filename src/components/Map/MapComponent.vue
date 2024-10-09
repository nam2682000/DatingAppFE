<template>
  <div id="map" style="height: 500px"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import type { LatLngTuple } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

let map: any = null
let marker: any = null

const props = defineProps({
  locationDefault: {
    type: Object,
    required: false,
    // Định nghĩa kiểu dữ liệu cho từng thuộc tính
    default: () => ({
      x: 0,
      y: 0
    })
  }
})

const emit = defineEmits(['update:locationName'])
onMounted(() => {
  console.log('props.locationDefault', props.locationDefault)
  map = L.map('map').setView([51.505, -0.09], 13) // Tọa độ mặc định
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let lat: number = props.locationDefault.y || position.coords.latitude
        let lng: number = props.locationDefault.x || position.coords.longitude
        const userLocation: LatLngTuple = [lat, lng]

        map.setView(userLocation, 13)
        marker = L.marker(userLocation).addTo(map).bindPopup('Bạn đang ở đây!')

        // Lấy tên địa điểm
        const locationName = await getLocationName(lat, lng)
        if (locationName) {
          marker.bindPopup(`Bạn đang ở đây: ${locationName}`).openPopup()
          emit('update:locationName', userLocation)
        }
      },
      (error) => {
        console.error('Lỗi khi lấy vị trí:', error)
        alert('Không thể lấy vị trí của bạn. Vui lòng thử lại.')
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  } else {
    alert('Trình duyệt không hỗ trợ Geolocation.')
  }

  // Thêm sự kiện click để chọn vị trí
  map.on('click', async (event: any) => {
    const userLocation: LatLngTuple = [event.latlng.lat, event.latlng.lng]
    if (marker) {
      map.removeLayer(marker)
    }
    // Thêm marker tại vị trí người dùng đã chọn
    marker = L.marker(userLocation).addTo(map).bindPopup('Bạn đã chọn vị trí này!').openPopup()

    // Lấy tên địa điểm cho vị trí đã chọn
    const locationName = await getLocationName(userLocation[0], userLocation[1])
    if (locationName) {
      marker.bindPopup(`Vị trí bạn đã chọn: ${locationName}`).openPopup()
      emit('update:locationName', userLocation)
    }
  })
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})

// Hàm lấy tên địa điểm từ tọa độ
const getLocationName = async (lat: number, lng: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  try {
    const response = await axios.get(url)
    const locationName = response.data.display_name
    return locationName
  } catch (error) {
    console.error('Lỗi khi lấy tên địa điểm:', error)
    return null
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
  max-width: 100%; /* Giới hạn chiều rộng */
  max-height: 500px; /* Giới hạn chiều cao */
  overflow: hidden; /* Giúp giới hạn không để bản đồ tràn */
}
</style>
