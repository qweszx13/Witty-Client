import {commentContents,comments,commentModify,commentDelete} from "../../apis/comment"
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, message } from 'antd';
import V2WittyCommnetAdd from "../V2WittyCommnetAdd/V2WittyCommentAdd";
import { v4 as uuidv4 } from 'uuid';


// 상태줘서 사용 할 것
function WittyComment({newData,commentSwitch}){
  const [comment,setComment] = useState([]);
  const [deleteSwitch,setDeleteSwitch] = useState(false);
  const [page,setPage] = useState(0);
  const userCommentBox = [];
  const [nomoreComment,setNomoreComment] = useState(false);
  const refresh = 3;// 리프레시 키 

  
  
  useEffect(()=>{
    setPage(0);
    setNomoreComment(false);
    getCommnet(0,refresh);
    console.log(commentSwitch);
  },[commentSwitch])

  const onMoreClick = (page)=>{
    page++;
    setPage(page);
    getCommnet(page,0);
  };

  const getCommnet = async (page,refresh) => {
    try{
      const result =  await commentContents(newData.id,page);
      setCommentBox(result,refresh);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const setCommentBox = (result,refresh)=>{
    const arrayData = result.data;
    if(arrayData.length === 0){
      userCommentBox.push(
          <p key={uuidv4()} style={{textAlign:"center",width:"100%"}}>      NO More Comment</p>
      )
      if(refresh === 3){
        setComment(userCommentBox,[...comment])
        setNomoreComment(false);
      }else{
        setComment([...comment,userCommentBox])
        setNomoreComment(true);
      }
    }else{
      arrayData.map((data)=>{
        userCommentBox.push(
            <V2WittyCommnetAdd data={data} deleteSwitch={deleteSwitch} setDeleteSwitch={setDeleteSwitch} key={data.id} />
        )
      })
      refresh === 3
      ?setComment(userCommentBox,[...comment])
      :setComment([...comment,userCommentBox])
    }
    console.log(comment.length);
  }

  return(
    <>
      {comment}
      {
      nomoreComment === false
      ?<Button type="link" block onClick={()=>{
        console.log(comment);
        onMoreClick(page);
      }}>get more</Button>
      :null
      }
    </>
  )
};
//
export default WittyComment;