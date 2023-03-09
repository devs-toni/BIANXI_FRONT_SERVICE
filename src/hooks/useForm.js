import { useState } from 'react';


export const useForm = (initialForm) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    })
  };

  const validateForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.name.trim()) {
      errors.name = 'Este campo es obligatorio';
    } else if (!regexName.test(form.name.trim())) {
      errors.name = 'Solo acepta letras y espacios en blanco';
    }

    if (!form.address.trim()) {
      errors.address = 'Este campo es obligatorio';
    }

    if (!form.email.trim()) {
      errors.email = 'Este campo es obligatorio';
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = 'El email introducido no és válido';
    }

    return errors;
  }

  const validate = () => {
    setErrors(validateForm(form));
  }

  return {
    form, handleChange, validate, errors
  }
}
