/*      fileListArr.forEach((item) => {
        // check if exist property webkitRelativePath
          let defPropsBranch = {
            isImage: false,
            EspCharacter: false,
            typeProduct: false,
            collection: false,
            handle: false,
            errors: [],
          };
          let product = {
            handle: null,
            collection: null,
            type: null,
            imageSrc: null,
            color: null,
            filename: null,
          };

          // split with default delimiter('/'')
          let path = item.webkitRelativePath.split('/');
          let filename = path[path.length - 1];
          let handle = path[path.length - 2];
          let collection = path[path.length - 3];

          if (filename) {
            product.filename = filename;
            product.imageSrc = filename;
          } else {
            defPropsBranch.errors.push({
              filename: item.webkitRelativePath,
              type: 'sin nombre de archivo',
              log:
                'no se encontro el arhivo que indica la variante del producto',
            });
          }
          if (collection) {
            defPropsBranch.collection = true;
            product.collection = collection;
          } else {
            defPropsBranch.errors.push({
              filename: filename,
              type: 'sin colección',
              log: 'no se encontro la carpeta que indica la colección',
            });
          }
          if (handle) {
            defPropsBranch.handle = true;
            product.handle = handle;
          } else {
            defPropsBranch.errors.push({
              filename: filename,
              type: 'sin nombre de product',
              log:
                'no se encontro la carpeta que indica el nombre del producto',
            });
          }

          // check if the last item of the path is a Image File
          if (filename.includes('.jpg') || filename.includes('.png')) {
            defPropsBranch.isImage = true;
          } else {
            defPropsBranch.isImage = false;
            defPropsBranch.errors.push({
              filename: filename,
              type: filename.slice(-4),
              log: 'extensión de archivo invalida',
            });
          }

          // check if the Filename start with Type product name
          if (
            filename.includes('Polera_', 0) ||
            filename.includes('Poleron_', 0)
          ) {
            defPropsBranch.typeProduct = true;
            product.type = filename.split('_')[0];
          } else {
            defPropsBranch.typeProduct = false;
            defPropsBranch.errors.push({
              filename: filename,
              type: filename.split('_')[0],
              log: 'Tipo de producto no reconocido',
            });
          }

          // check if the Filename includes special characters
          if (filename.includes('_.')) {
            defPropsBranch.EspCharacter = true;
            defPropsBranch.errors.push({
              filename: filename,
              type: filename.slice(-5),
              log:
                'El nombre del archivo no puede finalizar con "_"(guión bajo) justo antes de la extension',
            });
          }
          if (filename.includes('ñ')) {
            let strfail = filename.charAt(filename.indexOf('ñ'));

            defPropsBranch.EspCharacter = true;
            defPropsBranch.errors.push({
              filename: filename,
              type: strfail,
              log:
                'nombre de archivo NO puede contener caracteres como "ñ", "Ñ", "ç" ni acentos',
            });
          }
          if (filename.includes(' ')) {
            defPropsBranch.EspCharacter = true;
            defPropsBranch.errors.push({
              filename: filename,
              type:
                filename.slice(0, filename.indexOf(' ')) +
                ' [--AQUI HAY UN ESPACIO--] ' +
                filename.slice(filename.indexOf(' ') + 1),
              log:
                'Nombre de archivo no puede contener espacios ej: "Polera_negra_fanstasma Mario" puede agregar un "_" o "-" para solucionarlo',
            });
          }

          // assing color for product
          filename.includes('_azul_marino')
            ? (product.color = 'azul marino')
            : '';

          filename.includes('_azul_opaco')
            ? (product.color = 'azul opaco')
            : '';

          filename.includes('_azul') &&
          !filename.includes('opaco') &&
          !filename.includes('marino')
            ? (product.color = 'azul')
            : '';
          filename.includes('_blanca_') ? (product.color = 'blanco') : '';

          filename.includes('_gris_') && !filename.includes('oscuro')
            ? (product.color = 'gris')
            : '';
          filename.includes('_gris_oscuro')
            ? (product.color = 'gris oscuro')
            : '';
          filename.includes('_negra_') ? (product.color = 'negro') : '';
          filename.includes('_roja_') ? (product.color = 'rojo') : '';
          filename.includes('_verde_agua')
            ? (product.color = 'verde agua')
            : '';
          filename.includes('_verde_oscuro')
            ? (product.color = 'verde oscuro')
            : '';
          filename.includes('_vinotinto_') ? (product.color = 'vinotinto') : '';

          // return console.log(defPropsBranch);
          if (defPropsBranch.errors.length > 0) {
            fileslogs.push(defPropsBranch);
          } else {
            products.push(product);
          }
        
      });
      let aaa = products
        .map((res) => res.handle)
        .reduce(
          (tarr, curr) => (tarr.includes(curr) ? tarr : [...tarr, curr]),
          []
        );
      let bbb = products;
      aaa.forEach((item) => {
        let productFine = {
          collection: null,
          handle: item,
          type: null,
          variants: [],
        };
        // console.log(productFine);
        // console.log(bbb.filter((it) => it.handle === item));

        bbb
          .filter((it) => it.handle === item)
          .forEach((vari) => {
            productFine.collection = vari.collection;
            productFine.type = vari.type;
            productFine.variants.push({
              imageSrc: vari.imageSrc,
              color: vari.color,
            });
          });

        data.push(productFine);
      });

      if (fileslogs.length == 0) {
        setTimeout(() => {
          dispatch('offloading', { data: data });
        }, 400);
      } else {
        dispatch('onloading', {
          message: `Se encontraron (${fileslogs.length}) problema(s):`,
          messageobj: fileslogs,
        });
      }
    }

  */


