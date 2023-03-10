import React, { useState } from 'react'
import styled from "styled-components";
import { Slider } from '@mui/material';
import PropTypes from 'prop-types';

const PrettoSlider = styled(Slider)({

  marginTop: '150px',
  color: '#00B7B1 !important',
  height: 10,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #00B7B1',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 18,
    background: 'unset',
    padding: 0,
    width: 62,
    height: 62,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#00B7B1',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


const SliderPrice = ({ products, setProducts }) => {

  const [value, setValue] = useState([600, 11500]);
  const minDistance = 1500;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    setProducts(products.filter(product => product.price > value[0] && product.price < value[1]))
  };

  function valuetext(value) {
    return `${value}€`;
  }


  return (
    <PrettoSlider
      getAriaLabel={() => 'Price range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      max={12000}
      min={500}
    />
  )
}



SliderPrice.propTypes = {
  setProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
}

export default SliderPrice;