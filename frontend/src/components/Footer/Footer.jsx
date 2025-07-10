import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam delectus, corporis culpa illum temporibus, quo earum explicabo magnam natus asperiores soluta sunt necessitatibus rem sed voluptatum, minima nobis similique totam!</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-234-567-890</li>
                    <li>contact@gmail.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className='footer-copright'>Copyright 2024 @ Tomato.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
