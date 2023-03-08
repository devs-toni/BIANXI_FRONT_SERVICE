import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { ordersUrl } from "../../config";
import { useLanguage } from "../../context/GlobalContext";
import { useUser } from "../../context/UserContext";
import { http } from "../../helpers/http";
import { formatNumberES } from '../../helpers/utils';

const Orders = () => {

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

  const { text } = useLanguage();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getOrders = async (userId) => {
      await http()
        .get(`${ordersUrl}/get/all/${userId}`)
        .then(ordersBackend => {
          setOrders([...ordersBackend]);
        });
    }
    const getProducts = async () => {
      orders.filter(async order => {
        await http()
          .get(`${ordersUrl}/get/products/${order.id}`)
          .then(prod => {
            setProducts([...products, prod = {
              order: order.id,
              products: prod
            }])
          })
      })
    }
    getOrders(user_state.id);
    getProducts();

  }, []);




  return (
    <div className='orders'>
      <div className="orders__titles">
        <p className="orders__titles--key">#</p>
        <p className="orders__titles--key">{text.payment.address}</p>
        <p className="orders__titles--key">{text.payment.products}</p>
        <p className="orders__titles--key">{text.payment.total}</p>
      </div>
      {
        (orders)
        &&
        orders.map(({ id, address, price }) => {
          return (
            <div className="orders__order" key={uuid()}>
              <p className="orders__order--val">{id}</p>
              <p className="orders__order--val">{address}</p>
              <div className="orders__order--product">
                {
                  products.map(({ products, order }) => {
                    console.log(products)
                    if (order === id) {
                      products.map(({ name }) => {
                        return (
                          <React.Fragment key={uuid()}>
                            <p>{name}</p>
                          </React.Fragment>
                        )
                      })
                    }
                  })
                }
              </div>
              <p className="orders__order--val">{formatNumberES(price)} €</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Orders;