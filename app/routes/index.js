const h = require('../helpers');
const config = require('../config/index')


module.exports = () =>{
  let routes = {
    'get': {
      '/': async (req, res, next) => {
        let products = await h.readFolder(config.menDir, config.womanDir, config.poleronDir)
        let arrRep = [];
        let ccc = products
          .map((res) => res.handle)
          .reduce(
            (newTempArr, el) =>
              newTempArr.includes(el)
                ? (arrRep = [...arrRep, el])
                : [...newTempArr, el],
            []
          );

        res.status(200).render('index', {
          products,
          type: 'all',
          equals: arrRep
        });
        res.end()
      },
      '/:type': async(req, res, next) => {
        let products;

        
        const {type} = req.params

        if(type === 'hombre'){
          products = await h.readFolder(config.menDir)
          let arrRep = [];
          products
            .map((res) => res.handle)
            .reduce(
              (newTempArr, el) =>
                newTempArr.includes(el)
                  ? (arrRep = [...arrRep, el])
                  : [...newTempArr, el],
              []
            );
          res.status(200).render('index', {
            products,
            type,
            equals: arrRep
          });
          res.end()
        }else if(type === 'mujer'){
          products = await h.readFolder(config.womanDir)
          let arrRep = [];
          products
            .map((res) => res.handle)
            .reduce(
              (newTempArr, el) =>
                newTempArr.includes(el)
                  ? (arrRep = [...arrRep, el])
                  : [...newTempArr, el],
              []
            );
          res.status(200).render('index', {
            products,
            type,
            equals: arrRep
          });
          res.end()
        }else if(type === 'poleron'){
          products = await h.readFolder(config.poleronDir)
          let arrRep = [];
          products
            .map((res) => res.handle)
            .reduce(
              (newTempArr, el) =>
                newTempArr.includes(el)
                  ? (arrRep = [...arrRep, el])
                  : [...newTempArr, el],
              []
            );
          res.status(200).render('index', {
            products,
            type,
            equals: arrRep
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
      '/fn/createtitletxt': (req, res, next) => {
        h.createTitleFromtxt(config.menDir, config.womanDir, config.poleronDir)
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
				
        await h.updateTitlefile(path, currenttitle,newtitle,product_id)
				
        res.redirect('/')
       
      }
    },
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }
  return h.route(routes);
}


