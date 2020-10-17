const shopConfig = require('../config/shopify.config')
const h = require('../helpers/shopifyhelpers');
const axios = require('axios');



module.exports = () =>{
  let routes = {
    'get': {
			'/': (req, res)=>{
				res.render('index-shopify', { shopConfig } )
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
