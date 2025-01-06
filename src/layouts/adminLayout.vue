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
      <v-app-bar-title>Admin Panel</v-app-bar-title>
      <v-spacer />
      <v-menu v-if="auth.userInformation && auth.userInformation.name">
        <template #activator="{ props }">
          <v-btn
            :ripple="false"
            append-icon="mdi-chevron-down"
            v-bind="props"
            variant="text"
          >
            {{ auth.userInformation?.name }}
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
        <v-list-item
          link
          prepend-icon="mdi-rocket-outline"
          title="Landing Page"
          to="/"
        />
        <v-list-item
          exact
          link
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/admin"
        />
        <v-list-item
          link
          prepend-icon="mdi-book-check-outline"
          title="Bookings"
          to="/admin/bookings"
        />
        <v-list-item
          link
          prepend-icon="mdi-chat-alert-outline"
          title="Chat"
          to="/admin/chat"
        />
        <v-list-item
          link
          prepend-icon="mdi-account-box-outline"
          title="Property Settings"
          to="/admin/property-settings"
        />
        <v-list-item
          link
          prepend-icon="mdi-account-group-outline"
          title="Accounts"
          to="/admin/accounts"
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

const display = useDisplay()
const router = useRouter();
const auth = useAuthStore()

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
