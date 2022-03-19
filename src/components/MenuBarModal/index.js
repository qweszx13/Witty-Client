import { useState,createRef } from "react";
import React from "react";
import { wittys } from "../../apis/wittys";


function MenuBarModal(user){
  const [num,setNum] = useState("");
  const userWittys = createRef();

  const wittySend = async()=>{
    setNum(num.replace(/ /gi,'')); //공백제거 정규식
    const tag = num.split("#"); //#에따른 배열 분할
    tag.shift(); //#앞 공백 혹은 잘못입력된값 삭제 
    try{
      const result = await wittys(userWittys.current.value,tag)
      
    }catch ({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  };
  return (
    <div id="wittyModalDiv" style={{ 
          backGroundColor:"white",
          width:"30%",
          height:"40%"
          }}>
    <p>모달창인데요 그렇습니다.</p>
    <p>{user.user_id}님의 {user.user_department}과이십니다.</p>
    <input placeholder="여기다가 이제 위티하겠죠?" style={{color:"black"}} ref={userWittys} type="text"></input>
    <input placeholder="태그 넣겠죠?" style={{color:"black"}} 
    onChange={(e)=>{
      setNum(e.target.value);
      }}></input>
    <button onClick={wittySend} 
    >전송 버튼</button>

          

  </div>
  )
}

export default MenuBarModal;