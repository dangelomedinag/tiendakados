const {Router} = require('express');
const config = require('../config/index')
const {errLogs, detectColor, detectType, detectPrice, renameFileTofolder, errLogsProducts} = require('./errorslog')
const path = require('path')
const fs = require('fs')
const router = Router()
const { v4: uuidv4 } = require("uuid");

// Iterate through the routes object and mount the routes
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

/* end router functions */

const readFolder = (...rest) =>{
	let productArr = []

  rest.forEach(obj => {
    let dir = obj.collection;
		let imgs = obj.images;
    
    try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach(product => {
					let caution = false;
					let warning = false;
					let listColors = [];
					let errFolderName = errLogsProducts(product)
					if (errFolderName.length > 0 ) {
						warning=true
					}
          let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
          variantsArr.forEach(variant => {
						let type = detectType(variant)
						
						let {color} = detectColor(variant,type)
						let logs = errLogs(variant)
						listColors.push({color,filename: variant, errors: logs})

						if (logs.length > 0 ) {
							caution=true
						}
					})

					let productObj = {
						folder: dir,
						collection,
						handle: product,
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


/* end folder Iterartor */

/* Update name folder */


const updateFolder = (handel, newhandel) => {
	let dirs = [config.menDir.collection, config.womanDir.collection, config.poleronDir.collection]
	dirs.forEach(dir =>{

		let collectionsArr = fs.readdirSync(dir);
		collectionsArr.forEach(collection => {
			let foldersArr = fs.readdirSync(path.resolve(dir, collection));
			foldersArr.forEach(folder => {
				if (folder === handel) {
					try {
						fs.renameSync(path.resolve(dir, collection, folder), path.resolve(dir, collection, newhandel))
					} catch (error) {
						console.log(error)
					}
	
					return true
				}
			})
		})
	})

}


/* end Update name folder */



/* Update name filename */


const updateFilename = (handel, newhandel) => {
	let dirs = [config.menDir.collection, config.womanDir.collection, config.poleronDir.collection]

	dirs.forEach(dir => {
		let collectionsArr = fs.readdirSync(dir);
		collectionsArr.forEach(collection => {
			let foldersArr = fs.readdirSync(path.resolve(dir, collection));
			foldersArr.forEach(product => {
				let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
				variantsArr.forEach(variant => {	
					if (variant === handel) {
						try {
							fs.renameSync(path.resolve(dir, collection, product, variant), path.resolve(dir, collection, product, newhandel))
						} catch (error) {
							console.log(error)
						}
		
						return true
					}
				})
			})
		})
	})
}


/* end Update name folder */

/* update name filename */

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
					let listColors = [];
					let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
					let type  = '';
          variantsArr.forEach(variant => {
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
						title:
							product.toString().split("_")[0].charAt(0).toUpperCase() +
							product.toString().split("_")[0].slice(1) +
							" " +
							product.toString().split("_").slice(1).join(" "),
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
	// console.log(productArr)
	return productArr
}
/* end update name filename */

/* fixed name filename with folder name */

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

/* end fixed name filename with folder name */

module.exports = {
	route,
	readFolder,
	updateFolder,
	updateFilename,
	getProducts,
	fixedFilestoFolder
}