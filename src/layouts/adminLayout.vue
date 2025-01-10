<template>
  <v-app>
    <v-dialog v-model="profileEdit" />
    <v-app-bar
      color="primary"
      density="compact"
    >
      <v-app-bar-nav-icon
        v-if="display.smAndDown.value"
        @click="drawer=!drawer"
      />
      <!--      <v-app-bar-title v-if="display.smAndUp.value">-->
      <!--        Admin-->
      <!--      </v-app-bar-title>-->
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
          <Dialog
            max-width="700px"
            title="Profile Settings"
            @close="()=>console.log('dialog closed')"
          >
            <template #activator="{ props: activatorProps }">
              <v-list-item
                v-bind="activatorProps"
              >
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
            </template>
            <ProfileEdit />
          </Dialog>

          <v-list-item
            @click="logoutCall"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="display.mdAndUp.value"
      app
    >
      <v-list nav>
        <v-list-subheader>Admin Panel</v-list-subheader>
        <v-list-item
          :to="`/portal/${route.params.id}`"
          link
          prepend-icon="mdi-rocket-outline"
          title="Landing Page"
        />
        <v-list-item
          :to="`/admin/${route.params.id}/`"
          exact
          link
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
        />

        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              prepend-icon="mdi-wrench-cog-outline"
              title="Portal Configuration"
              v-bind="props"
            />
          </template>

          <v-list-item
            :to="`/admin/${route.params.id}/portal/guides`"
            link
            prepend-icon="mdi-book-open-variant-outline"
            title="Guides"
          />
        </v-list-group>
        <v-list-item
          :to="`/admin/${route.params.id}/bookings`"
          link
          prepend-icon="mdi-book-check-outline"
          title="Bookings"
        />
        <v-list-item
          :to="`/admin/${route.params.id}/chat`"
          link
          prepend-icon="mdi-chat-alert-outline"
          title="Chat"
        />
        <v-list-item
          :to="`/admin/${route.params.id}/propery-settings`"
          link
          prepend-icon="mdi-account-box-outline"
          title="Property Settings"
        />
        <v-list-item
          :to="`/admin/${route.params.id}/accounts`"
          link
          prepend-icon="mdi-account-group-outline"
          title="Accounts"
        />
      </v-list>

      <template #append>
        <div class="pa-2">
          <v-btn
            block
            color="error"
            @click="logoutCall"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
//
import {useDisplay} from "vuetify";
import {logout} from "@/ui-flows/auth";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useProperties} from "@/hooks/useProperties";

const display = useDisplay()
const router = useRouter();
const route = useRoute();
const auth = useAuthStore()

const {currentProperties, loading} = useProperties()

//
// const currentPropertyName = computed(() => {
//   console.log(currentProperties)
//   currentProperties.forEach(property => {
//     if (property.property_id === route.params.id) {
//       return property.name
//     }
//   })
//   return ""
// })

const siteSwitch = ref(false)
const drawer = ref(display.mdAndUp.value)
const profileEdit = ref(false)

function getInitials(name) {
  // Match the first letter of each word or capitalized segment
  const matches = name.match(/\b[A-Z]/g);
  // Join the matched letters to form the initials
  return matches ? matches.join('') : '';
}

async function logoutCall() {
  await logout().then(async (res) => {

    if (res) {
      await auth.fetchUser()
      await router.push("/")
    }
  })
}


</script>
