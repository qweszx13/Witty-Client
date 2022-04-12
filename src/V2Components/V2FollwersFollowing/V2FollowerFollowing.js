<<<<<<< HEAD
import React, { useState } from 'react';
import { List, Avatar,Button,Row,Col, Divider } from 'antd';
import { useEffect} from "react";
import { followers, following } from '../../apis/users';
=======
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
>>>>>>> 725549febfc2478c3876a1ee094f15cf2e4a9019




function V2FollowerFollowing(props) {
  const[flagfollow,setFlagFollow] = useState(true);

  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([])
  
  useEffect(()=>{
    fechedFollowers(props.user.user_id);
    fechedFollowing(props.user.user_id);
  },[])
  
  const fechedFollowers = async (userId) => {
    try{
      const result =  await followers(userId);
      setUserFollowers(result.data);
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
      setUserFollowing(result.data);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  
const data2 = [
  {
    title: 'Ant Design Title 팔로잉',
  },
  {
    title: 'Ant Design Title 팔로잉',
  },
  {
    title: 'Ant Design Title 팔로잉',
  },
  {
    title: 'Ant Design Title 팔로잉',
  },
];

  return (
    <div>
       <Row justify='space-around'>
         <Col span={8} ><Button style={{width:"100%"}} onClick={()=>{setFlagFollow(true)}}>팔로워</Button></Col>
         <Col span={8}><Button style={{width:"100%"}} onClick={()=>{setFlagFollow(false)}}>팔로잉</Button></Col>
        </Row>
        <Divider />
        {flagfollow===true
        ?
        <List
        itemLayout="horizontal"
        dataSource={userFollowers}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.profileImgUrl} />}
              title={<div style={{position:"relative"}}><a href="https://ant.design">{item.id}</a><Button style={{position:"absolute", right: "0px", top:"0px"}}>
                {
                item.followState === 1
                ?"팔로우"
                :"팔로우취소"
                }
                </Button></div>}
              description={item.department}
            />
          </List.Item>
          )}
        />
        :
        <List
        itemLayout="horizontal"
        dataSource={userFollowing}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.profileImgUrl} />}
              title={<div style={{position:"relative"}}><a href="https://ant.design">{item.id}</a><Button style={{position:"absolute", right: "0px", top:"0px"}}>
                {
                item.followState === 1
                ?"팔로우취소"
                :"팔로우"
                }
                </Button></div>}
              description={item.department}
            />
          </List.Item>
          )}
        />
      }
      
    </div>
  )
}

export default V2FollowerFollowing

/*

function V2FollowerFollowing(props){

  
  return
  <>
  {console.log(userFollowers)}
  {console.log(userFollowing)}
  </>
}

export default V2FollowerFollowing

*/