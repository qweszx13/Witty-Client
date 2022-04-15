import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import 'moment-timezone';
import V2WittyDelete from "../V2WittyDelete/V2WittyDelete";
import V2WittyModifyModal from "../V2WittyModifyModal/V2WittyModifyModal";
import React from 'react'

function WittyHeaderComponent({data,myWitty}) {
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
 
     
  return (
    <div style={{display: "flex", marginTop:"10px",marginLeft:"10px",marginBottom: "10px",width:"100%"}}>
        <div size={64} style={{marginRight: "12px"}}>
           <img className="profileImg" src={process.env.PUBLIC_URL + '/V2UserImg/V2UserImg'+userProfileImg}></img> 
        </div>
        <div>
            <div className='user-profile' style={{display: "flex",width:"100%"}}>
                <h3 style={{fontSize:"1.17rem", marginRight:"4px"}}>{data.user.id}</h3> {/*사용자 이름*/}
                <h3 style={{fontSize:"0.8rem",display:"flex", alignItems:"center", color:"grey"}}>{data.user.department}</h3> {/*학부*/}
               
                {
                  myWitty === data.user.id
                  ?<div style={{
                    fontSize:"0.8rem",
                    textAlign:"center",
                    display:"inline-block",
                    marginLeft:"270px"
                    
                    }}>
                    <V2WittyDelete wittyDelteId={wittyDelteId}></V2WittyDelete>
                    <V2WittyModifyModal data={data}></V2WittyModifyModal>
                  </div>
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