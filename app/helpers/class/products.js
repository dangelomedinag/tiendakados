const { poleronDir, menDir, womanDir } = require("../../config")
const {resolve} = require('path')
const fs = require('fs')
const {checkErrors, checkType, checkColor, ckeckPrice} = require('../checks')

let dirs=[menDir, womanDir, poleronDir]

const readfolder = (...rest) => {
	const productsArr = [];
	const duplicatesArr = [];

	try {
	
		rest.forEach((item) => {
			const dir = item.collection;
			fs.readdirSync(dir).forEach(collection => {
				fs.readdirSync(resolve(dir, collection)).forEach(product => {
					let variants = []
					fs.readdirSync(resolve(dir, collection, product)).forEach(variant => {
						const errors = checkErrors(variant)
						const type = checkType(variant)
						const {precio, costo} = ckeckPrice(type)
						const {color, sort} = checkColor(variant)
						variants.push({path: resolve(dir, collection, product, variant),sort, type, color, variant,precio, costo, errors, })
					})
					productsArr.push({
						path: resolve(dir, collection, product),
						collection,
						handle: product,
						variants,
					})
				})
			})
		})
		
	} catch (err) {
		console.log(err)
	}


	productsArr.map(item => item.handle).reduce(function(acc, el, i, arr) {
		if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
	}, []).forEach(dupe => {
		duplicatesArr.push(productsArr.filter(item => item.handle === dupe))
	})

	return {products: productsArr, duplicates: duplicatesArr}
}

console.log(readfolder(...dirs).products[10].variants)
// console.log(readfolder(...dirs).duplicates)