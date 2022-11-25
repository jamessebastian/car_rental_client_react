import React from 'react';

const Footer = () => {
  return (
    <div className='footer-dark'>
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 col-md-3 item'>
              <h3>Locations</h3>
              <ul>
                <li>
                  <a href='#'>USA</a>
                </li>
                <li>
                  <a href='#'>Canada</a>
                </li>
                <li>
                  <a href='#'>UK</a>
                </li>
              </ul>
            </div>
            <div className='col-sm-6 col-md-3 item'>
              <h3>Support</h3>
              <ul>
                <li>
                  <a href='#'>Contact us</a>
                </li>
                <li>
                  <a href='#'>About</a>
                </li>
                <li>
                  <a href='#'>Blogs</a>
                </li>
              </ul>
            </div>
            <div className='col-md-6 item text'>
              <h3>CarRental</h3>
              <p>
              We help car rental and livery agencies to manage their business operations. ·
              </p>
            </div>
            <div className='col item social'>
              <a href='#'>
                <i className='icon ion-social-facebook'></i>
              </a>
              <a href='#'>
                <i className='icon ion-social-twitter'></i>
              </a>
              <a href='#'>
                <i className='icon ion-social-snapchat'></i>
              </a>
              <a href='#'>
                <i className='icon ion-social-instagram'></i>
              </a>
            </div>
          </div>
          <p className='copyright'>CarRental © 2022</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
