import {commentDelete,commentLike,commentUnlike} from "../../apis/comment"
import React, { createElement, useEffect, useState } from 'react';
import {Comment, Tooltip , message, Image} from 'antd';
import Moment from 'react-moment';
import V2WittyCommentModify from "../V2WittyCommentModify/V2WittyCommentModify";
import 'moment-timezone';
import { auth } from "../../apis/users";
import { LikeOutlined, LikeFilled } from '@ant-design/icons';


function V2WittyCommnetAdd({data,commentSwitch,setCommentSwitch,commentMyWitty}){
  const imgUrl = data.user.profileImgUrl;
  const myId = commentMyWitty;
  const likeSta = ()=>{
    if(data.likeStatus === 1){
      return true;
    }else{
      return false;
    }
  }

  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if(parseInt(startTime - nowTime) > -3600000){
      return <Moment format="M 분전">{nowTime-startTime}</Moment>;
    }
    if(parseInt(startTime - nowTime) > -86400000){
      return <Moment format="H 시간전">{nowTime-startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) <= -86400000) {
      return <Moment format="D 일전">{nowTime-startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  async function cmDelete(wittyDelteId){
    try{
      const result = await commentDelete(wittyDelteId);
      setCommentSwitch(!commentSwitch);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

  async function cmLike(commentId){
    try{
      const result = await commentLike(commentId);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

  async function cmUnlike(commentId){
    try{
      const result = await commentUnlike(commentId);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

  const [likeYN, setlikeYN] = useState(likeSta()); // 좋아요 여부 (좋아요 버튼 바뀜)
  const [userCommentLike,setUserCommentLike] = useState(data.likes);

  // 좋아요 누르면 동작하는 함수 API 요청해서 변화 필요
  const like = () => {
    if(likeYN) {
      //좋아요 취소
        cmUnlike(data.id);
        setUserCommentLike(userCommentLike-1);
        setlikeYN(false);
    }else{
      //좋아요
        cmLike(data.id);
        setUserCommentLike(userCommentLike+1);
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
        <span className="comment-action" style={{paddingLeft: "3px"}}>{userCommentLike}</span>
      </span>
    </Tooltip>,
      data.user.id === myId
      ? 
      <>
        <span key="comment-basic-reply-to2" onClick={()=>{fDelete()}}>삭제</span>,
        <span><V2WittyCommentModify data={data} commentSwitch={commentSwitch} setCommentSwitch={setCommentSwitch}></V2WittyCommentModify></span>
      </>
      :console.log(myId)
  ];

  return (
      <Comment
      actions={actions}
      author={<a style={{fontSize:"1rem", fontWeight:"bold"}}>{data.user.id} <span style={{fontSize:"0.25rem"}}>{data.user.department}</span></a>}
      avatar={<Image src={process.env.PUBLIC_URL + '/v2/users/image/'+imgUrl} alt="Han Solo" />}
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