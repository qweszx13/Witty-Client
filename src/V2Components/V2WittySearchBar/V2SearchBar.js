import "./style.css"
import V2WittyAddContents from "../V2WittyAddContents/V2WittyAddContents";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from "react";

function V2SearchBar({searching}){
  
  const [inputValue,setInputValue] = useState("");


  return(
    <div id="bar">
      <div id="bar_Layout">
        <div id="search">
          <input className="searchBar" type="text" placeholder="태그 검색" onChange={(e)=>{
            setInputValue(e.target.value);
          }} value={inputValue}></input>
          <FontAwesomeIcon className="fa" icon={solid('magnifying-glass')} aria-hidden="true" onClick={()=>{
            searching(inputValue);
            setInputValue("");
          }}/>
        </div>

      </div>
    </div>
  )}

  export default V2SearchBar;