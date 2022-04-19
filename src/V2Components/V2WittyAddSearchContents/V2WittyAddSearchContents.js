import { wittysSearchContent } from "../../apis/wittys";
import WittyComponent from "../V2WittyContents/WittyComponent";
import V2WittyLoading from "../V2WittyLoading/V2WittyLoading";
import {useEffect, useState} from "react";
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

function V2WittyAddSearchContents(props){
  const userSearchTag = props.userSearch;
  const searchContent = 1;// 검색한경우 팔로우 버튼 추가를 위함
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
  
  const showContent = async (nowPage) => {
    try{
      const result =  await wittysSearchContent(nowPage,userSearchTag);
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
           <Result
              icon={<SmileOutlined style={{color:"#6AAFE6"}}/>}
              title="검색하신 태그 검색결과 찾은게 없어요!"
           />
        </div>
      )
      setContent(userContent,[...content])
    }else{
      for(let i=0;i<data.length;i++){ 
        userContent.push(<WittyComponent data = {data[i]} searchContent={searchContent} key={data[i].id}></WittyComponent>)
      }
      setContent(userContent,[...content])
    }
  }

  function setObserver(){
    return(
      <div style={{height:"20px"}} key={props.data} ref={setTarget}>
        {/*옵저버 필요하면 P태그로 보세용*/}
      </div>
    )
  }

  
  return(
    <div style={{width:"100%", maxWidth:"512px",margin:"0 auto",padding:"24px 0px"}}>
      <div>
        {content}
      </div>
      {observerBreak === false?setObserver():null}
      <div style={{position:"absolute",left:"48%"}}>
        {loading?<V2WittyLoading/>:null}
      </div>
    </div>    
  )
}


export default V2WittyAddSearchContents;