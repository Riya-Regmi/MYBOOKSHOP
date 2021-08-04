import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { faEnvelopeOpenText,faPhone,faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'

import './books.css';
import child from '../../assests/child.webp'
import BookShow from './bookShow/bookShow';
import Fiction from './bookShow/fiction';
import NoNFiction from './bookShow/nonFiction';
import History from './bookShow/History';
import Biography from './bookShow/biography';
import Kids from './bookShow/kids';
import SelfHelp from './bookShow/selfHelp';
import Comics from './bookShow/comics';
import { faStoreAltSlash ,faShoppingCart, faOtter} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Books=(props)=>{
    let loginVerify=props.data;
    const[all,setAll]=useState(true);
   const[fiction,setFiction]=useState(false);
   const[nonFiction,setNonFiction]=useState(false);
   const[history,setHistory]=useState(false);
   const[biography,setBiography]=useState(false);
   const[kids,setKids]=useState(false);
   const[selfHelp,setSelfHelp]=useState(false);
   const[comics,setComics]=useState(false);
   const[count,setCount]=useState(0);
   const[addedOnCartModal,setaddedOnCartModal]=useState();
    const[addBookID,setAddBookID]=useState([]);
    const[bookInfo,setBookInfo ]=useState([]);
    const[bookInfoEdited,setBookInfoEdited]=useState([]);
    const[openModalBook,setOpenModalBook]=useState(false);
    const[buyBookList,setBuyBookList]=useState(false);
    const[buyBookTotal,setBuyBookTotal]=useState(0);
    const functionAll=()=>{
        setAll(true);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);
    }
    const functionFiction=()=>{
        setAll(false);
        setFiction(true);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionNonFiction=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(true);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionHistory=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(true);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(false);
    }
    const functionBiography=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(true);
        setKids(false);
        setSelfHelp(false);
        setComics(false);

    }
    const functionKids=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(true);
        setSelfHelp(false);
        setComics(false);

    }
    const functionSelfHelp=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(true);
        setComics(false);

    }
    const functionComics=()=>{
        setAll(false);
        setFiction(false);
        setNonFiction(false);
        setHistory(false);
        setBiography(false);
        setKids(false);
        setSelfHelp(false);
        setComics(true);
    }
    const getIDOfBook=(data)=>{
        let countUp=count+1;
        document.getElementById('countBook').innerHTML=countUp;
        setCount(countUp);
        addBookID.push(data);
        

        
    }

    async function functionAddedOnCart(){
        let bookIDS=addBookID;
       for(let i=0;i<bookIDS.length;i++){
         let bookInformation=await axios.get(`http://127.0.0.1:8000/account/rest-auth/getBook/${bookIDS[i]}`)
         bookInfo.push(bookInformation.data)
         
           }
          for(let i=0;i<bookInfo.length;i++){
              for(let j=i+1;j<bookInfo.length;j++){
                  if(JSON.stringify(bookInfo[i])===JSON.stringify(bookInfo[j])){
                     bookInfo.splice(j,1)
                  }    
              }
          }

          
          
          
          
         


        if(bookIDS.length!==0){
            setOpenModalBook(true);
            setBuyBookList(true);
        }
        else{
            alert("Cart is empty")
        }


    }
    

    const returnBuyBookList=()=>{
        return bookInfo.map((book,num)=>{
            let total=book[0].labelPriceBook
            console.log(total)
                return(
                    <tr>
                        <td>{num+1}.</td>
                        <td>{book[0].nameOfBook}</td>
                        <td>{book[0].labelPriceBook}</td>
                        <td><button id="cancelBuyBookButton">Cancel</button></td>
                        <td></td>
                    </tr>
                )})}
    
        
    
        
    
    
    return(
        <div id="Books">
            <div className="topBackgroundBook">
                <div className="topBackgroundBookWrittenContent">
                    <div className="topBackgroundBookWrittenContentStyles">
                    <p>Buy <span>your</span></p>
                    <p>favourite <span>Book</span></p>
                    <p>from <span>Here</span></p>
                    </div>
                </div>
                <div className="topBackgroundBookImage">
                    <img src={child} style={{height:"100%"}}/>
                </div>
            </div>
            <p className="titleBook">BOOKS</p>
            <div className="bodyBook">
                <div className="leftColoumBook">
                    <p className="categoriesBookTitle">CATEGORIES</p>
                    <div className="categoriesContentBook">
                        <p onClick={functionAll}>All</p>
                        <p onClick={functionFiction}>Fiction</p>
                        <p onClick={functionNonFiction}>Non-Fiction</p>
                        <p onClick={functionHistory}>History</p>
                        <p onClick={functionBiography}>Biography</p>
                        <p onClick={functionKids}>Kids</p>
                        <p onClick={functionSelfHelp}>Self Help</p>
                        <p onClick={functionComics}>Comics</p>
                        <p onClick={functionAddedOnCart}>Added On Cart<FontAwesomeIcon icon={faShoppingCart}/>(<span id="countBook">{count}</span>)</p>
                    </div>

                </div>
                <div className="rightPartBook">
                    {
                        all?<BookShow bookFunction={getIDOfBook} loginStatus={loginVerify}/>:fiction?<Fiction/>:nonFiction?<NoNFiction/>:history?<History/>:biography?<Biography/>:
                        kids?<Kids/>:selfHelp?<SelfHelp/>:comics?<Comics/>:<BookShow/>
                    }
                    
                 
                    
                    
                        

                </div>

            </div>
            <Modal isOpen={openModalBook} id="buyBookModal" style={{backgroundColor:"rgb(231, 213, 167)"}} >
                <div className="buyBookModalTop">
                    <div style={{marginLeft:"10%"}}>Your List</div>
                    <div><FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={()=>{setOpenModalBook(false);setBuyBookList(false)}}/></div>
                </div>
                <div id="BuyTable">
                <div className="buyBookModalMiddle">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Cancel</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {buyBookList?returnBuyBookList():null}
                    </tbody>
                </div>
                <div className="buyBookModalBottom">
                    {buyBookList?
                    <div>
                        <tr>
                            {}
                        </tr>
                    </div>
                        :null}
                </div>


                </div>
            </Modal>
        </div>
    )
}

export default Books;