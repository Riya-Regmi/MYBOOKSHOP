import React, { Component } from 'react';
import './style.css';
import {Link, useLocation} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom'; 
import Books from '../Books/books'

const Navbar=(props)=>{
    return (
        <div className="choices">
         {/*   <Router>*/}

            <ul className="choicesMenu">
                <nav>
                <li><Link to={{pathname:'/'}}>Home</Link></li>
                <li><Link to={{pathname:'/Books'}}>Books</Link></li>
                <li>TextBook</li>
                <li>Notes</li>
                <li>Recommendation</li>
                </nav>


                


            </ul>
         {/*  </Router>*/}


        </div>
    )

}

export default Navbar;