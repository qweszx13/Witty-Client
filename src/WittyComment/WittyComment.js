import {commentContents,comments,commentModify,commentDelete} from "../apis/comment"
import React, { createElement, useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

// 상태줘서 사용 할 것
function WittyComment(wittyId){

  const [commentBox,setCommentBox] = useState([]);
  console.log(wittyId);
  
  useEffect(()=>{
    getCommnet();
  },[])
 
  const getCommnet = async () => {
    try{
      const result =  await commentContents(wittyId.wittyId);
      setCommentBox(result,[...commentBox]);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const [likeYN, setlikeYN] = useState(false); // 좋아요 여부 (좋아요 버튼 바뀜)

  // 좋아요 누르면 동작하는 함수 API 요청해서 변화 필요
  const like = () => {
    if(likeYN) {
        setlikeYN(false);
    }else{
        setlikeYN(true);
    }
  };


  const actions = [
    <Tooltip key="comment-basic-like" title="좋아요">
      <span onClick={like}>
        {createElement(likeYN ? LikeFilled : LikeOutlined)}
        <span className="comment-action" style={{paddingLeft: "3px"}}>100</span>
      </span>
    </Tooltip>
  ];

  if(commentBox.length !== 0){
    return ()=>{
      commentBox.map((i)=>{
        <Comment
        actions={actions}
        author={<a style={{fontSize:"1rem", fontWeight:"bold"}}>{commentBox[i].data.user.id} <span style={{fontSize:"0.25rem"}}>{commentBox[i].data.user.department}</span></a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <p>
            {commentBox[i].data.content}
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().commentBox[i].data.createdDateTime}</span>
          </Tooltip>
        }
      />
      })
    }

  }else return <></>
  
  
};

export default WittyComment;