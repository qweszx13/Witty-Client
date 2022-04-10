import React,{useState} from 'react';
import { List, Avatar,Button,Row, Divider, Typography,Collapse  } from 'antd';
import { DownOutlined,UpOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

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
  const [followerVisible, setfollowerVisible] = useState(false);

  const onFollowerVisibleHanlder = () => {
    setfollowerVisible(!followerVisible);
  }

  // 이따 지울거 
  function callback(key) {
  console.log(key);
}

  return (
    <div>
       <Row style={{backgroundColor:"#126889"}}>
        <Title level={5} style={{color:"white"}}>팔로워</Title>
       </Row>
       <Row style={{backgroundColor:"#126889"}}>
          <Title level={5} style={{paddingLeft:"15px", color:"white"}}>10명</Title>
        </Row>
        <Collapse defaultActiveKey={['1']} onChange={callback} style={{border:"none", backgroundColor:"#126889"}} 
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
          <Panel style={{backgroundColor:"#126889"}}>
            <List
          itemLayout="horizontal"
          dataSource={data}
          style={{ backgroundColor:"#126889"}}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" size={64} style={{marginRight:"10px"}}/>}
                title={<div style={{position:"relative"}}><a href="https://ant.design" style={{color:"white"}}>이름</a><Button style={{position:"absolute", right: "0px", top:"50%", transform:"translate(-50%,0)"}}>팔로우</Button></div>}
                description={<div style={{color:"white"}}>뭘봐이자식아</div>}
              />
            </List.Item>)}/>    
          </Panel>
        </Collapse>
        {/* 여기가 팔로잉 */}
        <Row>
        <Title level={5}>팔로잉</Title>
       </Row>
       <Row>
          <Title level={5} style={{paddingLeft:"15px"}}>10명</Title>
        </Row>
        <Collapse defaultActiveKey={['1']} onChange={callback} style={{border:"none"}} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
          <Panel>
            <List
          itemLayout="horizontal"
          dataSource={data}
          style={{transition:"all 2s"}}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" size={64} style={{marginRight:"10px"}}/>}
                title={<div style={{position:"relative"}}><a href="https://ant.design">이름</a><Button style={{position:"absolute", right: "0px", top:"50%", transform:"translate(-50%,0)"}}>팔로우</Button></div>}
                description="자기소개 블라 블라 블라 블라 "
              />
            </List.Item>)}/>    
          </Panel>
        </Collapse>
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