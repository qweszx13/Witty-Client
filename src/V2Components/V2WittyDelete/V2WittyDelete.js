import React, { useCallback, useState } from 'react';
import 'antd/dist/antd.css';
import { Popconfirm, message } from 'antd';
import { wittysDelete } from '../../apis/wittys';

function V2WittyDelete(props){  
   

  async function confirm(wittyDelteId){
    try{
      const result = await wittysDelete(wittyDelteId);
      message.success('삭제완료');
    }catch({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  }
  
  function cancel() {
    message.error('삭제취소');
  }

  return(
    <>
      <Popconfirm
      title="삭제하신 위티는 돌아오지않아요 삭제하시겠어요?"
      onConfirm={()=>{confirm(props.wittyDelteId)}}
      onCancel={cancel}
      okText="삭제"
      cancelText="취소"
      >
      <a style={{color:"black"}}href="#">삭제</a>
      </Popconfirm>
    </>
  )
}

export default V2WittyDelete