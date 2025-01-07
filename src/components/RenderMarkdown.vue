<script lang="ts" setup>
import {MdCatalog, MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import 'md-editor-v3/lib/style.css';
import {useDisplay, useTheme} from "vuetify";
import {useAuthStore} from "@/stores/auth";
import {useGuide} from "@/hooks/useGuide";
import {axiosInstance} from "@/plugins/axios";
import {Toast} from "@/plugins/sweetalert";
import Swal from "sweetalert2";
import {processErrors} from "@/utils/processErrors";

const id = "editor"
const content = ref("");
const originalContent = ref("");
const originalName = ref("")
const scrollElement = ref(document.documentElement);
const drawer = ref(false)
const edit = ref(false)
const loading = ref(true)
const saveLoading = ref(false)
const theme = useTheme()
const display = useDisplay()
const authStore = useAuthStore();
const route = useRoute()

if (route.query.edit) {
  edit.value = true
}

const guideID = ref(-1)

let path = route.fullPath;
if (path.includes('/guides')) {
  path = path.replace(/^\/guides\//, '');
}
guideID.value = parseInt(path) ?? -1


const {currentGuide, refresh} = useGuide(guideID);
const router = useRouter()

watch(currentGuide, (newValue) => {
  if (newValue !== undefined) {
    originalContent.value = newValue.content;
    originalName.value = newValue.name;
    content.value = newValue.content
    loading.value = false;

  } else {

    loading.value = true;
  }
  // Your custom hook logic here
});
watch(route, () => {
  let path = route.fullPath;
  if (path.includes('/guides')) {
    path = path.replace(/^\/guides\//, '');
  }
  guideID.value = parseInt(path) ?? -1
})


const mdiPreviewTheme = computed(() => {
  return theme.global.current.value.dark == true ? 'dark' : 'light'
})

async function deleteGuide() {
  Swal.fire({
    title: "Delete Guide?",
    icon: "warning",
    text: `Are you sure you want to delete this guide? All data contained will be deleted and you can't undo this!`,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Delete",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await axiosInstance.post("/api/guides/deleteGuide", {guide_id: guideID.value}).then(async () => {
      }).catch((error) => {

        Swal.showValidationMessage(processErrors(error.response?.data.errors));
      })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      edit.value = false;
      if (route.query.backToAdmin) {
        router.push(`/admin/portal/guides`);
        return;
      }
      refresh();
      Toast.fire({
        icon: "success",
        text: "Guide deleted!",
      })
    }
  })
}

function revertChanges() {
  content.value = originalContent.value
}

async function saveGuide() {
  axiosInstance.post('/api/guides/setGuide', {
    guide_id: guideID.value,
    content: content.value,
    name: currentGuide.value?.name
  }).then(() => {
    originalContent.value = content.value;
    originalName.value = currentGuide.value?.name ?? "";
    refresh()
    Toast.fire(
      {
        icon: "success",
        text: "Guide saved!",
      }
    )
  }).catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Guide Save Error",
      text: processErrors(error.response.data.errors),
      confirmButtonText: "OK",
    })
  })

}

</script>


