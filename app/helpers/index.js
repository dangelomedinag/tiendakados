const {Router} = require('express');
const config = require('../config/index')
const shopifyconfig = require('../config/shopify.config')
const {errLogs, detectColor, detectType, detectPrice, renameFileTofolder, errLogsProducts} = require('./errorslog')
const path = require('path')
const axios = require('axios').default;
const fs = require('fs')
const router = Router()
const { v4: uuidv4 } = require("uuid");



///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
            /* Iterate through the routes object and mount the routes */       
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

let _registerRoutes = (routes, method) => {
	for(let key in routes) {
		if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
			_registerRoutes(routes[key], key);
		} else {
			// Register the routes
			if(method === 'get') {
				router.get(key, routes[key]);
			} else if(method === 'post') {
				router.post(key, routes[key]);
			} else {
				router.use(routes[key]);
			}
		}
	}
}

let route = routes => {
	_registerRoutes(routes);
	return router;
}


///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                  /* read folder index (problems end edit) */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const readFolder = async(...rest) =>{
	let productArr = []
	let productShopifyArr = []
	let productShopifyArrHandles = []
	try {
		let {data} = await axios.get(`https://${shopifyconfig.API_key}:${shopifyconfig.password}@${shopifyconfig.store_admin}/api/2020-10/product_listings.json?limit=250`)
		productShopifyArr = await data.product_listings
		productShopifyArrHandles = await data.product_listings.map(res => res.handle)
		// console.log(productShopifyArrHandles)
	} catch (error) {
		console.log(error)
	}

  rest.forEach(obj => {
    let dir = obj.collection;
		let imgs = obj.images;
    
    try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach((product) => {
					let shopifyStatus = false
					let shopifyData = []
					if (productShopifyArrHandles.includes(product)){
						shopifyStatus =  true
						shopifyData = productShopifyArr.filter(item=> item.handle === product)
					} else {
						shopifyStatus =  false
					}
					let title = false;
					let caution = false;
					let warning = false;
					let listColors = [];
					let errFolderName = errLogsProducts(product)
					if (errFolderName.length > 0 ) {
						warning=true
					}
          let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
          variantsArr.forEach(variant => {
						if (variant === "__title__.txt") {
							try {
								title = fs.readFileSync(path.resolve(dir, collection, product, variant), {encoding:"utf-8"})
							} catch (error) {
								console.log(error)
							}
							return
						}
						let type = detectType(variant)
						let {color} = detectColor(variant,type)
						let logs = errLogs(variant)
						listColors.push({color,filename: variant, errors: logs})

						if (logs.length > 0 ) {
							caution=true
						}
					})

					let productObj = {
						shopifyStatus,
						shopifyData,
						folder: dir,
						collection,
						handle: product,
						title,
						variants: listColors,
						caution,
						warning,
						err: errFolderName,
					}
					
					productArr.push(productObj)
        })
      })
    } catch (err) {
      console.log('error', err)
    }
	})
	// console.log(productArr)
	return productArr
}

///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                          /* Update name folder */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const updateFolder = (fullpath, currenthandel, newhandel) => {

	try {
		fs.renameSync(path.resolve(fullpath, currenthandel), path.resolve(fullpath, newhandel))
	} catch (error) {
		console.log(error)
	}

}



///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                          /* Update name filename */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const updateFilename = (fullpath, currentfilename, newfilename) => {
	try {
		fs.renameSync(path.resolve(fullpath, currentfilename), path.resolve(fullpath, newfilename))
	} catch (error) {
		console.log(error)
	}
}



