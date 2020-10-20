

const updateShopifyFile = (id) =>{

	try {
		let {data} = await axios.get(`https://${shopifyconfig.API_key}:${shopifyconfig.password}@${shopifyconfig.store_admin}/api/2020-10/products/${id}.json`)
		let product = await data.products
		console.log(product)
	} catch (error) {
		console.log(error)
	}
	
}