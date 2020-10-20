const fs = require('fs')
const {resolve} = require('path')
const customDescription = require('../../client/src/libs/descriptionHTML')
const shopifyconfig = require('../config/shopify.config')
const axios = require('axios')

///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                            /* update title txt file */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////



const updateProduct = async(obj_product) => {
	let product = obj_product

	/* obj_product
	{
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
  } */

  let type = product.type
  let fullpath = product.fullpath
  let product_id = product.product_id
  let product_title = product.product_title
  let title = product.title
  let old_title = product.old_title
  let access = product.access ? true : false
  let variants =[]

  if(product.blanco && product.blanco_old) {
		variants.push({a: product.blanco, b: product.blanco_old})
  }
  if(product.negro && product.negro_old) {
    variants.push({a: product.negro, b: product.negro_old})
  }
  if(product.gris && product.gris_old) {
    variants.push({a: product.gris, b: product.gris_old})
  }
  if(product.azul && product.azul_old) {
    variants.push({a: product.azul, b: product.azul_old})
  }
  if(product.azul_opaco && product.azul_opaco_old) {
    variants.push({a: product.azul_opaco, b: product.azul_opaco_old})
  }
  if(product.azul_marino && product.azul_marino_old) {
    variants.push({a: product.azul_marino, b: product.azul_marino_old})
  }
  if(product.rojo && product.rojo_old) {
    variants.push({a: product.rojo, b:product.rojo_old})
  }
  if(product.gris_oscuro && product.gris_oscuro_old) {
    variants.push({a: product.gris_oscuro, b: product.gris_oscuro_old})
  }
  if(product.verde_agua && product.verde_agua_old) {
    variants.push({a: product.verde_agua, b:product.verde_agua_old})
  }
  if(product.verde_oscuro && product.verde_oscuro_old) {
    variants.push({a: product.verde_oscuro, b: product.verde_oscuro_old})
  }
  if(product.vinotinto && product.vinotinto_old) {
    variants.push({a: product.vinotinto, b: product.vinotinto_old})
	}
	
	variants.forEach(item=> {
		if(item.a !== item.b){
			try {
				fs.renameSync(resolve(fullpath, item.b), resolve(fullpath, item.a))
				console.log('old: ',item.b,' | ', 'rename: ', item.a)
			} catch (error) {
				console.log(error)
			}
		}
	})


  if (old_title !== title){
    try {
			fs.writeFileSync(resolve(fullpath, "__title__.txt"), title.toString())

      if (access && title !== product_title) {
        try {
          const update = await axios.put(`https://${shopifyconfig.API_key}:${shopifyconfig.password}@${shopifyconfig.store_admin}/api/2020-10/products/${product_id}.json`, {
            product: {
              id: product_id,
              title,
              body_html: customDescription(title, type)
            }
          })

          if(update.status == 200){
            try {
              fs.writeFileSync(resolve(fullpath, "__shopify__.json"), JSON.stringify(update.data.product))
              console.log('update file ___shopify__.json in: ', product);
            } catch (error) {
              console.log('error: ', error, product)
            }
          }
          // console.log(update.status, update.data)
        } catch (error) {
          console.log(error)
				}
				
      }
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = updateProduct;