const { productsUrl, sizesUrl, colorsUrl } = require('../config.js');

export const getAllColors = async (axios, setter) => {
  await axios.get(`${colorsUrl}/get/all`)
    .then(response => {
      setter(response.data);
    })
    .catch(error => {
      console.error("Error fetching data ", error);
    })
    .finally(() => {

    })
}

export const getAllSizes = async (axios, setter) => {
  await axios.get(`${sizesUrl}/get/all`)
    .then(response => {
      setter(response.data);
    })
    .catch(error => {
      console.error("Error fetching data ", error);
    })
    .finally(() => {

    })
}