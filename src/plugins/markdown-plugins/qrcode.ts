import QrCode from "qrcodejs"

export function qrCodePlugin(md) {
  // Regular expression to match the custom QR code syntax
  const qrCodeRegex = /@\[(qrcode)\]\(([^)]+)\)(?:\{size=(\d+)\})?/;

  // Parsing rule to identify and process the QR code syntax
  md.inline.ruler.before('link', 'qrcode', (state, silent) => {
    const src = state.src.slice(state.pos);
    const match = qrCodeRegex.exec(src);

    if (!match) return false;
    if (silent) return false;

    const token = state.push('qrcode', '', 0);
    token.content = match[2]; // The link
    token.info = match[3] || ''; // The size, if present

    state.pos += match[0].length;
    return true;

  });

  // Rendering rule to generate the QR code
  md.renderer.rules.qrcode = (tokens, idx) => {
    const link = tokens[idx].content;
    const size = parseInt(tokens[idx].info, 10) || 200; // Default size

    // Generate QR code data URL
    const qrCodeDataUrl = link
    // QRCode.toDataURL(link, {width: size, margin: 1}, (err, url) => {
    //   if (err) {
    //     console.error('QR Code generation failed:', err);
    //     return '';
    //   }
    //   qrCodeDataUrl = url;
    // });

    setTimeout(() => {
      const matrix = QrCode.generate(qrCodeDataUrl);
      const text = QrCode.render('svg', matrix,);

      document.getElementById(qrCodeDataUrl).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" width="${size}" height="${size}" viewBox="-4.5 -4.5 37 37" shape-rendering="crispEdges">` + text + `</svg>`
      // console.log(text);
      // document.getElementById(md.utils.escapeHtml(m[1])).src = uri;
      // QRCode.toCanvas(document.getElementById(md.utils.escapeHtml(m[1])), md.utils.escapeHtml(m[1]), function (error) {
      //   if (error) console.error(error)
      //   console.log('success!');
      // })
      // new QRCode(document.getElementById(md.utils.escapeHtml(m[1])), md.utils.escapeHtml(m[1]))
    }, 500)
    // Return the HTML image tag with the QR code
    return ` <div id="${qrCodeDataUrl}"/></div>`
    // return `<img src="${qrCodeDataUrl}" alt="QR Code" width="${size}" height="${size}" />`;
  };
}
