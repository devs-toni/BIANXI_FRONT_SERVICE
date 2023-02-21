import React from 'react'
import { useContext, useState, useRef, useEffect } from 'react'
import Dropdown from './Dropdown';
import LanguageContext from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { FiMenu } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { IoIosCart } from 'react-icons/io';
import CartContext from '../../context/CartContext';

const Navbar = () => {
  const [isNavShow, setIsNavShow] = useState(false);
  const { text } = useContext(LanguageContext);
  const { totalProducts } = useContext(CartContext);

  const menuRef = useRef(null);
  const activatorRef = useRef(null);
  
  const handleMenu = (e) => {
    setIsNavShow(!isNavShow);
  }
  const closeMenu = (e) => {
    isNavShow && setIsNavShow(false);
  }

  const keyMenuHandler = event => {
    if (event.key === "Escape" && isNavShow) {
      setIsNavShow(false);
    }
  };

  const clickOutsideHandler = event => {
    if (menuRef.current) {
      if (
        menuRef.current.contains(event.target) ||
        activatorRef.current.contains(event.target)
      ) {
        return;
      }

      setIsNavShow(false);
    }
  };

  useEffect(() => {
    if (isNavShow) {
      document.addEventListener("mousedown", clickOutsideHandler);
    } else {
      document.addEventListener("mousedown", clickOutsideHandler);
    }
  }, [isNavShow]);

  const items = [
    {
      ref: "product-category/bycicles/road",
      text: text.header.road
    },
    {
      ref: "product-category/bycicles/mtb",
      text: text.header.mtb
    },
    {
      ref: "product-category/bycicles/ebike",
      text: text.header.ebike
    },
    {
      ref: "product-category/bycicles/city",
      text: text.header.city
    }
  ];

  return (
    <div className='navbar' onKeyUp={keyMenuHandler}>
      <div className='navbar__container-logo'>
        <Link to='/'><img src={Logo} alt="" onClick={closeMenu} /></Link>
      </div>
      <nav className={`navbar__nav ${isNavShow ? 'active' : ''}`} ref={menuRef}>
        <Dropdown items={items} dropdownTitle={text.header.bycicles} />
        <div className="container-link">
          <Link className='item-link'>{text.header.contact}</Link>
        </div>
        <button className='navbar__nav--user'>
          <FaUserAlt />
        </button>
      </nav>
      <div className="navbar__extra-icons">
        <button className='navbar__extra-icons--cart'>
          <IoIosCart />
          <span className={`${totalProducts?.length > 0 && 'active'}`}>{totalProducts?.length > 0 && totalProducts.length}</span>
        </button>
        <button className='navbar__extra-icons--hamburguer' onClick={handleMenu} ref={activatorRef}>
          {isNavShow ? <GrClose /> : <FiMenu />}
        </button>
      </div>

    </div>
  )
}

export default Navbar;