/* //////////////////////////////////////// */
const {polera_H, polera_M, polerones, colores} = require('../config/tienda.config').productsconfig
const path = require('path')


const checkErrors = (variant) => {
	if (path.extname(variant) === '.txt' || path.extname(variant) === '.json'){
		return []
	}
  let errors = [];
 
  // 1
  // check if the last item of the path is a Image File
  if (variant.includes('.jpg') || variant.includes('.png')) {
  } else {
    errors.push('extensión de archivo invalida');
  }

  // 2
  // check if the Filename start with Type product name
  if (
    variant.includes('Polera_', 0) ||
    variant.includes('Poleron_', 0)
  ) {
	}else{
    errors.push('Tipo de producto no reconocido');
	}

  // 3
  // check if the Filename includes special characters
  if (variant.includes('_.')) {
    errors.push('El nombre del archivo no puede finalizar con "_" (guión bajo) justo antes de la extension');
	}
	
  if (variant.includes('ñ')) {
    errors.push('nombre de archivo NO puede contener caracteres como "ñ", "Ñ", "ç" ni acentos');
	}
	
  if (variant.includes(' ')) {
    errors.push('Nombre de archivo no puede contener espacios ej: "Polera_negra_fanstasma Mario" puede agregar un "_" o "-" para solucionarlo');
	}
	
	if (variant.includes("&") || variant.includes("¿") || variant.includes("¡") || variant.includes("!") || variant.includes("@") || variant.includes("#") || variant.includes("$") || variant.includes("'") || variant.includes(" ") || variant.includes("á") || variant.includes("é") || variant.includes("í") || variant.includes("ú") || variant.includes("ú") || variant.includes("à") || variant.includes("è") || variant.includes("ì") || variant.includes("ò") || variant.includes("ù")|| variant.includes("ñ") || variant.includes("~") || variant.includes("(") || variant.includes(")") || variant.includes(",") || variant.includes("=") || variant.includes('"') || variant.includes("?") || variant.includes("/") || variant.includes("\\") || variant.includes("*") || variant.includes("ç") || variant.includes("<") || variant.includes(">") || variant.includes("+")) {
		errors.push('Nombre de archivo no puede contener caracteres espaciales ni espacios en blanco. ej: "&", "¿", "¡", "!", "@", "#", "$", " ", "á", "é", "í", "ú", "ú", "à", "è", "ì", "ò", "ù", "ñ", "~", "(", ")",",","=","?","/","*","ç","<",">","+"')
	}
 
  return errors
}

