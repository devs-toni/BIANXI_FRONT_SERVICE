import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext';
import LanguageContext from '../../context/LanguageContext';
import ProductBox from '../Categories/ProductBox';

const Cart = () => {

  const { totalProducts } = useContext(CartContext);
  const { text } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='cart'>
      <h1 className='cart__title'>Shopping Cart</h1>
      {
        totalProducts?.length > 0
          ?
          totalProducts.map(({ id, name, init, final, type, offer, stock, total }, index) => {
            return (
              <div className='cart__product' key={index}>
                <ProductBox
                  key={index}
                  id={id}
                  name={name}
                  finalPrice={parseFloat(final)}
                  initPrice={parseFloat(init)}
                  image={require(`../../assets/images/${type}/${name}.png`)}
                  loaded={loaded}
                  setLoaded={setLoaded}
                  containerClass='cart-product-box'
                  offer={offer}
                  stock={stock}
                />
              </div>
            )
          })
          :
          <h1>{text.cart.empty}</h1>
      }
    </div>
  )
}

export default Cart