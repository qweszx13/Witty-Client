import "./style.css";
import {useEffect, useState} from "react";
import { auth } from "../../apis/users";

import { useNavigate } from 'react-router-dom';
import V2WittyNotification from "../../V2Components/V2WittyNotification/V2WittyNotification";
import V2WittyProfile from "../../V2Components/V2WittyProfile/V2WittyProfile";
import V2WittyAddContents from "../../V2Components/V2WittyAddContents/V2WittyAddContents";
import V2WittyMenuBar from "../../V2Components/V2WittyMenuBar/V2WittyMenuBar"
import V2SearchBar from "../../V2Components/V2WittySearchBar/V2SearchBar";
import V2FollowerFollowing from "../../V2Components/V2FollwersFollowing/V2FollowerFollowing";
import V2WittyAddSearchContents from "../../V2Components/V2WittyAddSearchContents/V2WittyAddSearchContents";

function V2WittyPage(){
  const [userSearch,setUserSearch] = useState("");
  const [profileFlag,setProfileFlag] = useState(false);
  
  const navigate = useNavigate();
  const contentKey = 1;//로딩시 페이지 설정
  const [user, setUser] = useState({
      user_id: '',
      user_email: '',
      user_department: '',
      profile_imageUrl: '',
      introduction: ''
  });
  
  const fetchUser = async () => {
    try{
      const res = await auth();
      const fetchedUser = res.data.user;
         setUser({
             user_id: fetchedUser.user_id,
             user_email: fetchedUser.user_email,
             user_department: fetchedUser.user_department,
             profile_imageUrl: fetchedUser.profile_imageUrl,
             introduction: fetchedUser.introduction
         });
    }catch{
      alert('로그인이 필요한 서비스 입니다!');
        navigate('/');
    }  
  }

  const [selectMenu,setSelectMenu] = useState(1);
  const [contentBox,setContentBox] = useState(null);
  const getMenuNum = (num)=>{
    setSelectMenu(num);
  }
  
  useEffect(()=>{
    fetchUser();
    console.log(user);
    setContentBox(initContent(1));//페이지 기본값 
  },[profileFlag]);

  useEffect(()=>{
    console.log(selectMenu);
    setContentBox(initContent(selectMenu));
  },[selectMenu],[userSearch]);

  const initContent = (num)=>{
    if(num===1){
      return <V2WittyAddContents user={user} contentKey={contentKey}/>//전체 위티 조회
    }else if(num===2){
      return <V2WittyProfile user={user} profileFlag={profileFlag} setProfileFlag={setProfileFlag}/>//프로필 및 유저 작성 위티 부분
    }else if(num===3){
      return <V2FollowerFollowing user={user}/>
    }else if(num===4){
      return <V2WittyNotification/>//공지사항
    }else{
      return <V2WittyAddSearchContents user={user} contentKey={contentKey} userSearch={userSearch}/>//태그 조회
    }
    
  }

  const searching = (num)=>{
    setUserSearch(num);
    setSelectMenu(5);
  }

  return(
    <div id="V2Main-Layout" >
      <div id="V2Main-Container">
        <V2SearchBar searching={searching}/>
        <V2WittyMenuBar getMenuNum={getMenuNum}/>
        <div id="V2Witty-Container">
            <div id="V2Witty-Content">
                {contentBox}
            </div>
        </div>
      </div>
    </div >
)}

export default V2WittyPage;