const checkColor = (variant, type) =>{
	if (path.extname(variant) === '.txt' || path.extname(variant) === '.json'){
		return {color: 'system', sort: 'system'}
	}
  // assing color for product
  if (variant.includes('_blanca_')){
    return {color: colores.blanco, sort: type === polera_H.name || type ===  polera_M.name ? 'a' : 'e'}
  }

  if (variant.includes('_negra_') || variant.includes('_negro_')){
    return {color: colores.negro, sort: type === polera_H.name || type ===  polera_M.name ? 'b' : 'b'}
  }

  if (variant.includes('_gris_') && !variant.includes('_oscuro_')){
    return {color: colores.gris, sort: type === polera_H.name || type ===  polera_M.name ? 'c' : 'a'}
  }

  if (variant.includes('_gris_oscuro')){
    return {color: colores.gris_osc, sort: type === polera_H.name || type ===  polera_M.name ? 'd' : 'f'}
  }

  if (variant.includes('_azul_') &&
  !variant.includes('_opaco') &&
  !variant.includes('_marino_')){
    return {color: colores.azul, sort: type === polera_H.name || type ===  polera_M.name ? 'e' : 'c'}
  }

  if (variant.includes('_azul_marino_')) {
    return {color: colores.azul_mar, sort: type === polera_H.name || type ===  polera_M.name ? 'f' : 'g'}
  }

  if (variant.includes('_azul_opaco')) {
    return {color: colores.azul_opa, sort: type === polera_H.name || type ===  polera_M.name ? 'g' : 'h'}
  }

  if (variant.includes('_roja_') || variant.includes('_rojo_')){
    return {color: colores.rojo, sort: type === polera_H.name || type ===  polera_M.name ? 'h' : 'd'}
  } 

  if (variant.includes('_verde_agua_')){
    return {color: colores.verde_agu, sort: type === polera_H.name || type ===  polera_M.name ? 'i' : 'i'}
  }

  if (variant.includes('_verde_oscuro_')){
    return {color: colores.verde_osc, sort: type === polera_H.name || type ===  polera_M.name ? 'j' : 'j'}
  }
   
  if (variant.includes('_vinotinto_')){
    return {color: colores.vinotinto, sort: type === polera_H.name || type ===  polera_M.name ? 'k' : 'k'}
  }
  
}

const checkType = (variant) =>{
	if (path.extname(variant) === '.txt' || path.extname(variant) === '.json'){
		return 'system'
	}

  // check if the Filename start with Type product name
  if (
    variant.includes('Polera_', 0) && !variant.includes('_mj_')
  ) {
    return polera_H.name
  }
  if (
    variant.includes('Polera_', 0) && variant.includes('_mj_')
  ) {
    return polera_M.name
  }
  if (
    variant.includes('Poleron_', 0)
  ) {
    return polerones.name
  }
}

const ckeckPrice = (type) =>{
	if (type === 'system'){
		return {precio: 'system', costo: 'system'}
	}

  // check if the Filename start with Type product name
  if (
    type === polera_H.name || type === polera_M.name
  ) {
    return {precio: polera_H.precio, costo: polera_H.costo}
  }else {
    return {precio: polerones.precio, costo: polerones.costo}
  }
}


