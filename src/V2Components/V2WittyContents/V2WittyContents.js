import "./style.css";
import React, { useCallback, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import {like,unlike} from "../../apis/users";
import V2WittyDelete from "../V2WittyDelete/V2WittyDelete";
import V2WittyModifyModal from "../V2WittyModifyModal/V2WittyModifyModal";


function V2WittyContents({data,myWitty}){
  const tags = data.tags;
  const wittyDelteId = data.id;
  
  

  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if(parseInt(startTime - nowTime) > -3600000){
      return <Moment format="M 분전">{startTime}</Moment>;
    }
    if(parseInt(startTime - nowTime) > -21600000){
      return <Moment format="H 시간전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };
 

  const [likeNum,setLikeNum] = useState(0);//좋아요 조회  최적화 요망
  const [likeStatus,setLikeStatus] = useState(true);
  const userLike = async () => {
    try{
      const result =  await like(data.id);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  const userUnLike = async () => {
    try{
      const result =  await unlike(data.id);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  
  function userLikeStatus(){
    setLikeStatus(!likeStatus);
    if(likeStatus===true){
      setLikeNum(likeNum+1)//좋아요 
      userLike();
    }else{
      setLikeNum(likeNum-1)//안좋아요
      userUnLike();
    }
  }
  

  return(
  <div style={{marginBottom:"10px"}}>
    <div id="wrap">
        <div id="container1">
            <div id="profileBox">
                {/* <img className="profileImg" src="img/a.png"></img> 프로필 사진*/}
            </div>
            <div className="name">{data.user.id}</div>
            <div className="major">{data.user.department}</div>
            {
              myWitty === data.user.id
              ?<div className="delete-modify-box">
                <V2WittyDelete wittyDelteId={wittyDelteId}></V2WittyDelete>
                <V2WittyModifyModal data={data}></V2WittyModifyModal>
               </div>
              :null
            }
            
            <div className="date">{displayCreatedAt(data.createdDateTime)}</div>
            <div className="contents">{data.content}</div>
        </div>
        {/*
        <div id="wrapImg">
            <img src="img/main.png"></img> 이미지 업로드시 에만 사용
        </div>
        */}
        <div id="container2">
          {
            tags !== []
            ?tags.map(function(tag){
              return <div className="hashTag" key={uuidv4()}>#{tag.name}</div>
            })
            :null
          }
            <FontAwesomeIcon className="fa fa-heart" icon={solid('heart')} aria-hidden="true" onClick={()=>{
              data.likeStatus >= 1
              ?alert("이미좋아요를 눌름")
              :userLikeStatus()
              }}/>
            <div className="like">{data.likes+likeNum}</div>
            <FontAwesomeIcon 
            className="fa fa-commenting-o" 
            icon={solid('comment-dots')} 
            aria-hidden="true" 
            onClick={()=>{
            }}
            />
            
        </div>
    </div>
  </div>
  )}
  
  export default V2WittyContents;