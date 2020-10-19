///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                           /* update title txt file */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

import {productsconfig} from '../config/tienda.config.js'

const customDescription = (title, tprod) => {
  return `<h3 style="font-weight: 600; font-size: 22px;">${title.toUpperCase()}</h3><hr style="border: 1px solid #f2f2f2;">
<h3 style="font-weight: 400;">${
    tprod === productsconfig.polerones.name ? "Un polerón" : "Una polera"
  } de algodón con diseño de ${title}</h3><p>${
    tprod === productsconfig.polerones.name ? "Polerón unisex" : "Polera"
  } de material fresco 100% algodon, agrega un poco de actitud a tu vida diaria con esta polera. El tejido de algodón te ofrece una sensación de total comodidad.</p>`;
}


const updateProduct = (obj_product) => {
  let product = {
    type: "Poleras hombre",
    fullpath: "C:\\Users\\DiseñoPC\\Desktop\\kados-notocar\\colecciones-poleras-hombre\\animales\\gato_cayendo",
    product_id: "5720384962725",
    product_title: "Gato cayendo",
    product_html: "<h3 style=\"font-weight: 600; font-size: 22px;\">GATO CAYENDO</h3><hr style=\"border: 1px solid #f2f2f2;\"> <h3 style=\"font-weight: 400;\">Una polera de algodón con diseño de Gato cayendo</h3><p>Polera de material fresco 100% algodon, agrega un poco de actitud a tu vida diaria con esta polera. El tejido de algodón te ofrece una sensación de total comodidad.</p>",
    old_title: "Gato cayendo",
    title: "Gato cayendo",
    handle: "gato_cayendo",
    azul: "Polera_azul_gatogarra.png",
    azul_opaco: "Polera_azul_opacogatogarra.png",
    blanco: "Polera_blanca_gatogarra.png",
    gris: "Polera_gris_gatogarra.png",
    gris_oscuro: "Polera_gris_oscuro_gatogarra.png",
    rojo: "Polera_roja_gatogarra.png",
    verde_agua: "Polera_verde_agua_gatogarra.png",
    verde_oscuro: "Polera_verde_oscuro_gatogarra.png",
    vinotinto: "Polera_vinotinto_gatogarra.png",
    access: "on"
  }

  let type = product.type
  let fullpath = product.fullpath
  let product_id = product.product_id
  let product_html = product.product_html
  let product_title = product.product_title
  let title = product.title
  let old_title = product.old_title
  let html = product.product_html
  let access = product.access ? true : false
  let variants =[]

  if(product.blanco) {
    variants.push(product.blanco)
  }
  if(product.negro) {
    variants.push(product.blanco)
  }
  if(product.gris) {
    variants.push(product.blanco)
  }
  if(product.azul) {
    variants.push(product.blanco)
  }
  if(product.azul_opaco) {
    variants.push(product.blanco)
  }
  if(product.azul_marino) {
    variants.push(product.blanco)
  }
  if(product.rojo) {
    variants.push(product.blanco)
  }
  if(product.gris_oscuro) {
    variants.push(product.blanco)
  }
  if(product.verde_agua) {
    variants.push(product.blanco)
  }
  if(product.verde_oscuro) {
    variants.push(product.blanco)
  }
  if(product.vinotinto) {
    variants.push(product.blanco)
  }

  console.log(old_title,title,product_title)
  console.log('--------------------')
  // console.log(customDescription(title, type))

  // if (old_title !== title){

  //   try {
  //     fs.writeFileSync(path.resolve(fullpath, "__title__.txt"), title.toString())
  //     if (access && title !== product_title) {
  //       try {
  //         const update = await axios.put(`https://${shopifyconfig.API_key}:${shopifyconfig.password}@${shopifyconfig.store_admin}/api/2020-10/products/${product_id}.json`, {
  //           product: {
  //             id: product_id,
  //             title: newtitle,
  //             body_html: newhtml
  //           }
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  


	// try {
	// 	fs.writeFileSync(path.resolve(fullpath, "__title__.txt"), newtitle.toString())
	// 	try {
	// 		const update = await axios.put(`https://722f149a23db579ae9f14307c9344fe3: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@storetets.myshopify.com/admin/api/2020-10/products/${product_id}.json`, {
	// 			product: {
	// 				id: product_id,
	// 				title: newtitle
	// 			}
	// 		})
	// 		let res =  await update.data
	// 		console.log(res)
	// 	} catch (error) {
	// 		console.log('AQUIIIIIIIII: ',error)
	// 	}
	// } catch (error) {
	// 	console.log(error)
	// }
}

module.exports = updateProduct;