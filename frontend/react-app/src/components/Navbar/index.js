import React, { Component } from 'react';
import './style.css';
import {HashLink as Link } from "react-router-hash-link";
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom'; 
import Books from '../Books/books'

const Navbar=(props)=>{
    return (
        <div className="choices">
            <Router>

            <ul className="choicesMenu">
                <nav>
                <li>Home</li>
                <li><NavLink to="/Books">Books</NavLink></li>
                <li>TextBook</li>
                <li>Notes</li>
                <li>Recommendation</li>
                </nav>


                


            </ul>
            </Router>


        </div>
    )

}

export default Navbar;