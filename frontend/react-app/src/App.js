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


function App() {
  return (
    <Router>
    <div className="Home">
      <Header/>
      <Navbar/>
      <Switch>
      <Route exact path="/"  component={App1}/>
      <Route  exact path="/Books" component={Books}/>
      <Route exact path="/dashboard">
        <DashBoard/>
    </Route>
      </Switch>



      



    </div>
    </Router>
  
  );
}

export default App;
