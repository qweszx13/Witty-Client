import { useState,useRef} from "react";
import Modal from "antd/lib/modal/Modal";
import { Input,message } from "antd";
import { commentModify } from "../../apis/comment";


function V2WittyCommentModify({newData}){
  const { TextArea } = Input;
  const userComment = useRef();

  const newCommentModify = async()=>{
    const newUserComment = userComment.current.resizableTextArea.props.value;

    try{
      const result = await commentModify(newData.id,newUserComment)     
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
    newCommentModify();
    setIsModalVisible(false);
    message.success('수정완료');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a  onClick={showModal} style={{color:"rgba(0, 0, 0, 0.45)",margin:"0px 5px"}} >수정</a>
      <Modal title="댓긇 수정" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText={"작성 취소"} okText={"댓글 수정 완료"}>
      <TextArea
          showCount maxLength={100}
          placeholder={newData.content}
          autoSize={{ minRows: 3, maxRows: 5 }}
          ref={userComment}
        />
      </Modal>
    </>
  );
};

export default V2WittyCommentModify;