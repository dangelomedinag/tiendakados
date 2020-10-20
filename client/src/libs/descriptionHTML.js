// import { productsconfig } from '../../../app/config/tienda.config'
const { productsconfig } = require('../../../app/config/tienda.config')

const customDescription = (title, tprod) => {
  return `<h3 style="font-weight: 600; font-size: 22px;">${title.toUpperCase()}</h3><hr style="border: 1px solid #f2f2f2;">
<h3 style="font-weight: 400;">${
    tprod === productsconfig.polerones.name ? "Un polerón" : "Una polera"
  } de algodón con diseño de ${title}</h3><p>${
    tprod === productsconfig.polerones.name ? "Polerón unisex" : "Polera"
  } de material fresco 100% algodon, agrega un poco de actitud a tu vida diaria con esta polera. El tejido de algodón te ofrece una sensación de total comodidad.</p>`;
}

module.exports = customDescription