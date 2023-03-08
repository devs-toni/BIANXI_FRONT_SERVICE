import { PRODUCTS_ENDPOINT } from "../configuration";
import { http } from "./http";

export const addLike = (idProduct, idUser) => {

  http().post(`${PRODUCTS_ENDPOINT}/like/add`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const deleteLike = (idProduct, idUser) => {

  http().del(`${PRODUCTS_ENDPOINT}/like/delete`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const getLike = (idProduct, idUser, setLikeTrue, setLikeFalse) => {

  if (idProduct) {
    http().post(`${PRODUCTS_ENDPOINT}/like/get`, {
      body: [
        idProduct,
        idUser,
      ]
    }).then(data => {
      data === 1
        ?
        setLikeTrue()
        :
        setLikeFalse()
    })
  }
}
