import { useState, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext';
import { Details, Images, Info, Loader, Related } from '../index';
import { useParams } from 'react-router-dom';
import { PRODUCT_PROPERTIES } from '../../config/configuration';
import { setProductConfigurations } from '../../helpers/utils';
import { useAuth } from '../../context/AuthContext';
import { useQueryGetLikeStatus } from '../../persistence/favourites';
import { useQueryGetProductById } from '../../persistence/products';

const ProductView = () => {

  const { id, type } = useParams();

  const { productState, setProperty } = useProduct();

  const { userState } = useAuth();

  const [colorActivatorImage, setColorActivatorImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const getLikeStatus = useQueryGetLikeStatus()
  const getProductById = useQueryGetProductById();


  useEffect(() => {
    setProperty(PRODUCT_PROPERTIES.LIKE, { newState: false });

    getLikeStatus.mutateAsync({ idProduct: id, idUser: userState.id })
      .then((data) => {
        if (data === 1)
          setProperty(PRODUCT_PROPERTIES.LIKE, { newState: true })
        else setProperty(PRODUCT_PROPERTIES.LIKE, { newState: false })
      })

    const loadProduct = async () => {
      await getProductById.mutateAsync({ id: id })
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
          setLoading(false);
        });
    }

    loadProduct();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                isLike={productState.like}
                handleLike={() => setProperty(PRODUCT_PROPERTIES.LIKE)}
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