<template>
  <v-empty-state
    v-if="!loading && currentGuide === -1"
    headline="404"
    text="The guide requested does not exist"
    title="Guide not found"
  />

  <v-app-bar
    v-if="edit"
    color="warning"
    density="compact"
  >
    <v-app-bar-title v-if="display.mdAndUp.value">
      <v-text-field
        v-if="currentGuide"
        v-model="currentGuide.name"
        counter="32"
        density="compact"
        hide-details
        placeholder="Guide Name"
        single-line
        variant="outlined"
      />
    </v-app-bar-title>
    <!--    <template #extension>-->
    <!--      <v-text-field-->
    <!--        v-if="currentGuide"-->
    <!--        v-model="currentGuide.name"-->
    <!--        density="compact"-->
    <!--        -->
    <!--        flat-->
    <!--        placeholder="Guide Name..."-->
    <!--      />-->
    <!--    </template>-->
    <v-spacer />
    <v-btn
      v-if="content !== originalContent"
      @click="revertChanges"
    >
      Revert Changes
    </v-btn>
    <v-btn
      v-if="content == originalContent"
      @click="deleteGuide"
    >
      Delete Guide
    </v-btn>
    <v-btn
      :disabled="content !== originalContent"
      @click="()=>{
        if (route.query.backToAdmin) {
          router.push(`/admin/portal/guides`);
        } else {
          edit = !edit;
        }
      }"
    >
      Exit Editor
    </v-btn>
    <v-btn
      v-if="currentGuide"
      :disabled="content == originalContent && currentGuide.name == originalName"

      :loading="saveLoading"
      @click="saveGuide"
    >
      Save Guide
    </v-btn>
    <v-spacer v-if="display.smAndDown.value" />
  </v-app-bar>

  <v-container v-if="loading">
    <v-responsive class="align-center text-center fill-height">
      <v-progress-circular
        color="secondary"
        indeterminate
        size="128"
        width="12"
      />
    </v-responsive>
  </v-container>
  <v-container
    v-else
    fluid
  >
    <v-navigation-drawer
      v-if="!edit && !loading"
      v-model="drawer"
      app
      disable-resize-watcher
      location="right"
    >
      <v-container>
        <h2>Table of Contents</h2>
        <v-responsive
          v-if="loading"
          class="align-center text-center fill-height"
        >
          <v-progress-circular
            color="secondary"
            indeterminate
            size="128"
            width="12"
          />
        </v-responsive>
        <div v-else>
          <MdCatalog
            :editor-id="id"
            :scroll-element="scrollElement"
          />
        </div>
      </v-container>
    </v-navigation-drawer>
    <v-fab
      v-if="!edit"
      app
      color="secondary"
      icon="mdi-menu"
      location="top end"
      sticky
      style="margin-top: 75px;"

      @click="drawer = !drawer"
    />

    <v-toolbar
      v-if="currentGuide && authStore.isAuthenticated && !edit"
      density="compact"

      flat
      style="background: none;"
    >
      <v-btn
        variant="text"
        @click="router.push('/admin/portal/guides')"
      >
        All Guides
      </v-btn>

      <v-spacer />

      <v-btn
        icon="mdi-pencil"

        variant="text"
        @click="edit = !edit"
      />
    </v-toolbar>


    <MdPreview
      v-if="!edit || !authStore.isAuthenticated"
      :editor-id="id"
      :model-value="content"
      :theme="mdiPreviewTheme"
    />
    <v-list-item v-if="display.smAndDown.value">
      <v-text-field
        v-if="currentGuide"
        v-model="currentGuide.name"
        bg-color="backgroundGrey"
        counter="32"
        density="compact"
        placeholder="Guide Name"
        variant="outlined"
      />
    </v-list-item>
    <v-alert
      v-if="edit"
      type="info"
    >
      <v-alert-title>New to Markdown?</v-alert-title>
      Check out the markdown cheat-sheet <a
        href="https://www.markdownguide.org/cheat-sheet/"
        target="_blank"
      >here</a>!
    </v-alert>
    <br>
    <MdEditor
      v-if=" edit && authStore.isAuthenticated"
      v-model="content"
      :editor-id="id"
      :footers="['markdownTotal', 0, '=', 1, 'scrollSwitch']"
      :theme="mdiPreviewTheme"

      :toolbars-exclude="['github','htmlPreview','fullscreen','save']"

      language="en-us"
      no-upload-img
    >
      <!--      <template #defToolbars>-->
      <!--        <QrcodeTool />-->
      <!--      </template>-->
      <template #defFooters>
        <span>
          {{
            'Last Updated: ' + new Date(parseInt(currentGuide?.last_save) * 1000).toDateString() + ' @ '
              +
              new
                Date(parseInt(currentGuide?.last_save)
                  *
                  1000).toLocaleTimeString()
          }}
        </span>
        <span>
          {{
            'Created: ' + new Date(parseInt(currentGuide?.created_at) * 1000).toDateString() + ' @ '
              +
              new
                Date(parseInt(currentGuide?.created_at)
                  *
                  1000).toLocaleTimeString()
          }}
        </span>
      </template>
    </MdEditor>
    <br>
    <v-alert
      v-if="edit && content !== originalContent"
      type="warning"
    >
      <v-alert-title>Unsaved Changes</v-alert-title>
    </v-alert>
  </v-container>


  <!--    <MdCatalog :editorId="id" :scrollElement="scrollElement" />-->
  <!--    <MdEditor v-model="content" />-->
  <!--    <VMarkdownView-->

  <!--      :mode="mode"-->
  <!--      :content="content"-->
  <!--    ></VMarkdownView>-->
</template>
<style>
.v-input__slot {
  transform: scale(.65)
}

