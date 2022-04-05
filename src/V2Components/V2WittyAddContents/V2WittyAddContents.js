import { wittysContent } from "../../apis/wittys";
import V2WittyContents from "../V2WittyContents/V2WittyContents";
import V2WittyLoading from "../V2WittyLoading/V2WittyLoading";
import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function V2WittyAddContents(props){
  const [loading,setLoading] = useState(false);
  let page = 0;
  const myWitty = props.user.user_id;
  const [target,setTarget] = useState("");
  const [observerBreak,setobserverBreak] = useState(false);
  
  
  useEffect(()=>{
    showContent(page);
    return () => setLoading(false);
  },[])

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      setLoading(true);
      showContent(page);
      page++;
      setTimeout(()=>{
        observer.observe(entry.target)
        setLoading(false);
      },2000);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);


  const [content,setContent] = useState([]);//주요 컨텐츠
  const userContent = [];
  const [myContent,setMyContent] = useState([]);//나의 컨텐츠
  const copyMyContent = [];
  
  const showContent = async (nowPage) => {
    try{
      const result =  await wittysContent(nowPage);
      const copyResult = result.data;
      if(copyResult.length===0){
        setobserverBreak(true);
      }
      addContent(copyResult)
    }catch(e){
      console.log(e);
    }
    
  }

  const addContent = (data)=>{
    if(data.length === 0){
      userContent.push(
        <div key={uuidv4()}>
          <h1>위티가 존재하지않아요!</h1>
        </div>
      )
      copyMyContent.push(
        <div key={uuidv4()}>
          <h1>위티가 존재하지않아요!</h1>
        </div>
      )
      setContent(userContent,[...content])
      setMyContent(copyMyContent,[...myContent])
    }else{
      for(let i=0;i<data.length;i++){ 
        userContent.push(<V2WittyContents data = {data[i]} key={data[i].id}></V2WittyContents>)
        if(myWitty===data[i].user.id){
          copyMyContent.push(<V2WittyContents data = {data[i]} myWitty = {myWitty} key={data[i].id}></V2WittyContents>)
        }
      }
      setContent(userContent,[...content])
      setMyContent(copyMyContent,[...myContent])
    }
  }

  function setObserver(){
    return(
      <div style={{height:"20px"}} key={props.data} ref={setTarget}>
        {/*옵저버 필요하면 P태그로 보세용*/}
      </div>
    )
  }

  if(props.contentKey===1){
    return(
      <div style={{width:"100%", alignItems: "center", margin:"0 auto",justifyContent: "center"}}>
        <div>
          {content}
        </div>
        {observerBreak === false?setObserver():null}
        <div style={{position:"absolute",left:"48%"}}>
          {loading?<V2WittyLoading/>:null}
        </div>
      </div>    
    )
  }else{
    return(
      <div style={{width:"100%", alignItems: "center", margin:"0 auto",justifyContent: "center"}}>
        <div>
          {myContent}
        </div>
        {observerBreak === false?setObserver():null}
        <div style={{position:"absolute",left:"48%"}}>
          {loading?<V2WittyLoading/>:null}
        </div>
      </div>    
    )
  }
  
}

export default V2WittyAddContents;