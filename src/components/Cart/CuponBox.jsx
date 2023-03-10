import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { CUPONS, UI_ACTIONS, UI_SECTIONS } from '../../configuration';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/GlobalContext';
import { useUI } from '../../context/UIContext';

const CuponBox = ({ isOpen }) => {

  const { text } = useLanguage();
  const inputCode = useRef();

  useEffect(() => {
    if (isOpen && inputCode.current)
      inputCode.current.focus();
  }, [isOpen])


  const { cartState, handleCupon } = useCart();
  const { activeCupon } = cartState;

  const { handleUi } = useUI();

  const [cupon, setCupon] = useState('');


  const handleChange = ({ target }) => {
    const { value } = target;
    setCupon(value);

    if (CUPONS.find(c => c.code === value)) {
      setCupon('');
      handleCupon(true, CUPONS.find(c => c.code === value).percentage);
    }
  }

  const cancel = () => {
    handleUi(UI_SECTIONS.CUPON, UI_ACTIONS.CLOSE);
    handleCupon(false)
  }


  return (
    <>
      <div className='main-cupon'>
        {activeCupon && <FontAwesomeIcon icon={faXmark} className="main-cupon__delete" onClick={cancel} />}
        <div className={`${activeCupon ? 'valid' : ''} ${isOpen ? 'active' : ''} cupon`}>
          {
            activeCupon
              ?
              <>
                <FontAwesomeIcon icon={faCheck} className="cupon__check" />
                <label htmlFor="cuponInput" className='cupon__label '>{text.payment.label}</label>
                <input type="text" className='cupon__input' value={cupon} onChange={handleChange} disabled />
              </>
              :
              <>
                <label htmlFor="cuponInput" className='cupon__label'>{text.payment.label}</label>
                <input type="text" className='cupon__input' value={cupon} onChange={handleChange} ref={inputCode} />
              </>
          }
        </div>
      </div>
    </>
  )
}

export default CuponBox