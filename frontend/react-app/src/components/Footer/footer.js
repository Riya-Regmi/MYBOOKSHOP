import React, { Component } from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"

const Footer=(props)=>{
    return(
        <div className="footer">
            <div name="ContactUs">
                <p className="Contacts">CONNECT WITH US</p>
                <div className="contactItems">+977-12345678998
                    <br/>
                    myBookStore@gmail.com
                    <br/>
                    DreamLand-4,ABCD
                    <br/>
                    <li><FontAwesomeIcon icon={faFacebook}  style={{color:"lightseagreen",fontSize:"20px"}}/></li>
                    <li><FontAwesomeIcon icon={faInstagram}  style={{color:"lightseagreen",fontSize:"20px"}}/></li>
                    <li><FontAwesomeIcon icon={faTwitter}  style={{color:"lightseagreen",fontSize:"20px"}}/></li>
                </div>
            </div>
        </div>
    )
}

export default Footer;