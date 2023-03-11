import React from 'react'
import { AiOutlineShoppingCart, AiOutlineSearch, AiOutlineUser, AiOutlinePlus, AiFillCaretDown } from 'react-icons/ai'
// import { TiFlowSwitch } from 'react-icons/ti'
// import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
       <div className="container">
            <div className="nav-container">
                <div className="logo">
                    <h1><span>L</span>ogo</h1>
                </div>

                <nav className="navbar">
                    <ul className="nav-links">
                        <li className="nav-link">
                            <a href='/#'>Home</a>
                        </li>
                        <li className="nav-link">
                            <a href='/#'>Shop</a>
                        </li>
                        <li className="nav-link">
                            <a href='/#'>Products <AiOutlinePlus className='plus-icon'/></a>
                            <ul className="secondary-links product-links">
                                <li className="secondary-link product-link"><a href="/#">T-shirt</a></li>
                                <li className="secondary-link product-link"><a href="/#">Pant</a></li>
                                <li className="secondary-link product-link"><a href="/#">Shirt</a></li>
                                <li className="secondary-link product-link"><a href="/#">Shoe</a></li>
                                <li className="secondary-link product-link"><a href="/#">Kids</a></li>
                                <li className="secondary-link product-link"><a href="/#">Watch</a></li>
                            </ul>
                        </li>
                        <li className="nav-link">
                            <a href='/#'>Pages</a>
                        </li>
                        <li className="nav-link">
                            <a href='/#'>Blog</a>
                        </li>
                        <li className="nav-link">
                            <a href='/#'>Contact</a>
                        </li>
                    </ul>
                    <ul className="nav-items">
                        <li className='nav-item'>
                            <a href='/#'><AiOutlineUser className='icons user-icon' /> <AiFillCaretDown className='cart-icon' /></a>
                            <ul className='secondary-links'>
                                <li className='secondary-link'>
                                    <a href='/#'>Login</a>
                                </li>
                                <li className='secondary-link'>
                                    <a href='/#'>Register</a>
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item'>
                            <a href='/#'><AiOutlineSearch className='icons search-icon' /></a>
                        </li>
                        <li className='nav-item'>
                            <a href='/#'><AiOutlineShoppingCart className='icons cary-icon' /></a>
                        </li>
                    </ul>

                    <div className="handburger">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                </nav>
            </div>
       </div>
    </div>
  )
}

export default Header