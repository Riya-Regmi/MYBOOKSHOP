import axios from 'axios';
import React, { Component,useState,useEffect } from 'react';
import Books from '../books';
import './bookShow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronCircleDown,faChevronCircleUp} from '@fortawesome/free-solid-svg-icons'

const Comics=(props)=>{
    const[books,setBooks ]=useState({book:[]})
    const[isThereBooks,setisThereBooks]=useState(false)
        useEffect(() => {
                const getData=async()=>{
                    let bookDataFetched=await axios.get('http://127.0.0.1:8000/account/rest-auth/listOfSelectedBook/Comics');
                    let bookData=bookDataFetched.data;
                    if(bookData.length===0){
                        setisThereBooks(false);
                    }
                    else{
                        setBooks({book:bookData});
                        setisThereBooks(true);
                    }}
                    
                    getData()
            
        }, []) 


    

        const showElementToHide=(id)=>{
            let ids=id;
            document.getElementById('hideTheButton'+`${ids}`).style='display:none';
    
            document.getElementById(`${ids}`).style="display:block";
           // document.getElementById('elementsToHide').style="display:block";
           //document.getElementsByClassName("showMoreButton").style='display:none';
        }
        const hideElement=(id)=>{
            let ids=id;
           // document.getElementById('elementsToHide').style="display:none";
            //document.getElementById('showMoreButton').style='display:show';
            document.getElementById(`${ids}`).style="display:none"
    
            document.getElementById('hideTheButton'+`${ids}`).style='display:show';
    
        }
        const showBooks=()=>{
            return books.book.map(books=>{
                return(
                    
                        <div id="bookCard" key={books.id}>
                            <p className="bookTitle">{books.nameOfBook}</p>
                            <div>
                                <img src={books.bookImage}/>
                            </div>
                            <div className="bookContents" key={books.id}>
                                <p><span>Writer:</span>{books.nameOfWriter}</p>
                                <p><span>Date Of Publication:</span>{books.dateOfPublication}</p>
                                <p><span>Price:</span>{books.labelPriceBook}</p>
                              <div id={"hideTheButton"+books.id} style={{display:"block"}}>
                              <button  key={books.id}  className="showMoreButton" onClick={(e)=>{showElementToHide(books.id)}} ><FontAwesomeIcon icon={faChevronCircleDown} style={{color:"rgb(218, 195, 46)"}}/></button>
                              </div>
                              
                                <div className="elementsToHide" style={{display:"none"}} key={books.id} id={books.id}>
                                <p><span>Type:</span>{books.typeOfBook}</p>
                                <p><span>Condition:</span>{books.conditionBook}</p>
                                <p><button id="buttonToPay">Add to cart</button></p>
                                <p><button className="showLessButton" id={books.id} onClick={(e)=>{hideElement(books.id)}}><FontAwesomeIcon icon={faChevronCircleUp} style={{color:"rgb(218, 195, 46)"}}/></button></p>
                                </div>
                            </div>
                        </div>)})}
                    return(
                        <div>
                            <div className="showBook">
                            <div className="aboutBook">
                
                                {
                                    isThereBooks?showBooks():null
                                }
                
                            </div>
                        </div>
                        </div>
                    )
            }
            
        
    

export default Comics;