.hyphenate {
  word-wrap: break-word;
  overflow-wrap: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

.md-editor-preview {
  word-break: break-word;
}

.md-content .md-preview,
.md-content .md-html {
  word-break: break-word;
}

/**
 * src/styles/settings.scss
 *
 * Configures SASS variables and Vuetify overwrites
 */
.v-alert {
  display: grid;
  flex: 1 1;
  grid-template-areas: "prepend content append close" ". content . .";
  grid-template-columns: max-content auto max-content max-content;
  position: relative;
  padding: 16px;
  overflow: hidden;
  --v-border-color: currentColor;
  border-radius: 4px;
}

.v-alert--absolute {
  position: absolute;
}

.v-alert--fixed {
  position: fixed;
}

.v-alert--sticky {
  position: sticky;
}

.v-alert--variant-plain, .v-alert--variant-outlined, .v-alert--variant-text, .v-alert--variant-tonal {
  background: transparent;
  color: inherit;
}

.v-alert--variant-plain {
  opacity: 0.62;
}

.v-alert--variant-plain:focus, .v-alert--variant-plain:hover {
  opacity: 1;
}

.v-alert--variant-plain .v-alert__overlay {
  display: none;
}

.v-alert--variant-elevated, .v-alert--variant-flat {
  background: rgb(var(--v-theme-on-surface-variant));
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.v-alert--variant-elevated {
  box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.v-alert--variant-flat {
  box-shadow: 0px 0px 0px 0px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.v-alert--variant-outlined {
  border: thin solid currentColor;
}

.v-alert--variant-text .v-alert__overlay {
  background: currentColor;
}

.v-alert--variant-tonal .v-alert__underlay {
  background: currentColor;
  opacity: var(--v-activated-opacity);
  border-radius: inherit;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.v-alert--prominent {
  grid-template-areas: "prepend content append close" "prepend content . .";
}

.v-alert.v-alert--border {
  --v-border-opacity: 0.38;
}

.v-alert.v-alert--border.v-alert--border-start {
  padding-inline-start: 24px;
}

.v-alert.v-alert--border.v-alert--border-end {
  padding-inline-end: 24px;
}

.v-alert--variant-plain {
  transition: 0.2s opacity cubic-bezier(0.4, 0, 0.2, 1);
}

.v-alert--density-default {
  padding-bottom: 16px;
  padding-top: 16px;
}

.v-alert--density-default.v-alert--border-top {
  padding-top: 24px;
}

.v-alert--density-default.v-alert--border-bottom {
  padding-bottom: 24px;
}

.v-alert--density-comfortable {
  padding-bottom: 12px;
  padding-top: 12px;
}

.v-alert--density-comfortable.v-alert--border-top {
  padding-top: 20px;
}

.v-alert--density-comfortable.v-alert--border-bottom {
  padding-bottom: 20px;
}

.v-alert--density-compact {
  padding-bottom: 8px;
  padding-top: 8px;
}

.v-alert--density-compact.v-alert--border-top {
  padding-top: 16px;
}

.v-alert--density-compact.v-alert--border-bottom {
  padding-bottom: 16px;
}

.v-alert__border {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  opacity: var(--v-border-opacity);
  position: absolute;
  pointer-events: none;
  right: 0;
  top: 0;
  width: 100%;
  border-color: currentColor;
  border-style: solid;
  border-width: 0;
}

.v-alert__border--border {
  border-width: 8px;
  box-shadow: none;
}

.v-alert--border-start .v-alert__border {
  border-inline-start-width: 8px;
}

.v-alert--border-end .v-alert__border {
  border-inline-end-width: 8px;
}

.v-alert--border-top .v-alert__border {
  border-top-width: 8px;
}

.v-alert--border-bottom .v-alert__border {
  border-bottom-width: 8px;
}

.v-alert__close {
  flex: 0 1 auto;
  grid-area: close;
}

.v-alert__content {
  align-self: center;
  grid-area: content;
  overflow: hidden;
}

.v-alert__append,
.v-alert__close {
  align-self: flex-start;
  margin-inline-start: 16px;
}

.v-alert__append {
  align-self: flex-start;
  grid-area: append;
}

.v-alert__append + .v-alert__close {
  margin-inline-start: 16px;
}

.v-alert__prepend {
  align-self: flex-start;
  display: flex;
  align-items: center;
  grid-area: prepend;
  margin-inline-end: 16px;
}

.v-alert--prominent .v-alert__prepend {
  align-self: center;
}

.v-alert__underlay {
  grid-area: none;
  position: absolute;
}

.v-alert--border-start .v-alert__underlay {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.v-alert--border-end .v-alert__underlay {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.v-alert--border-top .v-alert__underlay {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.v-alert--border-bottom .v-alert__underlay {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.v-alert-title {
  align-items: center;
  align-self: center;
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  hyphens: auto;
  letter-spacing: 0.0125em;
  line-height: 1.75rem;
  overflow-wrap: normal;
  text-transform: none;
  word-break: normal;
  word-wrap: break-word;
}</style>
