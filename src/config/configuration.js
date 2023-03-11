
const HOST_ENDPOINT = 'http://localhost:8081';
//const HOST_ENDPOINT = 'https://bianxiapi.arcprojects.es';

export const PRODUCTS_ENDPOINT = HOST_ENDPOINT + "/products";
export const SIZES_ENDPOINT = HOST_ENDPOINT + "/sizes";
export const COLORS_ENDPOINT = HOST_ENDPOINT + "/colors";
export const USERS_ENDPOINT = HOST_ENDPOINT + "/users";
export const STRIPE_ENDPOINT = HOST_ENDPOINT + "/stripe";
export const ORDERS_ENDPOINT = HOST_ENDPOINT + "/orders";

export const STRIPE_VISIBLE_KEY = "pk_test_51MibNiJvIad3hgcE0izvl4WzZ6v7ukyk3UvAoIuiFHz2uxgkmg2lziX2iog7NqZ5nXhifVFz2wQLb1g7NYJMlGXI003joMJ5Ag";
export const GOOGLE_OAUTH_KEY = "162877889324-ph6vkb5temebbg62b7sbqrp14t2is97b.apps.googleusercontent.com";

export const CUPONS = [
  {
    code: "TREK",
    percentage: 10
  },
  {
    code: "KTM",
    percentage: 20
  }
]

export const NEW_USER_DISCOUNT = 5;

export const UI_SECTIONS = {
  MENU: "menu",
  LOGIN: "login",
  CART: "cart",
  SEARCH: "search",
  CUPON: "cupon"
}

export const UI_ACTIONS = {
  HANDLE: "handle",
  CLOSE: "close"
}

export const PRODUCT_PROPERTIES = {
  PRODUCT: "product",
  COLOR: "color",
  SIZE: "size",
  COLORS: "colors",
  SIZES: "sizes",
  PRICES: "prices",
  EMPTY: "empty",
  CONFIG: "config",
  LIKE: "like"
}