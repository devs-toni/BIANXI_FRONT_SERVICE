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