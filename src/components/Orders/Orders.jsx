import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { ORDERS_ENDPOINT } from "../../configuration";
import { useLanguage } from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthContext";
import { http } from "../../helpers/http";
import { formatNumberES } from '../../helpers/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";

const Orders = () => {

  const { user_state } = useAuth();

  const { text } = useLanguage();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getOrders = async (userId) => {
      await http()
        .get(`${ORDERS_ENDPOINT}/get/all/${userId}`)
        .then(ordersBackend => {
          ordersBackend.length > 0 && setOrders([...ordersBackend]);
        });
    }
    getOrders(user_state.id);
  }, []);

  return (
    <div className='orders'>
      <div className="orders__titles">
        <p className="orders__titles--key">#</p>
        <p className="orders__titles--key">{text.payment.address}</p>
        <p className="orders__titles--key">{text.payment.total}</p>
      </div>
      {
        orders.length > 0
          ?
          orders.map(({ id, address, price }) => {
            return (
              <div className="orders__order" key={uuid()}>
                <p className="orders__order--val">{id}</p>
                <p className="orders__order--val">{address}</p>
                <p className="orders__order--val">{formatNumberES(price)} €</p>
              </div>
            )
          })
          :
          <FontAwesomeIcon className="orders__empty" icon={faHourglass} />
      }
    </div>
  )
}

export default Orders;