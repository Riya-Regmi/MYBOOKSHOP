import React, { Component } from 'react';
import './style.css';
import {Link, useLocation} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom'; 
import Books from '../Books/books'
import textBook from '../TextBook/textBook';

const Navbar=(props)=>{
    return (
        <div className="choices">
         {/*   <Router>*/}

            <ul className="choicesMenu">
                <nav>
                <li><Link to={{pathname:'/'}}>Home</Link></li>
                <li><Link to={{pathname:'/Books'}}>Books</Link></li>
                <li><Link to={{pathname:'/textBook'}}>TextBook</Link></li>
                <li><Link to={{pathname:'/Notes'}}>Notes</Link></li>
                <li><Link to={{pathname:'/Recommendation'}}>Recommendation</Link></li>
                </nav>


                


            </ul>
         {/*  </Router>*/}


        </div>
    )

}

export default Navbar;