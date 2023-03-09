import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { CUPONS } from '../../configuration';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/GlobalContext';

const CuponBox = ({ isOpen }) => {

  const { text } = useLanguage();

  const { activeCupon, handleCupon } = useCart();

  const [cupon, setCupon] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setCupon(value);

    if (CUPONS.find(c => c.code === value)) {
      handleCupon(true, CUPONS.find(c => c.code === value).percentage);
    }
    else
      handleCupon(false);
  }


  return (
    <>
      <div className='main-cupon'>
        {console.log(activeCupon)}
        {activeCupon && <FontAwesomeIcon icon={faXmark} className="main-cupon__delete" onClick={() => handleCupon(false)} />}
        <div className={`${activeCupon ? 'valid' : ''} ${isOpen ? 'active' : ''} cupon`}>
          {
            activeCupon
              ?
              <>
                <FontAwesomeIcon icon={faCheck} className="cupon__check" />
                <label htmlFor="cuponInput" className='cupon__label '>{text.payment.label}</label>
                <input type="text" className='cupon__input' value={cupon} onChange={handleChange} placeholder='CODE' disabled />
              </>
              :
              <>
                <label htmlFor="cuponInput" className='cupon__label'>{text.payment.label}</label>
                <input type="text" className='cupon__input' value={cupon} onChange={handleChange} placeholder='CODE' />
              </>
          }
        </div>
      </div>
    </>
  )
}

export default CuponBox