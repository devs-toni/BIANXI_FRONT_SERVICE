import { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info, Loader, Related } from '../index';
import { useParams } from 'react-router-dom';
import { PRODUCTS_ENDPOINT, PRODUCT_PROPERTIES } from '../../config/configuration';
import { http } from '../../helpers/http';
import { setProductConfigurations } from '../../helpers/utils';
import { useAuth } from '../../context/AuthContext';

const ProductView = () => {

  const { id, type } = useParams();

  const { productState, setProperty } = useProduct();

  const { userState } = useAuth();

  const [colorActivatorImage, setColorActivatorImage] = useState(0);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setProperty(PRODUCT_PROPERTIES.LIKE, { newState: false });

    const getLike = (idProduct, idUser, setLikeTrue, setLikeFalse) => {
      if (idProduct) {
        http().post(`${PRODUCTS_ENDPOINT}/like/get`, {
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

    const loadProduct = async () => {
      await http().get(`${PRODUCTS_ENDPOINT}/get/${id}`)
        .then(data => {
          setProperty(PRODUCT_PROPERTIES.PRODUCT, data);

          const { sizes } = setProductConfigurations(data);
          setProperty(PRODUCT_PROPERTIES.SIZES, [...sizes])
          const { colors: res, colorsIds: ids } = setProductConfigurations(data);
          const finalArray = [];
          [...res].forEach((c, index) => {
            finalArray.push({ color: c, id: [...ids][index] });
          });
          setProperty(PRODUCT_PROPERTIES.COLORS, finalArray)
          setProperty(PRODUCT_PROPERTIES.PRICES, { offer: data.offer, price: data.price })

          if (userState.id) {
            getLike(
              id,
              userState.id,
              () => setProperty(PRODUCT_PROPERTIES.LIKE, { newState: true }),
              () => setProperty(PRODUCT_PROPERTIES.LIKE, { newState: false })
            )
          }
          setLoading(false);
        });
    }

    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {
        !loading
          ?
          <>
            <div className="view">
              <Images
                product={productState.product}
                activator={colorActivatorImage}
              />
              <Info
                setColorActivator={setColorActivatorImage}
                handleLike={() => setProperty(PRODUCT_PROPERTIES.LIKE)}
                isLike={productState.like}
              />
            </div>
            <Details
              description={productState.product.description}
              features={productState.product.datasheet}
            />
            <Related
              type={type}
              price={productState.product.price}
              id={parseInt(id)}
            />
          </>
          :
          <Loader />
      }
    </>
  )
}

export default ProductView;