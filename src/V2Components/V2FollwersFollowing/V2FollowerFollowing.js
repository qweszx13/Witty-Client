import React from 'react';
import { List, Avatar,Button,Row,Col, Divider } from 'antd';

function V2FollowerFollowing() {
  const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
  
  return (
    <div>
       <Row justify='space-around'>
         <Col span={8} ><Button style={{width:"100%"}}>팔로워</Button></Col>
         <Col span={8}><Button style={{width:"100%"}}>팔로잉</Button></Col>
        </Row>
        <Divider style={{marginBottom:"0px"}}/>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" size={64} style={{marginRight:"10px"}}/>}
            title={<div style={{position:"relative"}}><a href="https://ant.design">이름</a><Button style={{position:"absolute", right: "0px", top:"50%", transform:"translate(-50%,0)"}}>팔로우</Button></div>}
            description="자기소개 블라 블라 블라 블라 "
          />
        </List.Item>
    )}
  />
    </div>
  )
}

export default V2FollowerFollowing

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