const HOST_ENDPOINT = process.env.REACT_APP_API_URL;

export const PRODUCTS_ENDPOINT = HOST_ENDPOINT + "/api/products";
export const SIZES_ENDPOINT = HOST_ENDPOINT + "/api/sizes";
export const COLORS_ENDPOINT = HOST_ENDPOINT + "/api/colors";
export const USERS_ENDPOINT = HOST_ENDPOINT + "/api/users";
export const STRIPE_ENDPOINT = HOST_ENDPOINT + "/stripe"
export const ORDERS_ENDPOINT = HOST_ENDPOINT + "/api/orders";


export const STRIPE_VISIBLE_KEY = process.env.REACT_APP_STRIPE_KEY;

export const GOOGLE_OAUTH_KEY = process.env.REACT_APP_GOOGLE_OAUTH_KEY;

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
  FILTER: "filter",
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