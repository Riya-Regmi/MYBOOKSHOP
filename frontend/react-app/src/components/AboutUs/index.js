import React, { Component } from 'react'
import './style.css';
import shoppingCart from '../../assests/shoppingcart.jpeg';
import Cards from './Card/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHandHoldingUsd, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'



const AboutUS=(props)=>{
    function showMore(e){
        e.preventDefault();
        document.getElementById('ReadLess').style='display:block';
        document.getElementById('ReadMore').style='display:none';
        document.getElementById('moreParagraph').style='display:block';

    };

    function showLess(e){
        e.preventDefault();
        document.getElementById('ReadMore').style='display:block';
        document.getElementById('ReadLess').style='display:none';
        document.getElementById('moreParagraph').style='display:none';

    }

    const isOverFlown=false;
    
    return(
        <div>
        <div className="aboutUS">
            <div className="photo" style={{width:"60%"}}>
            <img src={shoppingCart} style={{height:"100%",width:"90%",margin:"0px 0px",borderRadius:"25px 60px" }} alt="images"/>
            </div>
            <div className="aboutShop" style={{width:"40%"}}>
                <h2 className="title2">ABOUT US</h2>
                <div className="paragraph" style={{textAlign:"left",margin:"20px 0"}}>
                    <p>Dear Readers,</p>
                    <p>My Book Store is an online bookstore website with effective customer profiling system. In this bookstore customer will be able to purchase and sell books online.
                    We offer tremendous gathering of books in various classification of Fiction,
                    Non-fiction, Biographies, History, Religions, Self – Help, Children. We likewise move in immense accumulation of Investments and Management, Computers, Engineering, Medical, College and School content references books proposed 
                    by various foundations as schedule the nation over.
                    </p>
                    <p id="moreParagraph" style={{display:"none"}}>
                    Our project basically consists of two parts where the first part is creating online bookstore and the second part is implementing customer profiling system to online bookstore.
                    Our purpose is develop a such system that will help customers in choosing or selling a book and making payment.
                    This website can be used for business purposes to sell a book via online also.
                    </p>
                    <button id="ReadMore" style={{display:"block"}} onClick={showMore}>Read More</button>
                    <button id="ReadLess" style={{display:"none"}} onClick={showLess}>Read Less</button>
                </div>
            </div>
        </div>
        
        <div className="services">
            <h2 className="title3">Our Services</h2>
            <div className="servicesTypes" >
                <Cards>
                    <span className="title4">Buy</span>
                    <FontAwesomeIcon icon={faShoppingCart}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can buy new or used books,textbooks,notes at a resonable price.</p>
                </Cards>
                <Cards>
                    <span className="title4">Sell</span>
                    <FontAwesomeIcon icon={faHandHoldingUsd}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can sell their used books,textbooks,notes at a resonable price.</p>

                </Cards>
                <Cards>
                    <span className="title4">Recommend</span>
                    <FontAwesomeIcon icon={faEdit}  style={{color:"lightseagreen",fontSize:"30px",margin:"0 30px"}}/>
                    <p className="cardsParagraph">User can recommend the items they read to others.</p>

                </Cards>
            </div>
            
            



            </div>
        </div>
    )
}

export default AboutUS;