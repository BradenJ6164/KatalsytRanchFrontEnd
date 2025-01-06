<template>
  <v-container fluid>
    <h1>Guides</h1>
    <p>These are the guides accessible to your guests.</p>
    <p>Guides are written in Markdown. Open up the editor to get started!</p>
    <v-toolbar
      color="transparent"
      density="compact"
    >
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        @click="createGuide"
      >
        New Guide
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="currentGuides"
    >
      <template #item.last_save="{ value }">
        {{
          new Date(parseInt(value) * 1000).toDateString() + ' @ '
            +
            new
              Date(parseInt(value)
                *
                1000).toLocaleTimeString()
        }}
      </template>
      <template #item.created_at="{ value }">
        {{
          new Date(parseInt(value) * 1000).toDateString() + ' @ '
            +
            new
              Date(parseInt(value)
                *
                1000).toLocaleTimeString()
        }}
      </template>
      <template #item.actions="{value,item}">
        <v-btn
          flat
          icon="mdi-pencil"
          @click="router.push(`/guides/${item.guide_id}?edit=true`)"
        />
        <v-btn
          flat
          icon="mdi-trash-can"
          @click="()=>deleteGuide(item.guide_id)"
        />
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts" setup>

import {useGuides} from "@/hooks/useGuides";
import Swal from "sweetalert2";
import {axiosInstance} from "@/plugins/axios";
import {processErrors} from "@/utils/processErrors";
import {Toast} from "@/plugins/sweetalert";

const {currentGuides, refresh} = useGuides();
const router = useRouter()

const headers = [
  {
    title: 'ID',
    key: 'guide_id',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Last Updated',
    key: 'last_save',
  },
  {
    title: 'Created',
    key: 'created_at',
  },
  {
    title: '',
    key: 'actions',
    sortable: false,
  },
]

async function createGuide() {
  let guideNameInput: HTMLInputElement

  await Swal.fire({
    title: "Login to Panel",
    html: `
    <input id="name" class="swal2-input" type="text" placeholder="Guide Name">
  `,
    focusConfirm: false,
    showCancelButton: true,
    didOpen: () => {
      const popup = Swal.getPopup()!
      guideNameInput = popup.querySelector('#name') as HTMLInputElement
      guideNameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
    },
    confirmButtonText: 'Create Guide',
    showLoaderOnConfirm: true,
    preConfirm: async () => {

      const name = guideNameInput.value
      if (!name) {
        Swal.showValidationMessage(`Please enter na,e`)
      }
      await axiosInstance.post("/api/guides/createGuide", {
        name: name,
        content: ""
      }).then(async (response) => {

      }).catch((error) => {
        Swal.showValidationMessage(processErrors(error.response.data.errors));
      })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      refresh()
      Toast.fire({
        icon: "success",
        text: "Login success!",
      })

    }
  });
}

async function deleteGuide(guideID: number) {
  Swal.fire({
    title: "Delete Guide?",
    icon: "warning",
    text: `Are you sure you want to delete this guide? All data contained will be deleted and you can't undo this!`,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Delete",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await axiosInstance.post("/api/guides/deleteGuide", {guide_id: guideID}).then(async () => {
      }).catch((error) => {

        Swal.showValidationMessage(processErrors(error.response?.data.errors));
      })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      refresh()
      Toast.fire({
        icon: "success",
        text: "Guide deleted!",
      })
    }
  })
}

</script>

