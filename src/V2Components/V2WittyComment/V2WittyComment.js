import { useState } from "react";
import {commentContents,comments,commentModify,commentDelete} from "../../apis/comment"

function V2WittyComment(){
  const [commnetBox,setCommentBox] = useState([]);

  const getCommnet = async () => {
    try{
      const result =  await commentContents("아이디는?");
      setComment(result);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  const setComment= (contents)=>{
    if(contents.length === 0){
      return(setCommentBox(...commnetBox,()=>{return <div>더이상댓글이.. 엄서..</div>}))
    }else(
      setCommentBox(...commnetBox,contents.map(function(i){
        //컴포넌트만들기
  
      }))
    )
  }


  return
  <>

  </>
}

export default V2WittyComment