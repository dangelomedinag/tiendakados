import {productsconfig} from '../../../app/config/tienda.config'
const colorfilter = (res) => {
  if (
    res.type === productsconfig.polera_H.name ||
    res.type === productsconfig.polera_M.name
  ) {
    if (productsconfig.polera_H.colorfavs.length == 1) {
      return res.color === productsconfig.polera_H.colorfavs[0];
    }
    if (productsconfig.polera_H.colorfavs.length == 2) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] || res.color === productsconfig.polera_H.colorfavs[1]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 3) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 4) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 5) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 6) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 7) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5] ||
        res.color === productsconfig.polera_H.colorfavs[6]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 8) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5] ||
        res.color === productsconfig.polera_H.colorfavs[6] ||
        res.color === productsconfig.polera_H.colorfavs[7]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 9) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5] ||
        res.color === productsconfig.polera_H.colorfavs[6] ||
        res.color === productsconfig.polera_H.colorfavs[7] ||
        res.color === productsconfig.polera_H.colorfavs[8]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 10) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5] ||
        res.color === productsconfig.polera_H.colorfavs[6] ||
        res.color === productsconfig.polera_H.colorfavs[7] ||
        res.color === productsconfig.polera_H.colorfavs[8] ||
        res.color === productsconfig.polera_H.colorfavs[9]
      );
    }
    if (productsconfig.polera_H.colorfavs.length == 11) {
      return (
        res.color === productsconfig.polera_H.colorfavs[0] ||
        res.color === productsconfig.polera_H.colorfavs[1] ||
        res.color === productsconfig.polera_H.colorfavs[2] ||
        res.color === productsconfig.polera_H.colorfavs[3] ||
        res.color === productsconfig.polera_H.colorfavs[4] ||
        res.color === productsconfig.polera_H.colorfavs[5] ||
        res.color === productsconfig.polera_H.colorfavs[6] ||
        res.color === productsconfig.polera_H.colorfavs[7] ||
        res.color === productsconfig.polera_H.colorfavs[8] ||
        res.color === productsconfig.polera_H.colorfavs[9] ||
        res.color === productsconfig.polera_H.colorfavs[10]
      );
    }
  }
  if (res.type === productsconfig.polerones.name) {
    if (productsconfig.polerones.colorfavs.length == 1) {
      return res.color === productsconfig.polerones.colorfavs[0];
    }
    if (productsconfig.polerones.colorfavs.length == 2) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] || res.color === productsconfig.polerones.colorfavs[1]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 3) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 4) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 5) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 6) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 7) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5] ||
        res.color === productsconfig.polerones.colorfavs[6]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 8) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5] ||
        res.color === productsconfig.polerones.colorfavs[6] ||
        res.color === productsconfig.polerones.colorfavs[7]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 9) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5] ||
        res.color === productsconfig.polerones.colorfavs[6] ||
        res.color === productsconfig.polerones.colorfavs[7] ||
        res.color === productsconfig.polerones.colorfavs[8]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 10) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5] ||
        res.color === productsconfig.polerones.colorfavs[6] ||
        res.color === productsconfig.polerones.colorfavs[7] ||
        res.color === productsconfig.polerones.colorfavs[8] ||
        res.color === productsconfig.polerones.colorfavs[9]
      );
    }
    if (productsconfig.polerones.colorfavs.length == 11) {
      return (
        res.color === productsconfig.polerones.colorfavs[0] ||
        res.color === productsconfig.polerones.colorfavs[1] ||
        res.color === productsconfig.polerones.colorfavs[2] ||
        res.color === productsconfig.polerones.colorfavs[3] ||
        res.color === productsconfig.polerones.colorfavs[4] ||
        res.color === productsconfig.polerones.colorfavs[5] ||
        res.color === productsconfig.polerones.colorfavs[6] ||
        res.color === productsconfig.polerones.colorfavs[7] ||
        res.color === productsconfig.polerones.colorfavs[8] ||
        res.color === productsconfig.polerones.colorfavs[9] ||
        res.color === productsconfig.polerones.colorfavs[10]
      );
    }
  }
};

export default colorfilter