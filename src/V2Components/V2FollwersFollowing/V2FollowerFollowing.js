import React, { useState } from 'react';
import { List, Avatar,Button,Row,Col, Divider, message } from 'antd';
import { useEffect} from "react";
import { followers, following, followerDelete } from '../../apis/users';


function V2FollowerFollowing(props) {
  const[flagfollow,setFlagFollow] = useState(true);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [render,setRender] = useState(false);

  useEffect(()=>{
    fechedFollowers(props.user.user_id);
    fechedFollowing(props.user.user_id);
  },[render])
  
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

  const deleteFollower = async (toUserId)=>{
    console.log(toUserId);
    try{
      const result =  await followerDelete(toUserId);
      message.success("팔로우 해제 완료");
      setRender(!render);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }

  return (
      <>
       <Row justify='space-around' style={{paddingTop:"18px"}}>
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
              avatar={<img src={process.env.PUBLIC_URL + '/v2/users/image/'+item.profileImgUrl} />}
              title={<div style={{position:"relative"}}><a href="https://ant.design">{item.id}</a>
                {
                  props.user.user_id === item.id
                  ?null
                  :item.followState === 1
                    ?<Button style={{position:"absolute", right: "0px", top:"10px"}} onClick={
                      ()=>{deleteFollower(item.id)}}>팔로우</Button>
                    :<Button style={{position:"absolute", right: "0px", top:"10px"}}>팔로우취소</Button>
                }
                </div>}
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
              avatar={<img src={process.env.PUBLIC_URL + '/v2/users/image/'+item.profileImgUrl} />}
              title={<div style={{position:"relative"}}><a href="https://ant.design">{item.id}</a>
              {
                  props.user.user_id === item.id
                  ?null
                  :<Button style={{position:"absolute", right: "0px", top:"10px"}} onClick={
                  ()=>{deleteFollower(item.id)}}>팔로우취소</Button>
              }
              </div>}
              description={item.department}
            />
          </List.Item>
          )}
        />
      }
      </>
  )
}

export default V2FollowerFollowing