const renameFileTofolder = (product, variant, type, color) =>{
	// assing name product to file's variant name
	if (path.extname(variant) === '.txt' || path.extname(variant) === '.json'){
		return 'system'
	}
  // console.log(product, variant, type, color)
  let listArrPoleraHombre = [
    {color: colores.blanco, base: 'Polera_blanca_'},
    {color: colores.negro, base: 'Polera_negra_'},
    {color: colores.gris, base: 'Polera_gris_'},
    {color: colores.gris_osc, base: 'Polera_gris_oscuro_'},
    {color: colores.azul, base: 'Polera_azul_'},
    {color: colores.azul_mar, base: 'Polera_azul_marino_'},
    {color: colores.azul_opa, base: 'Polera_azul_opaco_'},
    {color: colores.rojo, base: 'Polera_azul_roja_'},
    {color: colores.verde_agu, base: 'Polera_verde_agua_'},
    {color: colores.verde_osc, base: 'Polera_verde_oscuro_'},
    {color: colores.vinotinto, base: 'Polera_vinotinto_'}
  ]
  let listArrPoleraMujer = [
    {color: colores.blanco, base: 'Polera_blanca_mj_'},
    {color: colores.negro, base: 'Polera_negra_mj_'},
    {color: colores.gris, base: 'Polera_gris_mj_'},
    {color: colores.gris_osc, base: 'Polera_gris_oscuro_mj_'},
    {color: colores.azul, base: 'Polera_azul_mj_'},
    {color: colores.azul_mar, base: 'Polera_azul_marino_mj_'},
    {color: colores.azul_opa, base: 'Polera_azul_opaco_mj_'},
    {color: colores.rojo, base: 'Polera_azul_roja_mj_'},
    {color: colores.verde_agu, base: 'Polera_verde_agua_mj_'},
    {color: colores.verde_osc, base: 'Polera_verde_oscuro_mj_'},
    {color: colores.vinotinto, base: 'Polera_vinotinto_mj_'}
  ]
  
  let listArrPolerones = [
    {color: colores.gris, base: 'Poleron_gris_'},
    {color: colores.negro, base: 'Poleron_negro_'},
    {color: colores.azul, base: 'Poleron_azul_'},
    {color: colores.rojo, base: 'Poleron_rojo_'},
    // {color: colores.blanco, base: 'Poleron_blanca_'},
    // {color: colores.gris_osc, base: 'Poleron_gris_oscuro_'},
    // {color: colores.azul_mar, base: 'Poleron_azul_marino_'},
    // {color: colores.azul_opa, base: 'Poleron_azul_opaco_'},
    // {color: colores.verde_agu, base: 'Poleron_verde_agua_'},
    // {color: colores.verde_osc, base: 'Poleron_verde_oscuro_'},
    // {color: colores.vinotinto, base: 'Poleron_vinotinto_'}
  ]


  if (type === polera_H.name){
    let select = listArrPoleraHombre.filter(item => item.color === color)
    let newName = select[0].base+product.toLowerCase()+variant.slice(-4);
    
    return newName
  }

  if (type === polera_M.name){
    let select = listArrPoleraMujer.filter(item => item.color === color)
    let newName = select[0].base+product.toLowerCase()+variant.slice(-4);
    
    return newName
  }

  if (type === polerones.name){
    let select = listArrPolerones.filter(item => item.color === color)
    let newName = select[0].base+product.toLowerCase()+variant.slice(-4);
    
    return newName
  }
}



const checkHandle = (product) => {
  let errors = [];
  
  /* folder */
  if (product.includes("-") || product.includes("&") || product.includes("¿") || product.includes("¡") || product.includes("!") || product.includes("@") || product.includes("#") || product.includes("$") || product.includes("'") || product.includes(" ") || product.includes("á") || product.includes("é") || product.includes("í") || product.includes("ú") || product.includes("ú") || product.includes("à") || product.includes("è") || product.includes("ì") || product.includes("ò") || product.includes("ù")|| product.includes("ñ") || product.includes("~") || product.includes("(") || product.includes(")") || product.includes(",") || product.includes(".") || product.includes("=") || product.includes('"') || product.includes("?") || product.includes("/") || product.includes("\\") || product.includes("*") || product.includes("ç") || product.includes("<") || product.includes(">") || product.includes("+"))  {
  errors.push('Nombre de carpeta no puede contener caracteres espaciales ni espacio en blanco')}

  return errors
}

const parseDescription = (product) =>{
	return product.replace(/(_|-|\.)/g," ")
}

module.exports = {checkErrors, checkColor, checkType, ckeckPrice, checkHandle, renameFileTofolder, }