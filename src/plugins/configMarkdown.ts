import {config} from "md-editor-v3";
import markdownContainer from "markdown-it-container";
import {qrCodePlugin} from "@/plugins/markdown-plugins/qrcode";


config({


  markdownItConfig(md) {
    md.use(qrCodePlugin)
//     md.use(markdownContainer, "qrcode", {
//
//       render: function (tokens: any, idx: any) {
//
//
//         console.log(tokens[idx].info);
//         const m = tokens[idx].info.trim().match(/^qrcode\s+(.*)$/);
//         console.log(m);
//         if (m !== null && m !== undefined && m.length > 0 && m[1] !== undefined) {
//           setTimeout(() => {
//             const matrix = QrCode.generate(md.utils.escapeHtml(m[1]));
//             const text = QrCode.render('svg', matrix,);
//
//             document.getElementById(md.utils.escapeHtml(m[1])).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" width="12em" height="12em" viewBox="-4.5 -4.5 37 37" shape-rendering="crispEdges">` + text + `</svg>`
//             // console.log(text);
//             // document.getElementById(md.utils.escapeHtml(m[1])).src = uri;
//             // QRCode.toCanvas(document.getElementById(md.utils.escapeHtml(m[1])), md.utils.escapeHtml(m[1]), function (error) {
//             //   if (error) console.error(error)
//             //   console.log('success!');
//             // })
//             // new QRCode(document.getElementById(md.utils.escapeHtml(m[1])), md.utils.escapeHtml(m[1]))
//           }, 500)
//           return `
//           <div id="${md.utils.escapeHtml(m[1])}"></div>
// `
//         }
//         return ''
//
//
// //         if (tokens[idx].nesting === 1) {
// //           // opening tag
// //           return `
// //           <div class="v-alert v-theme--techologyLightTheme bg-info v-alert--density-default v-alert--variant-flat" role="alert">
// // <span class="v-alert__underlay"></span>
// //   <div class="v-alert__prepend"><i class="mdi-information-outline mdi v-icon notranslate v-theme--techologyLightTheme"
// // aria-hidden="true" density="default"
// // style="font-size: 28px; height: 28px; width: 28px;"></i></div>
// // <div class="v-alert__content">
// // ` + (m !== null ? `<div class="v-alert-title">` + md.utils.escapeHtml(m[1]) + `</div>` : '')
// //
// //         } else {
// //           // closing tag
// //           return '</div></div>';
// //         }
//       }
//     });
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
` + (m !== null ? `<div class="v-alert-title">` + md.utils.escapeHtml(m[1]) + `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "warning", {

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
          ` + (m !== null ? `<div class="v-alert-title">` + md.utils.escapeHtml(m[1]) + `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "error", {

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

          ` + (m !== null ? `<div class="v-alert-title">` + md.utils.escapeHtml(m[1]) + `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });
    md.use(markdownContainer, "success", {

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

          ` + (m !== null ? `<div class="v-alert-title">` + md.utils.escapeHtml(m[1]) + `</div>` : '')

        } else {
          // closing tag
          return '</div></div>';
        }
      }
    });


    md.use(markdownContainer, "spoiler", {
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
