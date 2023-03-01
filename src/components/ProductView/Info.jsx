import React, { useContext, useEffect, useRef, useState } from 'react'
import LanguageContext from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { SizeSelector, ColorSelector, CartHandler } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import CartSelector from './CartSelector';
import { useGlobal } from '../../context/GlobalContext';


const Info = ({ total = 1 }) => {

  const { text } = useContext(LanguageContext);

  const { products } = useGlobal();
  const { products: allProducts, setProducts } = products;

  const { vars } = useCart();
  const { totalProducts } = vars;

  const { vars: productVars } = useProduct();
  const { isEmptyProduct, isEmptyConfig, current: product, updatedPrices, currentConfig, setSize, size } = productVars;
  const { id, name, price, type, offer, sentence, description, datasheet, configuration, orders } = product;

  const { funcs } = useCart();
  const { handleAddSpecificNumberProduct } = funcs;

  const [tempNumber, setTempNumber] = useState(0);

  const totalRef = useRef();

  const handleCartAddition = () => {
    const { current } = totalRef;
    handleAddSpecificNumberProduct({ ...product, ...updatedPrices }, current.value);
  }

  const emptyStyles = (isEmptyProduct || isEmptyConfig) ? 'empty' : '';
  const emptyStylesText = ((isEmptyProduct || isEmptyConfig) && size) ? 'empty' : '';


  useEffect(() => {
    setTempNumber(0);
    setSize('');
  }, [totalProducts])


  return (
    <>
      {
        updatedPrices &&
        <div className="info">
          <div className="info__main">
            <p className="info__main--name">{name}</p>
            <p className="info__main--short">{sentence}</p>
            <p className="info__main--price">{updatedPrices.final} €</p>
          </div>
          <SizeSelector product={product} />
          <ColorSelector product={product} />
            <p className={`${emptyStylesText} info__empty`}>{text.view.empty}</p> 
          <div className="info__buy">
            <CartSelector
              containerClass='cart-buttons'
              innerRef={totalRef}
              val={tempNumber}
              setVal={setTempNumber}
            />
            <button className={`${emptyStyles} info__buy--add`} onClick={handleCartAddition}>{text.view.add}</button>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="info__share">
            <p className="info__share--title">{text.view.share}</p>
            <div className="info__share--icons"></div>
          </div>
        </div>
      }

    </>
  )
}

export default Info;