import React from 'react'
import { useContext, useState } from 'react'
import Dropdown from './Dropdown';
import LanguageContext from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { FiMenu } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { IoIosCart } from 'react-icons/io';


const Navbar = () => {
  const [isNavShow, setIsNavShow] = useState(false);
  const { text } = useContext(LanguageContext);

  const handleMenu = (e) => {
    setIsNavShow(!isNavShow);
  }
  const closeMenu = (e) => {
    isNavShow && setIsNavShow(false);
  }

  const items = [
    {
      ref: "/product-category/bycicles/road",
      text: text.header.road
    },
    {
      ref: "/product-category/bycicles/mtb",
      text: text.header.mtb
    },
    {
      ref: "/product-category/bycicles/ebike",
      text: text.header.ebike
    },
    {
      ref: "/product-category/bycicles/city",
      text: text.header.city
    },

  ];

  return (
    <div className='navbar'>
      <div className='container-logo'>
        <Link to='/'><img src={Logo} alt="" onClick={closeMenu} /></Link>
      </div>
      <nav className={`nav ${isNavShow ? 'active' : ''}`}>
        <Dropdown items={items} dropdownTitle={text.header.bycicles} />
        <div className="container-link">
          <Link className='item-link' to='/'>{text.header.contact}</Link>
        </div>
        <button className='nav__user'>
          <FaUserAlt />
        </button>
        <button className='nav__cart'>
          <IoIosCart />
        </button>
      </nav>
      <button className='menu-responsive' onClick={handleMenu}>
        {isNavShow ? <GrClose /> : <FiMenu />}
      </button>

    </div>
  )
}

export default Navbar;