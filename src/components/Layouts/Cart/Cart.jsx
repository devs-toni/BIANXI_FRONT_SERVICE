import React, { useContext, useState } from 'react'
import CartContext from '../../../context/CartContext';
import Product from '../Categories/Product';
import ProductBox from '../Categories/ProductBox';

const Cart = () => {

  const { totalProducts } = useContext(CartContext);
  const [loaded, setLoaded] = useState(false);


  return (
    <>
      {totalProducts?.length > 0 &&
        totalProducts.map(({ id, name, init, final, type, offer, count }, index) => {
          return (
            <div key={index} className='products__product'>
              <ProductBox id={id} name={name} init={init} final={final} type={type} offer={offer} count={count} loaded={loaded} setLoaded={setLoaded} image={require(`../../../assets/images/${type}/${name}.png`)} />
              {/*               <p>Id: {id}</p>
              <p>Nombre: {name}</p>
              <p>Precio inicial: {init}</p>
              <p>Precio final: {final}</p>
              <p>Tipo de bici: {type}</p>
              <p>Oferta aplicada: {offer}</p>
              <p>Cantidad: {count}</p> */}
            </div>
          )
        })
      }
    </>
  )
}

export default Cart