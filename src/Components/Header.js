import React from 'react';


const Header = (email) => {
  return (
    <div className="header">
      <div className="contact">
        <p>{email}</p>
      </div>
    </div>
  )
}


export default Header
