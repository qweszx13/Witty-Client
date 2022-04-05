import { useState,useRef} from "react";
import Modal from "antd/lib/modal/Modal";
import { Input,message } from "antd";
import { wittysModify } from "../../apis/wittys";


function V2WittyModifyModal({data}){
  const { TextArea } = Input;
  const userWitty = useRef();
  const userTag = useRef();
  let placeHolderTag = [];
  data.tags.map((i)=>{
    placeHolderTag.push("#"+i.name+" ");
  })

  const wittyModify = async()=>{
    let tag = userTag.current.resizableTextArea.props.value.replace(/ /gi,'');//공백제거 정규식
    tag = tag.split("#"); //#에따른 배열 분할
    tag.shift(); //#앞 공백 혹은 잘못입력된값 삭제 
    

    const witty = userWitty.current.resizableTextArea.props.value;

    try{
      const result = await wittysModify(data.id,witty,tag)
      
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
    wittyModify();
    setIsModalVisible(false);
    message.success('수정완료');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a  onClick={showModal} style={{color:"black", margin:"0px 10px"}} >수정</a>
      <Modal title="위티 수정" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText={"작성 취소"} okText={"위티 수정 완료"}>
      <TextArea
          showCount maxLength={200}
          placeholder={data.content}
          autoSize={{ minRows: 3, maxRows: 5 }}
          ref={userWitty}
        />
        <TextArea 
        showCount maxLength={30} 
        autoSize={{ minRows: 1, maxRows: 1 }} 
        placeholder={placeHolderTag}
        ref={userTag}
        />
      </Modal>
    </>
  );
};

export default V2WittyModifyModal;