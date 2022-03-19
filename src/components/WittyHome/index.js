import "./style.css";
import { wittysContent,wittysDelete } from "../../apis/wittys";
import { useEffect,useState } from "react";
import { WittyModify } from "../WittysModify/index";


function WittyHome(props) {
  const [page,setPage] = useState(1);
  const [content,setContent] = useState([]);//주요 컨텐츠
  const copyContent = [];//컨텐츠 담을 바구니
  const num = new Object;// 반복문 돌릴떄 컨텐트 박스 

  const wittyContentDelete = async (wittyId) =>{
    try{
      const result = await wittysDelete(wittyId);
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }

  const wittyContent = async (page) => {
    try{
      setPage(page+1);
      const contentBox =  await wittysContent(page);
      AddContent(contentBox);
      setContent([copyContent,...content]);
    }catch(e){
      alert("위티가 빔");
    }
  }

  useEffect(()=>{
    wittyContent(0);
  },[])

  function AddContent(num){//3페이지씩 증가 
    for(let i=2;i>-1;i--){
      if(num.data[i].user.id!==props.user.user_id){
        copyContent.push(
          <div key={num.data[i].id}>
            <div className="content_box">
              <p>{num.data[i].content}</p>
            </div>
          </div>
        ) 
      }else{
        const wittyId = num.data[i].id;
        let isModifyVisible = true;
        copyContent.push(
          <div key={num.data[i].id}>
            <div className="content_box">
              <p>{num.data[i].content}</p>{
                isModifyVisible === true
                ?<WittyModify wittyId={wittyId}/>
                :null
              }
              <button onClick={()=>{ isModifyVisible=!isModifyVisible; console.log(isModifyVisible)}}>수정</button>
              <button onClick={()=>{ wittyContentDelete(wittyId)}}>삭제</button>
            </div>
          </div> 
      )}}
  }
  return (
    <div className="home_box">
      <div style={{ padding: "0px 20px 0px 20px" }}>
        <button onClick={()=>{
          wittyContent(page);
        }}>추가 글보기</button>     
        {content}       
      </div>
    </div>
  );
}

export default WittyHome;