///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                          /* get product for API */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const getProducts = (rebuild, ...rest) => {
	let productArr = []

	if(rebuild) {

		let dirsImgArr = [config.menDir.images, config.womanDir.images, config.poleronDir.images]
		
		dirsImgArr.forEach(dir=>{
			let folderImages = fs.readdirSync(dir)
			folderImages.forEach(ele => {
				try {
					fs.unlinkSync(path.resolve(dir, ele))
				} catch (error) {
					console.log(error)
				}
			})
		})
	
		let folderForNews = fs.readdirSync(config.newfilesDir)
		folderForNews.forEach(ele => {
			try {
				fs.unlinkSync(path.resolve(config.newfilesDir, ele))
			} catch (error) {
				console.log(error)
			}
		})
	}


  rest.forEach(obj => {
    let dir = obj.collection;
		let imgs = obj.images;
		
    
    try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach(product => {
					let title = false;
					let titleDefault= product.toString().split("_")[0].charAt(0).toUpperCase() + product.toString().split("_")[0].slice(1) + " " + product.toString().split("_").slice(1).join(" ");
					let listColors = [];
					let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
					let type  = '';
          variantsArr.forEach(variant => {
						if (variant === "__title__.txt") {
							try {
								title = fs.readFileSync(path.resolve(dir, collection, product, variant), {encoding:"utf-8"})
							} catch (error) {
								console.log(error)
							}
							return
						}
						type = detectType(variant)
						let {color, sort} = detectColor(variant, type);
						// console.log(detectColor(variant,type))
						listColors.push({sort, color,  filename: variant, type,})

						// copy if not exist img variant in images's folder
						if(rebuild){
							try {
								fs.accessSync(path.resolve(imgs, variant), fs.constants.F_OK)
							} catch (err) {
								fs.copyFileSync(path.resolve(dir, collection, product, variant), path.resolve(imgs, variant))
								fs.copyFileSync(path.resolve(dir, collection, product, variant), path.resolve(config.newfilesDir, variant))
								console.log('copy file: ', variant);
							}
						}
					})
					let productObj = {
						collection,
						handle: product,
						title: title ? title : titleDefault,
						type,
						variantPrice: detectPrice(type).precio,
						costPerItem: detectPrice(type).costo,
						variants: listColors,
						uuid: uuidv4(),
					}
					
					productArr.push(productObj)
        })
      })
    } catch (err) {
      console.log('error', err)
    }
	})
	return productArr
}




///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                  /* fixed name filename with folder name */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const fixedFilestoFolder = (...rest) => {
  rest.forEach(obj => {
    let dir = obj.collection;
    
    try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach(product => {
          let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
          variantsArr.forEach(variant => {
						let type = detectType(variant)
						let {color} = detectColor(variant,type)
						let newName = renameFileTofolder(product,variant,type,color)
						try {
							fs.renameSync(path.resolve(dir, collection, product, variant), path.resolve(dir, collection, product, newName))
							console.log('old: ',variant, 'rename: ', newName)
						} catch (error) {
							console.log(error)
						}

					})
        })
      })
    } catch (err) {
      console.log('error', err)
    }
	})
}




///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                    /*create text file copy for handle */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const createTitleFromtxt = (...rest) => {
	rest.forEach(obj => {
		let dir = obj.collection

		try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach(product => {
					try {
						fs.accessSync(path.resolve(dir, collection, product, "__title__.txt"), fs.constants.F_OK)
					} catch (err) {
						let descriptionText = product.replace(/(_|-|\.)/g," ").toString();
						let toUpperCaseTitle = descriptionText.split(" ")[0].charAt(0).toUpperCase() +
						descriptionText.toString().split(" ")[0].slice(1) + " " + descriptionText.toString().split(" ").slice(1).join(" ")
						try {
							fs.writeFileSync(path.resolve(dir, collection, product, "__title__.txt"), toUpperCaseTitle)
							console.log('create file __title__.txt in: ', product);
						} catch (error) {
							console.log('error: ', error, product)
						}
					}
        })
      })
    } catch (err) {
      console.log('error', err)
    }
	})
}




/* update title txt file */
///////////////////////////////////////////////////////////////////////////////////////
/////                                                                             /////
                        /* update title txt file */
/////                                                                             /////
///////////////////////////////////////////////////////////////////////////////////////

const updateTitlefile = async(fullpath, currenttitle, newtitle, product_id) => {
	try {
		fs.writeFileSync(path.resolve(fullpath, "__title__.txt"), newtitle.toString())
		try {
			const update = await axios.put(`https://722f149a23db579ae9f14307c9344fe3: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@storetets.myshopify.com/admin/api/2020-10/products/${product_id}.json`, {
				product: {
					id: product_id,
					title: newtitle
				}
			})
			let res =  await update.data
			console.log(res)
		} catch (error) {
			console.log('AQUIIIIIIIII: ',error)
		}
	} catch (error) {
		console.log(error)
	}
}



module.exports = {
	route,
	readFolder,
	updateFolder,
	updateFilename,
	getProducts,
	fixedFilestoFolder,
	createTitleFromtxt,
	updateTitlefile
}