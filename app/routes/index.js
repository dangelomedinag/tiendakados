const h = require('../helpers');
const updateProduct = require('../helpers/updateproduct.js')
const readfolder = require('../helpers/products/products.js');
const config = require('../config/index')


module.exports = () =>{
  let routes = {
    'get': {
      '/': (req, res, next) => {
				const read = readfolder(config.menDir, config.womanDir, config.poleronDir)
				// console.log(read.products[0].cloudstatus)
        res.status(200).render('index', {
					products: read.products,
					duplicates: read.duplicates,
					collections: read.collections,
					handles: read.handles
				});
        res.end()
      },
      '/:type': (req, res, next) => {
        const {type} = req.params

        if(type === 'hombre'){
          const read = readfolder(config.menDir)
          res.status(200).render('index', {
            products: read.products,
            duplicates: read.duplicates,
            collections: read.collections,
            handles: read.handles
          });
          res.end()
        }else if(type === 'mujer'){
          const read = readfolder(config.womanDir)
          res.status(200).render('index', {
            products: read.products,
            duplicates: read.duplicates,
            collections: read.collections,
            handles: read.handles
          });
          res.end()
        }else if(type === 'poleron'){
          const read = readfolder(config.poleronDir)
          res.status(200).render('index', {
            products: read.products,
            duplicates: read.duplicates,
            collections: read.collections,
            handles: read.handles
          });
          res.end()
        }else{
          res.redirect('/');
          res.end()
        }
      },
      '/fn/renamefiles': (req, res, next) => {
        h.fixedFilestoFolder(config.menDir, config.womanDir, config.poleronDir)
        res.redirect('/');
        res.end()
      },
      '/fn/createtitletxt': async(req, res, next) => {
        await h.createTitleFromtxt(config.menDir, config.womanDir, config.poleronDir)
        res.redirect('/');
        res.end()
      },
      
      '/api/all': (req, res, next) => {
        let products = h.getProducts(false, config.menDir, config.womanDir, config.poleronDir)

        res.type("application/json");
        res.status(200);
        res.json(products);
        res.end();
      },
      '/api/poleras': (req, res, next) => {
        let products = h.getProducts(false, config.menDir, config.womanDir)

        res.type("application/json");
        res.status(200);
        res.json(products);
        res.end();
      },
      '/api/poleras/hombre': (req, res, next) => {
        let products = h.getProducts(false, config.menDir)

        res.type("application/json");
        res.status(200);
        res.json(products);
        res.end();
      },
      '/api/poleras/mujer': (req, res, next) => {
        let products = h.getProducts(false, config.womanDir)

        res.type("application/json");
        res.status(200);
        res.json(products);
        res.end();
      },
      '/api/polerones': (req, res, next) => {
        let products = h.getProducts(false, config.poleronDir)

        res.type("application/json");
        res.status(200);
        res.json(products);
        res.end();
      },
    },
    'post': {
      '/folder/update': (req, res, next) => {
        const {path, currenthandle, newhandle} = req.body

        h.updateFolder(path,currenthandle,newhandle)
       
        res.redirect('/')
       
      },
      '/file/update': (req, res, next) => {
				const {path,currentfilename, newfilename } = req.body
				
        h.updateFilename(path, currentfilename,newfilename)
				
        res.redirect('/')
       
      },
      '/file/titleupdate': async(req, res, next) => {
				const {path,currenttitle, newtitle , product_id} = req.body
				console.log(product_id)
        await h.updateTitlefile(path, currenttitle,newtitle,product_id)
				
        res.redirect('/')
       
      },
      '/update/product': (req, res, next) => {
        updateProduct(req.body)
				// console.log(req.body)
        res.send(req.body)
      }
    },
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }
  return h.route(routes);
}


