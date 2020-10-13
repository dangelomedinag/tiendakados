const path = require('path')

module.exports = {
  baseDir: path.resolve(__dirname, "../../.."),
  newfilesDir: path.resolve(__dirname, "../../..", "__uploadfiles"),
  menDir: {
    collection: path.resolve(__dirname, "../../..", "colecciones-poleras-hombre"),
    images:path.resolve(__dirname, "../../..", "images-hombre")},
  womanDir: {
    collection: path.resolve(__dirname, "../../..", "colecciones-poleras-mujer"),
    images:path.resolve(__dirname, "../../..", "images-mujer")},
  poleronDir: {
    collection: path.resolve(__dirname, "../../..", "colecciones-poleron"),
    images:path.resolve(__dirname, "../../..", "images-polerones")},
}