import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Form, Input, Badge, Image, Drawer, Button } from 'antd';

import { v4 as uuidv4 } from 'uuid';
import {like,unlike} from "../../apis/users";
import { LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import WittyHeaderComponent from './WittyHeaderComponent'
import './WittyComponent.css';
import WittyComment from '../../WittyComment/WittyComment';

const {TextArea} = Input;

// 댓글 입력 폼
const Editor = ({ onChange, onSubmit, loading, commentInput }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={commentInput} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={loading} onClick={onSubmit} type="primary">
        댓글
      </Button>
    </Form.Item>
  </>
);

function WittyComponent({data,myWitty}) {
  const wittyId = data.id;
  const[commentVisible, setCommentVisible] = useState(false);
  const[commentInput, setCommentInput] = useState('');
  const[loading, setLoading] = useState(false);

  // 댓글 보이게 해주는 함수
  const showDrawer = () => {
      setCommentVisible(true);
  }

  // 댓글 끄는 함수
  const onClose = () => {
      setCommentVisible(false);
  }

  // 댓글 폼 값 찾아오는거
  const onChange = (e) => {
    setCommentInput(e.target.value);
  }  
  
  // 댓글 제출
  const onSubmit = () => {
    if(commentInput === '') return;

    setLoading(true);

    setTimeout(() => {
      // 여기서 댓글 생성 API 호출 해야함 setTimeout은 걍 로딩중인거 표시한거임  
      setLoading(false);
      setCommentInput('');
    }, 1000);
  }

  const tags = data.tags;

  useEffect(()=>{
    if(data.likeStatus===0){
      setLikeStatus(true)
    }else{
      setLikeStatus(false)
    }
  },[])

  const [likeNum,setLikeNum] = useState(data.likes);//좋아요 조회  최적화 요망
  const [likeStatus,setLikeStatus] = useState(true);
  
  const userLike = async () => {
    try{
      const result =  await like(data.id);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  const userUnLike = async () => {
    try{
      const result =  await unlike(data.id);
    }catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  }
  
  function userLikeStatus(){
    setLikeStatus(!likeStatus);
    if(likeStatus===true){
      setLikeNum(likeNum+1)//좋아요 
      userLike();
    }else{
      setLikeNum(likeNum-1)//안좋아요
      userUnLike();
    }
  }
  function likeSet(){
    setLikeStatus(false)
    userLikeStatus()
  }

  return (
      <div style={{width:"100%", border:"1px solid black", borderRadius:"10px", boxShadow:"0.2px 0.2px 0.3px 0.3px grey", marginBottom:"25px"}}>
          {/* 헤더 */}
          <WittyHeaderComponent data={data} myWitty={myWitty} />
          {/* 썸네일 */}
          <Image width={"100%"} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{marginBottom:"10px"}}/>
          {/* 내용 */}
          <div style={{padding: "10px", marginBottom:"16px"}}>
              {data.content}
          </div>
          <div style={{paddingLeft: "10px",paddingBottom:"10px"}}>
            {
              tags !== []
              ?tags.map(function(tag){
                return <div className="hashTag" key={uuidv4()}>#{tag.name}</div>
              })
              :null
            }
          </div>
          {/*댓글 갯수 및 좋아요 수*/}
          <div>
            <Badge count={likeNum}>
                <LikeTwoTone className='button' style={{fontSize:"1.25rem"}} onClick={()=>{
                  data.likeStatus >= 1
                  ?likeSet()
                  :userLikeStatus()
                  }
                }/> 
            </Badge>  
            <Badge count={10}>
                <MessageTwoTone className='button' style={{fontSize:"1.25rem"}} onClick={showDrawer}/>
            </Badge>
          </div> 
          {/*댓글창*/}
          <Drawer height={650}  title="댓글입니더" placement="bottom" onClose={onClose} visible={commentVisible} style={{display:"flex", justifyContent:"center"}}>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={onChange}
                        onSubmit={onSubmit}
                        loading={loading}
                        commentInput={commentInput} />
          }
        />
            <WittyComment wittyId={wittyId}/>
          </Drawer>
      </div>
  )
}

export default WittyComponent