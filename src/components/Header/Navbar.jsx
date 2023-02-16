import React from 'react'
import { useContext } from 'react'
import Dropdown from './Dropdown';
import LanguageContext from '../../context/LanguageContext';
import '../../assets/styles/css/index.min.css';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const { text } = useContext(LanguageContext);

  const items = [
    {
      ref: "/product-category/bicicletas/road",
      text: text.header.road
    },
    {
      ref: "/product-category/bicicletas/mtb",
      text: text.header.mtb
    },
    {
      ref: "/product-category/bicicletas/e-bike",
      text: text.header.ebike
    }
  ];

  return (
    <div className='navbar'>
      <Dropdown items={items} dropdownTitle={text.header.bycicles} />
      <div className="container-link">
        <Link className='item-link' to='/'>{text.header.mtb}</Link>
      </div>
    </div>
  )
}

export default Navbar;