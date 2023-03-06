///////////////////////////////////////////////// PRODUCT : CONFIGURE

export const formatNumberES = (n, d = 0) => {
  n = new Intl.NumberFormat("de-DE").format(parseFloat(n).toFixed(d));
  if (d > 0) {
    const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;
    n = (decimals === 0) ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
  }
  return n;
}

export const setProductPrice = (offer, price) => {
  let final = 0;
  let init = 0;
  if (offer > 0) {
    const percentage = Math.ceil((parseInt(price) * offer) / 100);
    final = formatNumberES(price - percentage, 2);
    init = formatNumberES(price, 2);
  } else {
    final = formatNumberES(price, 2);
  }
  return { final, init }
};

export const calcTotalPrice = (total, price) => {
  const totalPrice = parseFloat(`${total}`.replace('.', ''), 2);
  const productPrice = parseFloat(`${price}`.replace('.', ''), 2);

  return formatNumberES(totalPrice * productPrice, 2);
};


export const isEmptyMethod = (configurations) => {
  let sumStock = 0;
  configurations?.forEach(({ stock }) => {
    sumStock += stock;
  })
  return !sumStock ? true : false;
}


//////////////////////////////////////////////////////////////////////////////////////// CART : ADDITION

export const addProductToCart = (item, numberProductsAdded, arrayConfigurations) => {
  const { id, name, offer, price, type, final } = item;
  arrayConfigurations = [updateNewConfigurationStock(arrayConfigurations[0], numberProductsAdded)];
  const necessaryItem = {
    id,
    name,
    offer,
    price,
    final,
    type,
    total: numberProductsAdded,
    config: arrayConfigurations
  }
  return necessaryItem;
}

export const addConfigurationToProduct = (configuration, numberProductsAdded, updatedProducts, item) => {
  const updatedConfig = updateNewConfigurationStock(configuration, numberProductsAdded);
  updatedProducts?.filter(product => product.id == item.id)[0].config.push(updatedConfig);
}

const updateNewConfigurationStock = (configuration, addition) => {
  const nextStock = configuration.stock - addition;
  configuration = {
    ...configuration,
    total: addition,
    stock: nextStock
  }
  return configuration;
}

export const updateConfigurationStock = (products, idProduct, idConfig, add) => {
  products?.filter(prod => prod.id == idProduct)[0].config.map(cnf => {
    if (cnf.id == idConfig) {
      cnf.total = parseInt(cnf.total) + add;
      cnf.stock = parseInt(cnf.stock) - add;
    }
  });
}

export const updateProductTotal = (products, idItem, numberProductsAdded) => {
  return products?.map(prod => {
    if (prod.id === idItem) {
      prod.total = parseInt(prod.total) + parseInt(numberProductsAdded);
    }
    return prod;
  });
}


//////////////////////////////////////////////////////////////////////////////////////// CART : REMOVAL

export const removeConfigInProduct = (products, idProduct, idConf) => {
  return products?.map(prod => {
    if (prod.id == idProduct) {
      prod.config = prod.config.filter(cnf => cnf.id != idConf)
    }
    return prod;
  })
}

////////////////////////////////////////////////////////////////////////////// UTIL METHODS

export const getCartProductConfigurations = (products, id) => {
  return products?.filter(p => p.id == id)[0]?.config;
}

export const getMatchConfiguration = (array, selectedSize, selectedColor) => {
  return array?.filter(({ sizes, color }) => (sizes.size == selectedSize && color.id == selectedColor))[0];
}

export const setProductConfigurations = (item) => {
  let colors = new Set();
  let colorsIds = new Set();
  let sizes = new Set();

  const colorsAndSizes = item.configuration.map(({ sizes, color }) => {
    return [sizes, color]
  });
  colorsAndSizes.flat().forEach(cnf => {
    if (cnf?.size) sizes.add(cnf.size);
    if (cnf?.color) {
      colors.add(cnf.color);
      colorsIds.add(cnf.id);
    }
  });
  return { colors, colorsIds, sizes }
}

export const getProductRelateds = (products, price) => {

  const sortArray = products.sort((a, b) => a.price < b.price ? 1 : -1);

  const downArrayWithNulls = sortArray.map(p => p.price < price ? p : null);
  const upArrayWithNulls = sortArray.map(p => p.price > price ? p : null);

  const downArray = downArrayWithNulls.filter(p => p != null);
  const upArray = upArrayWithNulls.filter(p => p != null);

  const upArraySorted = upArray.sort((a, b) => a.price > b.price ? 1 : -1);

  const responseArray = [];

  downArray.forEach((p, ind) => {
    if (responseArray.length < 4) {
      if (ind % 2 === 0) {
        if (downArray[ind]) responseArray.push(downArray[ind]);
      } else
        if (upArraySorted[ind]) responseArray.push(upArraySorted[ind]);
    }
  });
  return responseArray;
} 

