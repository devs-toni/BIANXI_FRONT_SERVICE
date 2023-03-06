import { productsUrl } from "../config";
import { Connection } from "./HTTP_Connection";

export const addLike = (idProduct, idUser) => {
  const { post } = Connection();
  post(`${productsUrl}/like/add`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const deleteLike = (idProduct, idUser) => {
  const { del } = Connection();
  del(`${productsUrl}/like/delete`, {
    body: [
      idProduct, idUser
    ]
  }).then(data => {
    console.log(data);
  })
}

export const getLike = (idProduct, idUser, setLikeTrue, setLikeFalse) => {
  const { post } = Connection();

  if (idProduct) {
    post(`${productsUrl}/like/get`, {
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
