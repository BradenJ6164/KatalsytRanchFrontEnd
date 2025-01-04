import {config} from "md-editor-v3";
import markdownContainer from "markdown-it-container";



config({
  markdownItConfig(md) {
    md.use(markdownContainer, "info", {

      render: function (tokens: any, idx: any) {
        const m = tokens[idx].info.trim().match(/^info\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `
          <div class="v-alert v-theme--techologyLightTheme bg-info v-alert--density-default v-alert--variant-flat" role="alert">
<span class="v-alert__underlay"></span>
  <div class="v-alert__prepend"><i class="mdi-information-outline mdi v-icon notranslate v-theme--techologyLightTheme"
aria-hidden="true" density="default"
style="font-size: 28px; height: 28px; width: 28px;"></i></div>
<div class="v-alert__content">
` + (m !== null ? `<div class="v-alert-title">` +md.utils.escapeHtml(m[1])+ `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "warning", {
      validate: function(params) {
        return params.trim().match(/^warning\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        const m = tokens[idx].info.trim().match(/^warning\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `
          <div class="v-alert v-theme--techologyLightTheme bg-warning v-alert--density-default v-alert--variant-flat" role="alert">
<span class="v-alert__underlay"></span>
  <div class="v-alert__prepend"><i class="mdi-alert-outline mdi v-icon notranslate v-theme--techologyLightTheme"
aria-hidden="true" density="default"
style="font-size: 28px; height: 28px; width: 28px;"></i></div>
<div class="v-alert__content">
          ` + (m !== null ? `<div class="v-alert-title">` +md.utils.escapeHtml(m[1])+ `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "error", {
      validate: function(params) {
        return params.trim().match(/^error\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        const m = tokens[idx].info.trim().match(/^error\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `
          <div class="v-alert v-theme--techologyLightTheme bg-error v-alert--density-default v-alert--variant-flat" role="alert">
<span class="v-alert__underlay"></span>
  <div class="v-alert__prepend"><i class="mdi-close-outline mdi v-icon notranslate v-theme--techologyLightTheme"
aria-hidden="true" density="default"
style="font-size: 28px; height: 28px; width: 28px;"></i></div>
<div class="v-alert__content">

          ` + (m !== null ? `<div class="v-alert-title">` +md.utils.escapeHtml(m[1])+ `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "success", {
      validate: function(params) {
        return params.trim().match(/^success\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        const m = tokens[idx].info.trim().match(/^success\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `
          <div class="v-alert v-theme--techologyLightTheme bg-success v-alert--density-default v-alert--variant-flat" role="alert">
<span class="v-alert__underlay"></span>
  <div class="v-alert__prepend"><i class="mdi-check-circle-outline mdi v-icon notranslate v-theme--techologyLightTheme"
aria-hidden="true" density="default"
style="font-size: 28px; height: 28px; width: 28px;"></i></div>
<div class="v-alert__content">

          `+ (m !== null ? `<div class="v-alert-title">` +md.utils.escapeHtml(m[1])+ `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });


    md.use(markdownContainer, "spoiler", {
      validate: function(params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
      render: function (tokens: any, idx: any) {
        const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

        } else {
          // closing tag
          return '</details>\n';
        }
      }
    });
    // md.use(frontMatter, function (fm) {
    //   const doc = yaml.load(fm)
    //   // console.warn(doc)
    //   // const appStore = useAppStore();
    //   // if (doc.documentTitle) {
    //   //   appStore.setDocumentTitle(doc.documentTitle);
    //   //   window.document.title = doc.documentTitle
    //   // } else {
    //   //   appStore.setDocumentTitle('Techology Support');
    //   //   window.document.title = 'Techology Support'
    //   // }
    // });
  },
});
