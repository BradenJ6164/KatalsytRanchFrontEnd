<script lang="ts">
import {MdPreview, MdCatalog,MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import 'md-editor-v3/lib/style.css';
import {useDisplay, useTheme} from "vuetify";
import {useAuthStore} from "@/stores/auth";

export default {
  components: {
    MdPreview, MdCatalog,MdEditor
  },
  data() {
    return {
      content: "",
      loading: true,
      id: "preview-only",
      scrollElement: document.documentElement,
      rightAppBarIcon: undefined,
      drawer: false,
      edit: false,
    }
  },
  setup() {
    const mobile = useDisplay();
    const authStore = useAuthStore();



    return { mobile,authStore };
  },
  async mounted() {
    await this.update();
    this.rightAppBarIcon = await document.getElementById("right_app_bar_icon")
  },
  watch: {
    $route(to, from) {
      this.update();
    }
  },
  computed: {
    mdiPreviewTheme: function () {
      const theme = useTheme()
      return theme.global.current.value.dark == true?'dark':'light'
    }
  },
  methods: {
    async update() {
      this.loading = true;
      let path = this.$route.path;
      if (path.includes('/guides')) {
        path = path.replace(/^\/guides/, '');
      }
      // console.warn(path)
      let res = await fetch(`${window.location.origin}/mdx/guides${path}.md`)
      if (!res.ok) res = await fetch(`${window.location.origin}/mdx//guides${path}.mdx`)
      this.content = await res.text();
      this.loading = false;
      this.$forceUpdate();
    }
  }
}
</script>


<template>



  <v-container v-if="loading">
    <v-responsive class="align-center text-center fill-height">
      <v-progress-circular color="secondary" size="128" width="12" indeterminate></v-progress-circular>
    </v-responsive>
  </v-container>
  <v-container fluid v-else>

    <v-navigation-drawer  v-model="drawer" location="right" app disable-resize-watcher>

      <v-container>
        <h2>Table of Contents</h2>
        <v-responsive v-if="loading" class="align-center text-center fill-height">
          <v-progress-circular color="secondary" size="128" width="12" indeterminate></v-progress-circular>
        </v-responsive>
        <div v-else>
          <MdCatalog :editorId="id" :scrollElement="scrollElement"/>
        </div>


      </v-container>


    </v-navigation-drawer>
    <v-fab

      @click="drawer = !drawer"
      style="margin-top: 75px;"
      color="secondary"
      icon="mdi-menu"
      location="top end"
      app

      sticky

    ></v-fab>
    <v-fab
      v-if="authStore.isAuthenticated"
      @click="edit = !edit"
      color="primary"
      icon="mdi-pencil"
      location="bottom start"
      app


      sticky

    ></v-fab>
    <MdPreview v-if="!edit || !authStore.isAuthenticated"  :editorId="id" :modelValue="content" :theme="mdiPreviewTheme"/>
    <MdEditor v-if="edit && authStore.isAuthenticated" language="en-us" :editorId="id" v-model="content" :theme="mdiPreviewTheme" :toolbarsExclude="['github','htmlPreview','fullscreen','save']" noUploadImg></MdEditor>
  </v-container>







  <!--    <MdCatalog :editorId="id" :scrollElement="scrollElement" />-->
  <!--    <MdEditor v-model="content" />-->
  <!--    <VMarkdownView-->

  <!--      :mode="mode"-->
  <!--      :content="content"-->
  <!--    ></VMarkdownView>-->
</template>
<style >
.hyphenate {
  word-wrap: break-word ;
  overflow-wrap: break-word ;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}
.md-editor-preview {
  word-break: break-word ;
}
.md-content .md-preview,
.md-content .md-html {
  word-break: break-word ;
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
