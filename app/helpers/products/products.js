const {resolve} = require('path')
const fs = require('fs')
const {checkErrors, checkType, checkColor, ckeckPrice, checkHandle} = require('../checks')
const { v4: uuidv4 } = require('uuid');


const readfolder = (...rest) => {
	const productsArr = [];
	const duplicatesArr = [];

	try {
	
		rest.forEach((item) => {
			const dir = item.collection;
			fs.readdirSync(dir).forEach(collection => {
				fs.readdirSync(resolve(dir, collection)).forEach(product => {
					let title;
					let variants = []
					let cloudstatus = {
						file: false,
						data: false
					}
					let errors = checkHandle(product)
					fs.readdirSync(resolve(dir, collection, product)).forEach(variant => {
						if (variant === '__shopify__.json') {
							try {
								cloudstatus.file = true
								cloudstatus.data = JSON.parse(fs.readFileSync(resolve(dir, collection, product, variant), {encoding:"utf-8"}))
							} catch (error) {
								console.log('read "__shopify__ file": ', error, product)
							}
							return;
						} 
						if (variant === '__title__.txt' || variant === '__shopify__.json') {
							try {
								title = fs.readFileSync(resolve(dir, collection, product, variant), {encoding:"utf-8"})
							} catch (error) {
								console.log('errror reading "__title__ file": ', error, product)
							}
							return
						} 
						const errors = checkErrors(variant)
						const type = checkType(variant)
						const {precio, costo} = ckeckPrice(type)
						const {color, sort} = checkColor(variant)
						variants.push({path: resolve(dir, collection, product, variant),sort, type, color, variant,precio, costo, errors, })
					})
					productsArr.push({
						cloudstatus,
						uuid: uuidv4(),
						path: resolve(dir, collection, product),
						collection,
						handle: product,
						title,
						variants,
						errors
					})
				})
			})
		})
		
	} catch (err) {
		console.log('[function] readfolder() fail: ',err)
	}


	productsArr.map(item => item.handle).reduce(function(acc, el, i, arr) {
		if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
	}, []).forEach(dupe => {
		productsArr.filter(item => item.handle === dupe).forEach(res => duplicatesArr.push(res))
	})

	let collections = productsArr.map(item => item.collection).reduce((arr, current)=> arr.includes(current) ? arr : [...arr, current],[])

	return {products: productsArr, handles: productsArr.map(item => item.handle),collections, duplicates: duplicatesArr}
}

module.exports = readfolder;
