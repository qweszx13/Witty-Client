import { Avatar,Button,message} from 'antd';
import Moment from 'react-moment';
import 'moment-timezone';
import {follow} from "../../apis/users";
import V2WittyDelete from "../V2WittyDelete/V2WittyDelete";
import V2WittyModifyModal from "../V2WittyModifyModal/V2WittyModifyModal";
import { useState } from 'react';
import React from 'react'
import { icon } from '@fortawesome/fontawesome-svg-core';

function WittyHeaderComponent({data,myWitty,searchContentKey}) {
  const [userFollowStatus,setUserFollowStatus] = useState("팔로우");
  const [buttonStatus,setButtonStatus] = useState("inline-block");
  const userProfileImg = data.user.profileImgUrl;
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
    if(parseInt(startTime - nowTime) <= -3600000){
      return <Moment format="H 시간전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  const setFollow = async (followId) => {
    try{
      const result =  await follow(followId);
      setUserFollowStatus("✔")
      message.success("팔로우 신청 완료");
    }catch ({
      response: {
        data: { result },
      },
    }) {
      message.warn("이미 팔로우한 유저입니다.");
    }
  }
 
     
  return (
    <div style={{display: "flex", marginTop:"10px",marginLeft:"10px",marginBottom: "10px",width:"100%"}}>
        <div size={64} style={{marginRight: "12px"}}>
           <img className="profileImg" src={process.env.PUBLIC_URL + '/v2/users/image/'+userProfileImg}></img>
        </div>
        <div style={{width:"100%"}}>
            <div className='user-profile' style={{display: "flex",width:"100%"}}>
                <h3 style={{fontSize:"1.17rem", marginRight:"4px"}}>{data.user.id}</h3> {/*사용자 이름*/}
                <h3 style={{fontSize:"0.8rem",display:"flex", alignItems:"center", color:"grey"}}>{data.user.department}</h3> {/*학부*/}
                
                {
                  myWitty === data.user.id
                  ?<div style={{
                    fontSize:"0.8rem",
                    textAlign:"center",
                    display:"flex",
                    float:"right",
                    marginLeft:"auto",
                    marginRight:"10px"
                    
                    }}>
                    <V2WittyDelete wittyDelteId={wittyDelteId}></V2WittyDelete>
                    <V2WittyModifyModal data={data}></V2WittyModifyModal>
                  </div>
                  :searchContentKey === 1
                    ?<Button type="primary" style={{
                      margin:"0 15px",
                      borderColor: "#6AAFE6",
                      background: "#6AAFE6",
                      borderRadius:"50px",
                      display:"flex",
                      float:"right",
                      marginLeft:"auto",
                      marginRight:"20px",

                    }} onClick={()=>{
                      setFollow(data.user.id);
                    }}>{userFollowStatus}</Button>
                    :null
                }
               
            </div>
            <div style={{color:"grey"}}>
                {displayCreatedAt(data.createdDateTime)}
            </div>
        </div>
    </div>
  )
}

export default WittyHeaderComponent