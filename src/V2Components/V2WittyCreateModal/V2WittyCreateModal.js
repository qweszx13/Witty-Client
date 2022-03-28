import styles from "./style.module.css"
import { useState,useRef } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button,Input } from "antd";
import { wittys } from "../../apis/wittys";
import { render } from "@testing-library/react";


const V2WittyCreateModal = () => {
  const { TextArea } = Input;
  const userWitty = useRef();
  const userTag = useRef();


  const wittySend = async()=>{
    let tag = userTag.current.resizableTextArea.props.value.replace(/ /gi,'');//공백제거 정규식
    tag = tag.split("#"); //#에따른 배열 분할
    tag.shift(); //#앞 공백 혹은 잘못입력된값 삭제 
    

    const witty = userWitty.current.resizableTextArea.props.value;

    try{
      const result = await wittys(witty,tag)
      
    }catch ({
      response:{ 
        data:{ result }
    },
    }) {
      alert(result);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
    setIsModalVisible(true);
    };
  

  const handleOk = () => {
    wittySend();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={styles.bt_Modal}>
        새 위티 쓰기
      </Button>
      <Modal title="새 위티 쓰기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText={"작성 취소"} okText={"위티 작성"}>
      <TextArea
          showCount maxLength={200}
          placeholder="위티를 작성해주세요"
          autoSize={{ minRows: 3, maxRows: 5 }}
          ref={userWitty}
        />
        <TextArea 
        showCount maxLength={30} 
        autoSize={{ minRows: 1, maxRows: 1 }} 
        placeholder="원하는 태그를 입력해주세요[ ex)#태그 #태그2 ]"
        ref={userTag}
        />
      </Modal>
    </>
  );
};

export default V2WittyCreateModal;
