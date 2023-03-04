import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/GlobalContext';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { SizeSelector, ColorSelector, Loader } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import CartSelector from './CartSelector';


const Info = ({ total = 1, setActivator }) => {

  const { text } = useLanguage();

  const { vars } = useCart();
  const { totalProducts } = vars;

  const { configureProduct } = useProduct();
  const { state: product_state } = configureProduct();
  const { name, sentence } = product_state.product;


  const { funcs } = useCart();
  const { handleAddSpecificNumberProduct } = funcs;

  const [tempStock, setTempStock] = useState(0);
  const [loaded, setLoaded] = useState(product_state.updatedPrices ? true : false);

  const totalRef = useRef();

  const handleCartAddition = () => {
    const { current } = totalRef;
    handleAddSpecificNumberProduct({ ...product_state.product, ...product_state.updatedPrices }, current.value);
  }

  const emptyStyles = (product_state.config?.stock === 0 || !product_state.config) ? 'empty' : '';
  const emptyStylesText = ((product_state.config?.stock === 0 || !product_state.config) && product_state.size) ? 'empty' : '';


  useEffect(() => {
    setTempStock(0);
  }, [totalProducts]);

  useEffect(() => {
    setLoaded(true);
  }, [product_state.updatedPrices])



  return (
    <>
      {
        loaded
          ?
          <div className="info">
            <div className="info__main">
              <p className="info__main--name">{name}</p>
              <p className="info__main--short">{sentence}</p>
              <p className="info__main--price">{product_state.updatedPrices.final} €</p>
            </div>
            <SizeSelector product={product_state.product} />
            <ColorSelector product={product_state.product} setActivator={setActivator} />
            <p className={`${emptyStylesText} info__empty`}>{text.view.empty}</p>
            <div className="info__buy">
              <CartSelector
                containerClass='cart-buttons'
                innerRef={totalRef}
                val={tempStock}
                setVal={setTempStock}
              />
              <button className={`${emptyStyles} info__buy--add`} onClick={handleCartAddition}>{text.view.add}</button>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="info__share">
              <p className="info__share--title">{text.view.share}</p>
              <div className="info__share--icons"></div>
            </div>
          </div>
          :
          <Loader />
      }

    </>
  )
}

export default Info;