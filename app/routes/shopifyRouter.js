const shopConfig = require('../config/shopify.config')
const h = require('../helpers/shopifyhelpers');
const axios = require('axios');



module.exports = () =>{
  let routes = {
    'get': {
			'/pagination': async(req, res)=>{
				let productsArr;
				let nextlink;
				try {
					const {data, headers} =await axios(`https://${shopConfig.API_key}:${shopConfig.password}@${shopConfig.store_admin}/api/2020-10/products.json?direction=next&limit=10`)
					nextlink = headers.link.match(/(page_info=\w+)/g)
					console.log(nextlink)
					productsArr = data.products
				} catch (error) {
					console.log(error)
				}
				res.render('index-shopify', {productsArr , nextlink: nextlink})
			},
			'/pagination/:pageid': async(req, res)=>{
				const {pageid} = req.params
				let productsArr;
				let nextlink;
				try {
					const {data, headers} =await axios(`https://${shopConfig.API_key}:${shopConfig.password}@${shopConfig.store_admin}/api/2020-10/products.json?limit=10&page_info=${pageid}`)
					nextlink = headers.link
					console.log(nextlink)
					productsArr = data.products
				} catch (error) {
					console.log(error)
				}
				res.render('index-shopify', {productsArr , nextlink: nextlink[0]})
			},
			'/products': async(req, res)=>{
				try {
					let {data} = await axios(`https://${shopConfig.API_key}:${shopConfig.password}@${shopConfig.store_admin}/api/2020-10/products.json`)
					let product = await data.products.filter(res => res.handle === '1990s_cassette_colores')
					res.status(200).json(product).end()
					
				} catch (error) {
					res.status(500).send(error).end()
				}
			},
		},
    'post': {},
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }
  return h.route(routes);
}
