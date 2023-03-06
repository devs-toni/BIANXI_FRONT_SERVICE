import { productsUrl } from "../config";
import { http } from "./HTTP_Connection";

export const addLike = (idProduct, idUser) => {

  http().post(`${productsUrl}/like/add`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const deleteLike = (idProduct, idUser) => {

  http().del(`${productsUrl}/like/delete`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const getLike = (idProduct, idUser, setLikeTrue, setLikeFalse) => {

  if (idProduct) {
    http().post(`${productsUrl}/like/get`, {
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
