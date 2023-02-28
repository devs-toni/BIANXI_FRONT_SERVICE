import axios from 'axios';

export const get = async (set, url, isProductView) => {
  const data = await fetchData(url);
  set(data);

  if (isProductView) return data.name;
}

const fetchData = async (url) => {
  const data = await axios.get(url)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.error("Error fetching data ", error);
    })
    .finally(() => {

    });
  return data;
}