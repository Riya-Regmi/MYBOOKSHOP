import axios from 'axios';
import React, { Component,useState,useEffect } from 'react';
import './recommendationCards.css';
import reading from '../../assests/reading.jpg';


const RecommendationCard=(props)=>{
    const[recommendationInfo,setRecommendationInfo]=useState({infos:[]});
    const[recommendationPresent,setRecommendationPresent]=useState(false);
    const[refreshRecommendation,setRefreahRecommendation]=useState(false);
    const[justAdded,setJustAdded]=useState(false);
    useEffect(()=>{
        const getRecommendations=async()=>{
            let recommendationFetched=await axios.get('http://127.0.0.1:8000/account/rest-auth/recommendationOfBookGET')
            let recommendationFetchedData=recommendationFetched.data;
            setRecommendationInfo({infos:recommendationFetchedData});
            console.log(recommendationFetchedData);
            setRecommendationPresent(true);
        }
        getRecommendations();
        
         

    },[])
   
    const showRecommendations=()=>{
        return recommendationInfo.infos.map(recommendations=>{
            return(
                <div id="recommendationInformation" key={recommendations.id}>
                    <div>
                        <div id="topOfRecommendationCard">
                        <div id="nameOFReviewer">
                            <div style={{marginRight:"5%"}}><img src={reading}/></div>
                            <div><span>{recommendations.name}</span></div>
                            </div>
                        <div id="dateToday">{recommendations.dateOFRecommendation}</div>


                        </div>
                        <div id="bodyOfRecommendation">
                            <p><span>Book/Text Book : </span>{recommendations.bookName}</p>
                            <p><span>Writer : </span>{recommendations.nameOfWriterRecommendation}</p>
                            <p><span>Review :</span>{recommendations.review}</p>


                        </div>
                        
                    </div>
                </div>
            )

        })
    }
    return(
        <div id="recommendationCardStyle">
            {
                recommendationPresent?showRecommendations():null
            }


        </div>
    )
}

export default RecommendationCard;