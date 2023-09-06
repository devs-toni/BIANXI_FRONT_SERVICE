import React, { useState, useEffect } from 'react'
import { setProductPrice, isEmptyMethod } from '../../helpers/utils';
import { Badge, Loader, ProductBox } from '../index';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/GlobalContext';
import { PRODUCT_LINK } from '../../router/paths';
import { useUI } from '../../context/UIContext';
import { UI_ACTIONS, UI_SECTIONS } from '../../config/configuration';


const Product = ({ product, total = 1, isSearch, isRelated, isLike, isAll, containerClass, boxClass, getFavourites }) => {

  const { text } = useLanguage();

  const { id, name, price, type, offer, configuration } = product;
  const [updatePrices, setUpdatePrices] = useState(null)
  const [isEmptyProduct, setIsEmptyProduct] = useState(false);
  const [image, setImage] = useState(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { handleUi } = useUI();

  useEffect(() => {
    setUpdatePrices(setProductPrice(offer, price));
    setImage(require(`../../assets/images/${type}/${name}-0.png`));
    setIsEmptyProduct(isEmptyMethod(configuration));
    setLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleNav = () => {
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE);
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.CLOSE);
  }

  return (

    <div className={`${containerClass}__product`}>
      {
        loaded
          ?
          <>
            {
              (offer > 0 && !isSearch && !isLike) &&
              <Badge
                containerClass="offer"
                text={text.product.offer}
              />
            }
            <ProductBox
              name={name}
              finalPrice={updatePrices.final}
              initPrice={updatePrices.init === 0 ? `${updatePrices.init}` : updatePrices.init}
              image={image}
              loaded={isImgLoaded}
              setLoaded={setIsImgLoaded}
              containerClass={boxClass}
              offer={offer}
              isCart={false}
              isRelated={isRelated}
              isLike={isLike}
              isAll={isAll}
              isEmpty={isEmptyProduct}
              isSearch={isSearch}
              type={type}
              id={id}
              getFavourites={getFavourites}
            />

            {
              (!isSearch && !isRelated && !isLike)
              &&
              < NavLink to={`${PRODUCT_LINK}/${type.toString()}/${id.toString()}`} className='products__product--visit' onClick={handleNav}>{text.product.view}</NavLink>
            }
          </>
          :
          <Loader />
      }
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  isSearch: PropTypes.bool.isRequired,
  isRelated: PropTypes.bool,
  isLike: PropTypes.bool,
  isAll: PropTypes.bool,
  boxClass: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  total: PropTypes.number
}

export default Product;