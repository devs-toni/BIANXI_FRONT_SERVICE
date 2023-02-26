import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useContext, useState, useEffect, useRef } from 'react'
import uuid from 'react-uuid';
import CartContext from '../../context/CartContext';
import LanguageContext from '../../context/LanguageContext';
import { setProductPrice } from '../../helpers/utils';
import CartHandler from '../Categories/CartHandler'


const ViewInfo = ({ product, total = 1 }) => {

  const { getAllColors, getAllSizes } = require("../../helpers/rest.js");

  // Language variables
  const { text } = useContext(LanguageContext);

  // Cart variables
  const { addItemsToCart, countChange, findNumberProduct, totalProducts, getProduct } = useContext(CartContext);

  // Product 
  const [productStore, setProductStore] = useState({ total });
  const [finalPrice, setFinalPrice] = useState('');
  const [sizeValue, setSizeValue] = useState('M');
  const [colorValue, setColorValue] = useState(1);

  // Number of selected products
  const inputNumberRef = useRef();

  // All colors and all sizes available
  const [currentColors, setCurrentColors] = useState();
  const [currentSizes, setCurrentSizes] = useState();

  // References
  const sizeRef = useRef();
  const colorRef = useRef();

  /*   useEffect(() => {
      inputNumberRef.current.value = findNumberProduct(product.id);
      setProductStore(totalProducts[getProduct()]);
    }, [countChange]); */

  useEffect(() => {
    getAllColors(axios, setCurrentColors);
    getAllSizes(axios, setCurrentSizes);
  }, []);

  useEffect(() => {
    const { price, offer } = product;
    const { init, final } = setProductPrice(offer, price);
    setFinalPrice(final);
    setProductStore({ final, init, ...product, ...productStore });
  }, [product]);



  const handleCartAddition = () => {
    addItemsToCart(productStore, parseInt(inputNumberRef.current.value));
  };

  useEffect(() => {
    console.log("Cambiando total cart option input");

  }, [sizeValue, colorValue])

  const handleSize = ({ target }) => {
    const { value } = target;
    setSizeValue(value);
  }

  const handleColor = ({ target }) => {
    const { value } = target;
    setColorValue(value);
  }

  return (
    <>
      {
        productStore ?
          (
            <div className="info">
              <div className="info__main">
                <p className="info__main--name">{productStore.name}</p>
                <p className="info__main--short">{productStore.sentence}</p>
                <p className="info__main--price">{finalPrice} €</p>
              </div>
              <div className="info__size">
                <p className="info__size--title">{text.view.size}</p>
                <select className="info__size--option" ref={sizeRef} onChange={handleSize} value={sizeValue}>
                  {
                    currentSizes &&
                    currentSizes.map(({ size }) => {
                      return (
                        <option key={uuid()} value={size}>{size}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="info__color">
                <p className="info__color--title">{text.view.color}</p>
                {
                  currentColors &&
                  currentColors.map(({ id, color }) => {
                    const style = {
                      color,
                      backgroundColor: color
                    }
                    return (
                      <input 
                        type="radio" 
                        key={uuid()} 
                        className={`info__color--colors ${colorValue == id ? "active" : ""}`} 
                        style={style} 
                        onClick={handleColor} 
                        value={id} 
                      />
                    )
                  })
                }
              </div>
              {/*            {
                 &&
                <p className="info__empty">{text.view.empty}</p>
              } */}
              <div className="info__buy">
                <CartHandler
                  product={productStore}
                  containerClass='cart-buttons'
                  isCart={false}
                  innerRef={inputNumberRef}
                />
                {/*                 <button className={`info__buy--add ${ && 'empty'}`} onClick={handleCartAddition}>{text.view.add}</button>
 */}                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="info__share">
                <p className="info__share--title">{text.view.share}</p>
                <div className="info__share--icons"></div>
              </div>
            </div>
          )
          :
          (
            <p>Loading</p>
          )
      }
    </>
  )
}

export default ViewInfo;