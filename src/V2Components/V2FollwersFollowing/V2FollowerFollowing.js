import React, { useState } from 'react';
import { List, Avatar,Button,Row,Col, Divider } from 'antd';
import { useEffect} from "react";
import { followers, following } from '../../apis/users';




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