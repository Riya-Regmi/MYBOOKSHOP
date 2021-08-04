import './App.css';
import Header from './components/Header/index';
import Navbar from './components/Navbar/index';
import AboutUs from './components/AboutUs/index';
import AboutUS from './components/AboutUs/index';
import Footer from './components/Footer/footer';
import App1 from './App1';
import Books from './components/Books/books';
import DashBoard from './components/DashBoard/dashboard';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'; 
import idOfUser from './components/Header/index';
import React, { Component,useState,useEffect } from 'react';


function App() {
const[userIdOfLogin,setUserIDOFLogin]=useState();
  return (
    <Router>
    <div className="Home">
      <Header  setUserIDOFLogin={setUserIDOFLogin}/>
      <Navbar/>
      <Switch>
      <Route exact path="/"  component={App1}/>
      <Route exact path="/dashboard">
        <DashBoard />
    </Route>
    <Route exact path="/Books">
      <Books data={userIdOfLogin}/>

    </Route>
    
      </Switch>



      



    </div>
    </Router>
  
  );
}

export default App;
