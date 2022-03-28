import { wittysContent } from "../../apis/wittys";
import V2WittyContents from "../V2WittyContents/V2WittyContents";
import V2WittyLoading from "../V2WittyLoading/V2WittyLoading";
import {useEffect, useRef, useState} from "react";

function V2WittyAddContents(props){
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState(0);
  

  useEffect(() => {
    setLoading(true);
    showContent(0);
    setLoading(false);
  }, []);


  const [content,setContent] = useState([]);//주요 컨텐츠
  const userContent = [];
  const [myContent,setMyContent] = useState([]);
  const copyMyContent = [];
  const [myKey,setMyKey] = useState([]);
  
  const showContent = async (nowPage) => {
    
    try{
      const result =  await wittysContent(nowPage);
      setPage(page+1);
      setMyKey(result.data.id);
      const copyResult = result.data;
      addContent(copyResult);
    }catch(e){
      console.log(e);
    }
    
  }

  const addContent = (data)=>{
        
    for(let i=0;i<data.length;i++){ 
      setMyKey(data[i].id);
      userContent.push(<V2WittyContents data = {data[i]} key={data[i].id}></V2WittyContents>)
      if(props.user.user_id===data[i].user.id){
        copyMyContent.push(<V2WittyContents data = {data[i]} key={data[i].id}></V2WittyContents>)
      }
      
    }
    userContent.push(<div key={data}></div>)//옵저버
    setContent(userContent,[...content])
    setMyContent(copyMyContent,[...myContent])
    
  }

  const target = useRef();

  const observerOption = {
    root: null, //"뷰포인트로"
    rootMargin: "0px",//마진설정 0
    threshold: 1.0//다보여야 true
  }
  
  const observer = new IntersectionObserver(([{ isIntersecting }])=>{
    if(isIntersecting) setPage(page=>page+1)
  },observerOption)
  
  //observer.observe(target.current); 감시대상 나중에 수정요망
  
  if(props.contentKey===1){
    return(
      <>
      {content}
      {loading?<V2WittyLoading/>:null}
      </>
    )
  }else{
    return(
      <>
      {myContent}
      {loading?<V2WittyLoading/>:null}
      </>
    )
  }
  
}

export default V2WittyAddContents;