import {commentDelete} from "../../apis/comment"
import React, { createElement, useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar, message } from 'antd';
import Moment from 'react-moment';
import V2WittyCommentModify from "../V2WittyCommentModify/V2WittyCommentModify";
import 'moment-timezone';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

function V2WittyCommnetAdd({data,deleteSwitch,setDeleteSwitch}){
  const newData = data;
  const imgUrl = data.user.profileImgUrl;

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

  async function cmDelete(wittyDelteId){
    try{
      const result = await commentDelete(wittyDelteId);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

 
  const [likeYN, setlikeYN] = useState(false); // 좋아요 여부 (좋아요 버튼 바뀜)
  const [commentLike,setCommentLike] = useState(0);

  // 좋아요 누르면 동작하는 함수 API 요청해서 변화 필요
  const like = () => {
    if(likeYN) {
      //좋아요 취소
        setCommentLike(commentLike-1);
        setlikeYN(false);
    }else{
      //좋아요
        setCommentLike(commentLike+1);
        setlikeYN(true);
    }
  };
  

  const fDelete =()=>{
    cmDelete(data.id);
    message.success("삭제완료");
  }
  
  const actions = [
    <Tooltip key="comment-basic-like" title="좋아요">
      <span onClick={like}>
        {createElement(likeYN ? LikeFilled : LikeOutlined)}
        <span className="comment-action" style={{paddingLeft: "3px"}}>{commentLike}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to2" onClick={()=>{fDelete()}}>삭제</span>,
    <span><V2WittyCommentModify newData={newData}></V2WittyCommentModify></span>
  ];

  return (
      <Comment
      actions={actions}
      author={<a style={{fontSize:"1rem", fontWeight:"bold"}}>{data.user.id} <span style={{fontSize:"0.25rem"}}>{data.user.department}</span></a>}
      avatar={<Avatar src={process.env.PUBLIC_URL + '/V2UserImg/V2UserImg'+imgUrl} alt="Han Solo" />}
      content={
        <p style={{fontSize:"0.8rem"}}>
          {data.content}
        </p>
      }
      datetime={
        <Tooltip title="작성시간 기준입니다.">
          <span>{displayCreatedAt(data.createdDateTime)}</span>
        </Tooltip>
      }
    />
  )
}

export default V2WittyCommnetAdd;