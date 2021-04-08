import React, { Component,useState,useEffect } from 'react';
import './dashboard.css';
import { matchPath } from 'react-router-dom';
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText,faPhone,faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'
import AboutUS from '../AboutUs/index';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'; 
import App1 from '../../App1';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {API_URL} from '../../constant/index';
import Modal from 'react-modal';







const DashBoard=(props)=>{
    
    let location =useLocation();
    let idOfUser=location.id;
    let loginStatus=location.isLogged;
    const[firstName,setfirstName]=useState("");
        const[lastName,setlastName]=useState("");
        const[email,setemail]=useState("");
        const[phoneNumber,setphoneNumber]=useState("");
        const[password,setpassword]=useState("");
        const[picture,setPicture]=useState();
        const [showPW,setshowPW]=useState(false);
        const[editFirstName,seteditFirstName]=useState(null);
        const[editLastName,seteditLastName]=useState(null);
        const[editEmail,seteditEmail]=useState(null);
        const[editPhoneNumber,seteditPhoneNumber]=useState(null);
        const[editPassword,seteditPassword]=useState(null);
        const[editPicture,seteditPicture]=useState(null);
        const[addBook,setAddBook]=useState(false);
        const[addTextBook,setAddTextBook]=useState(false);
        const[addNotes,setAddNotes]=useState(false);
        const[selectTypeBook,setSelecetTypeBook]=useState(null);
        const[book,setNameBook]=useState("Book")
        const[nameOfWriter,setNameOfWriter]=useState(null);
        const[labelPriceBook,setLabelPriceBook]=useState(null);
        const[bookImage,setBookImage]=useState(null);
        const[nameOfBook,setNameOfBook]=useState(null);
        const[dateOfPublication,setDateOfPublication]=useState(null);
        const[conditionBook,setConditionBook]=useState(null);
        const[selectTypeNote,setSelectTypeNote]=useState(null);
        const[titleOfNote,setTitleOfNote]=useState(null);
        const[priceOfNote,setPriceOfNote]=useState(null);
        const[facult,setFaculty]=useState(null);
        const[detailOfNote,setDetailOfNote]=useState(null);


        
        
        
        
    if(loginStatus===true){
        
       const getData= async()=>{
            const dataOfUser=await axios.get(`http://127.0.0.1:8000/account/rest-auth/userdetail/${idOfUser}`)
            setfirstName(dataOfUser.data.firstName);
            setlastName(dataOfUser.data.lastName);
            setemail(dataOfUser.data.email);
            setphoneNumber(dataOfUser.data.phoneNumber);
            setpassword(dataOfUser.data.password);
            setPicture(dataOfUser.data.dp);   
            console.log(typeof(picture))
        }
        getData();
        const editTheProfile=(e)=>{
            e.preventDefault();

            document.getElementById('infoPersonal').style='display:none';
            document.getElementById('editAndUpdate').style='display:block';
        }
        const hideTheProfile=(e)=>{
            e.preventDefault();
            document.getElementById('infoPersonal').style='display:block';
            document.getElementById('editAndUpdate').style='display:none';
            setshowPW(false);}
        const showBoughtBookInfo=(e)=>{
            e.preventDefault();
            document.getElementById('showTheActivityInfo').style='display:block';

        }
        
        
        async function update(e){
            e.preventDefault();
            const dataOfUsers=await axios.get(API_URL);
            let numberOfData=dataOfUsers.data.length;
            for(var k=0;k<dataOfUsers.data.length;k++){
                let idOfLogger=dataOfUsers.data[k].['id'];
                let emailToCheck=dataOfUsers.data[k].['email'];
                if(emailToCheck===editEmail){
                    if(idOfUser!==idOfLogger){
                        alert("Email already exists.Try with new email");
                        break;}
                    else{
                        continue;
                    }
                }
                if(k+1==numberOfData){
                    if(editFirstName===null){seteditFirstName(firstName)};
                    if(editLastName===null){seteditLastName(lastName)}
                    if(editEmail===null){seteditEmail(email)};
                    if(editPhoneNumber===null){seteditPhoneNumber(phoneNumber)};
                    if(editPassword===null){seteditPassword(password)};
                    if(editPhoneNumber===null){seteditPicture(picture)};
                    let updateDataOfUser=new FormData();
                    updateDataOfUser.append('firstName',editFirstName);
                    updateDataOfUser.append('lastName',editLastName);
                    updateDataOfUser.append('email',editEmail);
                    updateDataOfUser.append('phoneNumber',editPhoneNumber);
                    updateDataOfUser.append('password',editPassword);
                    updateDataOfUser.append('confirmPassword',editPassword);
                    axios.put(`http://127.0.0.1:8000/account/rest-auth/updateUser/${idOfUser}`,updateDataOfUser)
                    .then(
                        document.getElementById('names').innerText=`${editFirstName} ${editLastName}`
                    )
                    hideTheProfile(e);
                }   
            }}
            async function infoOfBook(e){
                e.preventDefault();

                console.log(typeof(bookImage))
                let bookInfoForm=new FormData();
                bookInfoForm.append('book',book)
                bookInfoForm.append('typeOfBook',selectTypeBook);
                bookInfoForm.append('nameOfWriter',nameOfWriter);
                bookInfoForm.append('labelPriceBook',labelPriceBook);
                bookInfoForm.append('bookImage',bookImage);
                bookInfoForm.append('nameOfBook',nameOfBook);
                bookInfoForm.append('dateOfPublication',dateOfPublication);
                bookInfoForm.append('conditionBook',conditionBook);
                console.log(selectTypeBook)
                await axios.post(`http://127.0.0.1:8000/account/rest-auth/bookInfo/${idOfUser}`,bookInfoForm,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    mode: 'no-cors'
                  })
                .then(alert("done"))
                
            }
            
        return(
                <div className="personalData">
                        <div className="personalInfo"  style={{display:"block"}}>
                            <div className="personalPhoto">
                                <img src={picture}/>
                            </div>
                            <div id="infoPersonal">
                                <p id="names">{firstName} {lastName}</p>
                                <button onClick={editTheProfile}>Edit Profile</button>
                                <div className="otherInfo">
                                    <p><FontAwesomeIcon icon={faEnvelopeOpenText} style={{margin:"0 10px"}}/>{email}</p>
                                    <p style={{margin:"-2% 0"}}><FontAwesomeIcon icon={faPhone} style={{margin:"0 10px"}}/>{phoneNumber}</p>
                                </div>
                            </div>
                            <div id="editAndUpdate" style={{display:"none"}}>
                            <form  onSubmit={update} method="POST">

                                <button >Update Picture</button>
                                <br/>
                                <li> <span>First Name :</span> <input type="text" name="firstName" defaultValue={firstName}    onChange={e=>seteditFirstName(e.target.value)} required/></li>
                                    <br/>
                                    <li> <span>Last Name :</span> <input type="text" defaultValue={lastName} onChange={(e)=>seteditLastName(e.target.value)}/> </li>
                                    <br/>
                                    <li><span>Email:</span> <input type="email" defaultValue={email} onChange={e=>seteditEmail(e.target.value)}/></li>
                                    <br/>
                                    <li><span>PhoneNumber:</span><input type="phonenumber" defaultValue={phoneNumber} onChange={e=>seteditPhoneNumber(e.target.value)}/></li>
                                    <br/>
                                    <li><span >Password:</span><input id="pw" type={showPW?"text":"password"} style={showPW? {border:"1px solid plum",boxShadow:"none",margin:"0 50px",borderRadius:"0px",height:"26px"}:{border:"1px solid plum",boxShadow:"none",margin:"0 50px",borderRadius:"0px",height:"26px",textAlign:"left",padding:"1px"}} value={password} onChange={e=>seteditPassword(e.target.value)} /><FontAwesomeIcon icon={faEye} onClick={()=>setshowPW(!showPW)}  id="pw" style={showPW? {margin:"0px -20%",cursor:"pointer",color:"plum" }:{margin:"0px -20%",cursor:"pointer",color:"grey" }}  /></li>

                                    
                                    <br/>
                                    <div id="buttonsForSave">
                                    <span>
                                    <button type="submit" id="saveButton">Save</button>

                                    <button id="cancelButton" onClick={hideTheProfile }>Cancel</button></span>    
                                    
                                    
                                    </div>
                                    </form>


                            </div>
                            </div>
                    
                
                
                <div className="importExportInfo">
                    <div id="itemToBeAdded">
                        <button id="books" onClick={(e)=>{e.preventDefault();setAddBook(true)}}><FontAwesomeIcon icon={faPlus} /> Add Books</button>
                        <br/>
                        <button id="TextBook" onClick={(e)=>{e.preventDefault();setAddTextBook(true)}}><FontAwesomeIcon icon={faPlus} /> Add TextBook</button>
                        <br/>
                        
                        <button id="Notes" onClick={(e)=>{e.preventDefault();setAddNotes(true)}}><FontAwesomeIcon icon={faPlus} /> Add Notes</button>
                    </div>
                    <Modal isOpen={addBook} className="bookModal">
                        <div style={{height:"100%",width:"95%"}}>
                        <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddBook(false)}} style={{color:"rgb(238, 16, 90)",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                        <div className="bookTitle">
                            <p>PLEASE FILL THE DETAILS...</p>
                        </div>
                        <form onSubmit={infoOfBook} method="POST">
                        <div className="bookDetailSpace">
                            <div className="bookDetailLeft">
                                <p>Select:</p>
                                <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"none",height:"auto"}} onChange={(e)=>{e.preventDefault();setSelecetTypeBook(e.target.value)}}   required>
                                <option value="Fiction" >Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="History">History</option>
                                <option value="Biography">Biography</option>
                                <option value="Kids">Kids</option>
                                <option value="Self Help">Self Help</option>
                                <option value="Comics">Comics</option>
                                </select>

                                <br/>
                                <br/>
                                <p>Name Of Writer : </p>
                                <input type="text" placeholder=" Robert Kiyosaki" value={nameOfWriter} onChange={(e)=>{e.preventDefault();setNameOfWriter(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Labelled Price :</p>
                                <input type="text" placeholder="Rs.200" value={labelPriceBook} onChange={(e)=>{e.preventDefault();setLabelPriceBook(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Upload Image:</p>
                                <input type="file" id="img" name="img" accept="image/*" value={bookImage} onChange={(e)=>{e.preventDefault();setBookImage(e.target.value)}} required/>
                                
                            </div>
                            <div className="bookDetailRight">
                                <p>Name Of Book:</p>
                                <input type="text" placeholder="Rich Dad Poor Dad" value={nameOfBook} onChange={(e)=>{e.preventDefault();setNameOfBook(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <br/>
                                <p>Date of Publication:</p>
                                <input type="date" placeholder="5/12/1997" value={dateOfPublication} onChange={(e)=>{e.preventDefault();setDateOfPublication(e.target.value)}} required/>
                                <br/>
                                <br/>
                                <p>Condition :</p>
                                <textarea type="text" placeholder="Page no.15 is torn.Small foldings are present" value={conditionBook} onChange={(e)=>{e.preventDefault();setConditionBook(e.target.value)}}required/>
                                <br/>
                                <br/>
                                <p>Submit:</p>
                                <input type="submit"/>
                                

                            </div>
                        </div>
                        </form>
                        

                        </div>


                    </Modal>
                    <Modal isOpen={addTextBook} className="textBookModal">
                        <div style={{height:"100%",width:"95%"}}>
                        <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddTextBook(false)}} style={{color:"rgb(3, 145, 192)",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                        <div className="textBookTitle">
                            <p>PLEASE FILL THE DETAILS...</p>
                        </div>
                        <form>
                            <div className="textBookDetailSpace">
                                <div className="textBookDetailLeft">
                                    <p>Select:</p>
                                    <select style={{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"1px solid lightblue",height:"auto"}} required>
                                        <option value="Law">Law</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Management">Management</option>
                                        <option value="BioChemistry">BioChemistry</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Physics">Physics</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <p>Name Of Writer : </p>
                                    <input type="text" placeholder="ABCD" required/>
                                    <br/>
                                    <br/>
                                    <p>Labelled Price : </p>
                                    <input type="text" placeholder="Rs.200" required/>
                                    <br/>
                                    <br/>
                                    <p>Upload Image:</p>
                                    <input type="file" id="img" name="img" accept="image/*" required/>




                                </div>
                                <div className="textBookDetailRight">
                                    <p>Name Of Text Book:</p>
                                    <input type="text" placeholder="Statics"/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p>Date Of Publication : </p>
                                    <input type="date" placeholder="2/15/2005"/>
                                    <br/>
                                    <br/>
                                    <p>Condition :</p>
                                    <textarea type="text" placeholder="Page no.15 is torn.Small foldings are present" required/>
                                    <br/>
                                    <br/>
                                    <p>Submit:</p>
                                    <input type="submit"/>
                                

                                    </div>
                            </div>
                        </form>

                        </div>

                    </Modal>
                    <Modal isOpen={addNotes} className="notesModal">
                        <div style={{height:"100%",width:"95%"}}>
                            <FontAwesomeIcon icon={faTimes} onClick={(e)=>{e.preventDefault();setAddNotes(false)}}  style={{color:"green",fontSize:"35px",float:"right",cursor:"pointer",fontWeight:"bolder",marginTop:"10px"}}/>
                            <div className="notesTitle">
                                <p>PLEASE FILL THE DETAIL...</p>
                            </div>
                            <form>
                                <div className="notesDetailSpace">
                                    <div className="notesDetailLeft">
                                        <p>Select : </p>
                                        <select style= {{backgroundColor:"white",borderRadius:"0px",boxShadow:"none",border:"1px solid green",height:"auto"}}>
                                            <option value="Hand-Written">Hand-Written</option>
                                            <option value="Printed">Printed</option>                                            
                                        </select>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Enter Title Of Your Note : </p>
                                        <input type="text" placeholder="Statictic"/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Price You Want TO Sell : </p>
                                        <input type="text" placeholder="Rs.200"/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    <div className="notesDetailSpaceRight">
                                        <p>Faculty : </p>
                                        <input type="text" placeholder="Management"/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Please explain in detail</p>
                                        <textarea type="text" placeholder="All the important topics are discussed here in detail from exam point of view."/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Submit:</p>
                                        <input type="submit" value="Submit"/>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </Modal>
                    <div id="activities">
                        <p>Your Activities</p>
                        <div id="activityOfBook">
                            <ul>
                                <li><button id="boughtBooks" onClick={showBoughtBookInfo}>Bought Items</button></li>
                                <li><button id="soldBooks">Sold Items</button></li>
                                <li><button id="addedOnList">Added on list</button></li>
                            </ul>   
                        </div>
                    </div>
                    <div  id="showTheActivityInfo" style={{display:"none"}}>
                        <div>
                            <p>Bought Books</p>
                        </div>


                </div>
    
                </div>
                
            </div>
            
        )
    }
    else{
       return(
           <div>
               <App1/>
               
           </div>
       ) 
    }

   };
export default DashBoard;
