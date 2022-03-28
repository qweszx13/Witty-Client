import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { v4 as uuidv4 } from 'uuid';


function V2WittyContents(props){
  const tags = props.data.tags;
  

  return(
  <div style={{marginBottom:"10px"}}>
    <div id="wrap">
        <div id="container1">
            <div id="profileBox">
                {/* <img className="profileImg" src="img/a.png"></img> 프로필 사진*/}
            </div>
            <div className="name">{props.data.user.id}</div>
            <div className="major">{props.data.user.department}</div>
            <div className="date">{props.data.createdDateTime}</div>
            <div className="contents">{props.data.content}</div>
        </div>
        {/*
        <div id="wrapImg">
            <img src="img/main.png"></img> 이미지 업로드시 에만 사용
        </div>
        */}
        <div id="container2">
          {
            tags !== []
            ?tags.map(function(tag){
              return <div className="hashTag" key={uuidv4()}>{tag.name}</div>//키값 추가 요망
            })
            :null
          }
            <FontAwesomeIcon className="fa fa-commenting-o" icon={solid('comment-dots')} aria-hidden="true" />
            
        </div>
    </div>
  </div>
  )}
  
  export default V2WittyContents;