import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <div className='container'>
            <div className="navbar-container">
                <div className="logo">
                    <h1>Logo</h1>
                </div>
                <nav className='navbar'>
                    <div className="handburger">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Header