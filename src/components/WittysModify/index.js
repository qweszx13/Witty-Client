import { useState,createRef } from 'react';
import {wittysModify} from '../../apis/wittys';


export function WittyModify(props){
  const [newContent,setNewContent] = useState("");
  const userContent = createRef();
  
  const [newTag,setNewTag] = useState("");
  
  const modify = async ()=>{
    setNewTag(newTag.replace(/ /gi,'')); //공백제거 정규식
      const tag = newTag.split("#"); //#에따른 배열 분할
      tag.shift(); //#앞 공백 혹은 잘못입력된값 삭제 
      setNewContent(userContent.current.value);
    try{
      const result = await wittysModify(props.wittyId,newContent,tag);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

  return(
    <div id="modify_visible" style={{backGroundColor:"gray", width:"100%"}} >
      <input placeholder="위티 수정" style={{color:"black"}} ref={userContent} type="text"></input>
      <input placeholder="위티 태그" style={{color:"black"}} type="text" onChange={(e)=>{setNewTag(e.target.value)}}></input>
      <button onClick={modify}>수정하기</button>
    </div>
  )
  

}

