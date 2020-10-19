const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const {router, routerShopify} = require('./app/index');
// require('./app/helpers/products/products')
const {menDir, womanDir, poleronDir,baseDir} =require('./app/config/index')


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(cors());
app.use(express.static('public'));
app.use('/base', express.static(baseDir));
app.use(
  "/static/polerahombre",
  express.static(menDir.images)
);
app.use(
  "/static/poleramujer",
  express.static(womanDir.images)
);
app.use(
  "/static/poleronestodos",
  express.static(poleronDir.images)
);
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/shopify/api', routerShopify());
app.use('/', router());

app.listen(app.get('port'), ()=> console.log(`work on http://localhost:${app.get('port')}`))