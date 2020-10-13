/* end router functions */

const readFolder = (...rest) =>{
	let productArr = []
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


  rest.forEach(obj => {
    let dir = obj.collection;
		let imgs = obj.images;
		let logs;
		
    
    try {
      let collectionsArr = fs.readdirSync(dir);
      collectionsArr.forEach(collection => {
        let foldersArr = fs.readdirSync(path.resolve(dir, collection));
        foldersArr.forEach(product => {
					let caution = false;
					let listColors = [];
          let variantsArr = fs.readdirSync(path.resolve(dir, collection, product));
          variantsArr.forEach(variant => {
						let color = detectColor(variant)
						let logs = errLogs(variant)
						listColors.push({color, filename: variant, errors: logs})

						if (logs.length > 0 ) {
							caution=true
						}

						// copy if not exist img variant in images's folder
            try {
              fs.accessSync(path.resolve(imgs, variant), fs.constants.F_OK)
            } catch (err) {
              fs.copyFileSync(path.resolve(dir, collection, product, variant), path.resolve(imgs, variant))
              fs.copyFileSync(path.resolve(dir, collection, product, variant), path.resolve(config.newfilesDir, variant))
              console.log('copy file: ', variant);
            }
					})
					let productObj = {
						collection,
						handle: product,
						variants: listColors,
						caution,
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