import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Dropdown = ({ items = [], dropdownTitle, handler, style }) => {

  const activatorRef = useRef(null);
  const dropdownListRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
    addOutsideHandler();
  };

  const handleClick = (e) => {
    setIsOpen(false);
    addOutsideHandler();
    handler(e);
  }

  function addOutsideHandler() {
    if (isOpen) {
      document.addEventListener("mousedown", clickOutsideHandler);
    } else {
      document.addEventListener("mousedown", clickOutsideHandler);
    }
  }

  const clickOutsideHandler = event => {
    if (dropdownListRef.current) {
      if (
        dropdownListRef.current.contains(event.target) ||
        activatorRef.current.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    }
  };


  return (
    <div className='dropdown_wrapper' style={style} onClick={clickHandler}>
      <p
        className='dropdown_activator'
        aria-haspopup="true"
        aria-controls={dropdownTitle}
        ref={activatorRef}
      >
        {dropdownTitle}{" "}
        {isOpen ? (
          <svg
            height="24"
            fill="rgb(70,70,70)"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h24v24h-24z" fill="none" />
            <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
          </svg>
        ) : (
          <svg
            height="24"
            fill="rgb(70,70,70)"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h24v24h-24z" fill="none" />
            <path d="m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
          </svg>
        )}
      </p>
      <ul
        ref={dropdownListRef}
        className={`dropdown_item_list ${isOpen ? 'active' : ''} `}
      >
        {items.map((item, index) => {
          return (
            <li className='item_list' key={index}>
              <Link to={item.ref} onClick={handleClick} name={item.text.toLowerCase()} >{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  dropdownTitle: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}
export default Dropdown;