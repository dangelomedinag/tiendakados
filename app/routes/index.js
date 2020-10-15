const h = require('../helpers');
const config = require('../config/index')

const antes = (req, res, next) =>{
  h.fixedFilestoFolder(config.menDir, config.womanDir, config.poleronDir)
  setTimeout(()=>{ next() },6000)
}


module.exports = () =>{
  let routes = {
    'get': {
      '/': (req, res, next) => {
        let products = h.readFolder(config.menDir, config.womanDir, config.poleronDir)
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
        // console.log(ccc.sort());
        // console.log(arrRep.sort());
        res.status(200).render('index', {
          products,
          type: 'all',
          equals: arrRep
        });
        res.end()
      },
      '/:type': (req, res, next) => {
        let products;

        
        const {type} = req.params

        if(type === 'hombre'){
          products = h.readFolder(config.menDir)
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
            type,
            equals: arrRep
          });
          res.end()
        }else if(type === 'mujer'){
          products = h.readFolder(config.womanDir)
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
            type,
            equals: arrRep
          });
          res.end()
        }else if(type === 'poleron'){
          products = h.readFolder(config.poleronDir)
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
      '/file/titleupdate': (req, res, next) => {
				const {path,currenttitle, newtitle } = req.body
				
        h.updateTitlefile(path, currenttitle,newtitle)
				
        res.redirect('/')
       
      }
    },
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }
  return h.route(routes);
}


