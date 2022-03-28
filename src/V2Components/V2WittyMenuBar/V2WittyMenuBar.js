import { useEffect, useState } from "react";
import "./style.css";



function V2WittyMenuBar(props){

  return(
    <div id ="menuBar_Layout">
      <div id="menuBar">
          <button><img src={require("../../assets/images/img/home.png")} onClick={()=>{props.getMenuNum(1)}}></img></button>
          <button><img src={require("../../assets/images/img/user.png")} onClick={()=>{props.getMenuNum(2)}}></img></button>
          <button><img src={require("../../assets/images/img/users.png")} onClick={()=>{props.getMenuNum(3)}}></img></button>
          <button><img src={require("../../assets/images/img/notification.png")} onClick={()=>{props.getMenuNum(4)}}></img></button>
      </div>
    </div>
  )
}

export default V2WittyMenuBar;