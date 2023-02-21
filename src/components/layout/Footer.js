import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer--link'>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Private Policy</Link>
      </div>

      <hr></hr>
      <div className='footer--copyright'>
      <p>© 2023 The Circle. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;