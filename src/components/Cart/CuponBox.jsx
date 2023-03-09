import { useState } from 'react';
import { CUPONS } from '../../configuration';
import { useLanguage } from '../../context/GlobalContext';
import { useUI } from '../../context/UIContext';
import { useForm } from '../../hooks/useForm';

const CuponBox = ({ isOpen }) => {

  const { text } = useLanguage();
  const { form, handleChange } = useForm({ cupon: '' });
  const [error, setError] = useState('');

  const { handleUi } = useUI();
  const { state, dispatch, UI_ACTIONS } = handleUi();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (CUPONS.find(c => c === form.cupon)) {
      console.log("Tienes descuento!!!");
      dispatch({ type: UI_ACTIONS.CLOSE_CUPON });
    } else {
      setError(text.payment.cuponError);
    }
  }

  return (
    <div className={`${isOpen ? 'active' : ''} cupon`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cuponInput" className='cupon__label'>{text.payment.label}</label>
        <input type="text" id='cuponInput' name='cupon' className='cupon__input' onChange={(e) => {
          handleChange(e);
          setError(''); 
          }} value={form.cupon} placeholder='CODE' />
        <span className='cupon__error' >{error}</span>
      </form>
    </div>
  )
}

export default CuponBox