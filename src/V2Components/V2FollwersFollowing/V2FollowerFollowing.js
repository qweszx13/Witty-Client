/*
import { useEffect, useState } from "react";
import { followers } from "../../apis/users/followers";
import { following } from "../../apis/users/following";

function V2FollowerFollowing(props){

  const [userFollowers, setUserFollowers] = useState({
    id:'',
    email:'',
    department:'',
    profileImgUrl:'',
    followState:0
  });
  
  const [userFollowing, setUserFollowing] = useState({
    id:'',
    email:'',
    department:'',
    profileImgUrl:'',
    followState:0
  })
  
  useEffect(()=>{
    fechedFollowers(props.user.user_id);
    fechedFollowing(props.user.user_id);
  },[])
  
  const fechedFollowers = async (userId) => {
    try{
      const result =  await followers(userId);
      const fatchedFollower =  result.data;
      setUserFollowers({
        id:fatchedFollower.id,
        email:fatchedFollower.email,
        department:fatchedFollower.department,
        profileImgUrl:fatchedFollower.profileImgUrl,
        followState:fatchedFollower.followState
      });
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  const fechedFollowing = async (userId) => {
    try{
      const result =  await following(userId);
      const fatchedFollowing =  result.data;
      setUserFollowing({
        id:fatchedFollowing.id,
        email:fatchedFollowing.email,
        department:fatchedFollowing.department,
        profileImgUrl:fatchedFollowing.profileImgUrl,
        followState:fatchedFollowing.followState
      });
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  return
  <>
  {console.log(userFollowers)}
  {console.log(userFollowing)}
  </>
}

export default V2FollowerFollowing

*/