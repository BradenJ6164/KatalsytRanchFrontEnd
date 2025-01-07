<template>
  <v-container fluid>
    <h1>Guides</h1>
    <p>These are the guides accessible to your guests.</p>
    <p>Guides are written in Markdown. Open up the editor to get started!</p>

    <v-toolbar
      color="transparent"
    >
      <p
        v-if="display.smAndDown.value"
        class="text-medium-emphasis"
      >
        Swipe left for actions
      </p>
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
      v-if="display.mdAndUp.value"
      :headers="headers"
      :items="currentGuides"
      :items-per-page="-1"
      :loading="loading"
      density="compact"
      hide-default-footer
    >
      <template #item.last_save="{ value }">
        {{
          new Date(parseInt(value) * 1000).toDateString()
        }}
        <br>
        {{

          new
            Date(parseInt(value)
              *
              1000).toLocaleTimeString()
        }}
      </template>
      <template

        #item.created_at="{ value }"
      >
        {{
          new Date(parseInt(value) * 1000).toDateString()
        }}
        <br>
        {{
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
          @click="router.push(`/guides/${item.guide_id}?edit=true&backToAdmin=true`)"
        />
        <v-btn
          flat
          icon="mdi-trash-can"
          @click="()=>deleteGuide(item.guide_id)"
        />
      </template>
    </v-data-table>

    <custom-swipe-list
      v-if="currentGuides"
      ref="swipeList"
      :disabled="swipeDisable"
      :items="currentGuides ?? []"
      item-key="guide_id"
    >
      <template #default="{item}">
        <v-toolbar

          class="pa-0 ma-0"
          color="transparent"
          density="compact"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-spacer />
          <v-list-item-subtitle>
            Updated {{
              new Date(parseInt(item.last_save) * 1000).toDateString()
            }}<br> {{

              new
                Date(parseInt(item.last_save)
                  *
                  1000).toLocaleTimeString()
            }}
          </v-list-item-subtitle>

          <v-spacer v-if="display.smAndUp.value" />
          <v-list-item-subtitle v-if="display.smAndUp.value">
            Created {{
              new Date(parseInt(item.created_at) * 1000).toDateString()
            }}<br> {{

              new
                Date(parseInt(item.created_at)
                  *
                  1000).toLocaleTimeString()
            }}
          </v-list-item-subtitle>
        </v-toolbar>
      </template>
      <template #actions="{item,close}">
        <v-sheet color="success">
          <v-btn
            color="white"
            flat
            icon="mdi-pencil"
            @click="router.push(`/guides/${item.guide_id}?edit=true&backToAdmin=true`)"
          />
        </v-sheet>
        <v-sheet color="error">
          <v-btn
            flat
            icon="mdi-trash-can"
            @click="async ()=>{await deleteGuide(item.guide_id); await task.wait(350); close()}"
          />
        </v-sheet>
      </template>
    </custom-swipe-list>
    <!--    <v-list-->
    <!--      v-else-->
    <!--      lines="three"-->
    <!--    >-->
    <!--      <SwipeOut-->
    <!--        v-for="item in currentGuides"-->
    <!--        :key="item.guide_id"-->
    <!--      >-->
    <!--        <template #default>-->
    <!--          <v-list-item-->
    <!--            :key="item.guide_id"-->
    <!--            :title="item.name"-->
    <!--            color="grey"-->
    <!--          >-->
    <!--            <v-list-item-subtitle>-->
    <!--              Updated: {{-->
    <!--                new Date(parseInt(item.last_save) * 1000).toDateString()-->
    <!--              }}-->
    <!--              {{-->

    <!--                new-->
    <!--                  Date(parseInt(item.last_save)-->
    <!--                    *-->
    <!--                    1000).toLocaleTimeString()-->
    <!--              }}-->
    <!--            </v-list-item-subtitle>-->
    <!--            <v-list-item-subtitle>-->
    <!--              Created: {{-->
    <!--                new Date(parseInt(item.created_at) * 1000).toDateString()-->
    <!--              }}-->
    <!--              {{-->

    <!--                new-->
    <!--                  Date(parseInt(item.created_at)-->
    <!--                    *-->
    <!--                    1000).toLocaleTimeString()-->
    <!--              }}-->
    <!--            </v-list-item-subtitle>-->
    <!--          </v-list-item>-->
    <!--        </template>-->
    <!--        <template #left>-->
    <!--          <v-list-item>-->
    <!--            <v-btn-->
    <!--              icon-->
    <!--              variant="flat"-->
    <!--              @click="router.push(`/guides/${item.guide_id}?edit=true`)"-->
    <!--            >-->
    <!--              <v-icon>mdi-pencil</v-icon>-->
    <!--            </v-btn>-->
    <!--            <v-btn-->
    <!--              color="error"-->
    <!--              icon-->
    <!--              variant="flat"-->
    <!--              @click="()=>deleteGuide(item.guide_id)"-->
    <!--            >-->
    <!--              <v-icon>mdi-delete</v-icon>-->
    <!--            </v-btn>-->
    <!--          </v-list-item>-->
    <!--        </template>-->
    <!--      </SwipeOut>-->
    <!--    </v-list>-->
  </v-container>
</template>
<script lang="ts" setup>
import 'vue3-swipe-actions/dist/index.css';


import {useGuides} from "@/hooks/useGuides";
import Swal from "sweetalert2";
import {axiosInstance} from "@/plugins/axios";
import {processErrors} from "@/utils/processErrors";
import {Toast} from "@/plugins/sweetalert";
import {useDisplay} from "vuetify";
import task from "@/utils/task";

const {currentGuides, refresh, loading} = useGuides();
const router = useRouter()
const display = useDisplay()

const swipeList = ref(null);
const swipeDisable = ref(false);

const headers = computed(() => {

  return [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Last Updated',
      key: 'last_save',
    },
    display.mdAndUp.value && {
      title: 'Created',
      key: 'created_at',
    },
    display.smAndUp.value && {
      title: '',
      key: 'actions',
      sortable: false,
    },
  ]
})

async function createGuide() {
  let guideNameInput: HTMLInputElement

  await Swal.fire({
    title: "Create new Guide",
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

  await Swal.fire({
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      await refresh()
      Toast.fire({
        icon: "success",
        text: "Guide deleted!",
      })
    }
  })
}

</script>

