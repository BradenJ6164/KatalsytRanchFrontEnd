<template>
  <v-app-bar
    v-if="auth.isAuthenticated"


    color="transparent"
    density="compact"
    flat
  >
    <v-spacer />
    <Dialog

      v-model="siteSwitch"
      max-width="700px"
      title="Your Properties"
      @close="()=>console.log('dialog closed')"
    >
      <template #activator="{ props }">
        <v-btn
          :ripple="false"
          append-icon="mdi-chevron-down"
          v-bind="props"
          variant="text"
        >
          {{
            currentProperties.map((v) => {
              if (v.property_id === route.params.id) {
                return v.name
              }
            })[0]
          }}
        </v-btn>
      </template>
      <PropertySwitch @switched="siteSwitch = !siteSwitch" />
    </Dialog>


    <v-menu v-if="auth.userInformation && auth.userInformation.name">
      <template #activator="{ props }">
        <v-btn
          :ripple="false"
          append-icon="mdi-chevron-down"
          v-bind="props"
          variant="text"
        >
          {{ display.smAndUp.value ? auth.userInformation?.name : "" }}
          <template #prepend>
            <v-avatar
              color="secondary"
              size="small"
            >
              <v-img
                v-if="auth.userInformation?.avatar"
                :src="auth.userInformation?.avatar"
                alt="Avatar"
              />
              <span v-else>
                {{ getInitials(auth.userInformation?.name) }}
              </span>
            </v-avatar>
          </template>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="`/admin/${route.params.id}`">
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>


        <v-list-item
          @click="logoutCall"
        >
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item @click="reload">
          <v-list-item-title>Reload</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts" setup>
import {useAuthStore} from "@/stores/auth";
import {logout} from "@/ui-flows/auth";
import {useDisplay} from "vuetify";
import {useRouter} from "vue-router";
import {useProperties} from "@/hooks/useProperties";


const display = useDisplay()
const router = useRouter();
const route = useRoute();
const auth = useAuthStore()

const {currentProperties, loading} = useProperties()


const siteSwitch = ref(false)
const drawer = ref(display.mdAndUp.value)
const profileEdit = ref(false)

function getInitials(name) {
  // Match the first letter of each word or capitalized segment
  const matches = name.match(/\b[A-Z]/g);
  // Join the matched letters to form the initials
  return matches ? matches.join('') : '';
}

function reload() {
  window.location.reload()
}

async function logoutCall() {
  await logout().then(async (res) => {

    if (res) {
      await auth.fetchUser()
    }
  })
}
</script>
