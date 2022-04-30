import Modal from "antd/lib/modal/Modal";
import {
  Form,
  Input,
  AutoComplete,
  notification,
  Row,
  Col,
  Button,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { sendEmail, verification,userInfoModi,logout } from "../../apis/users";
import { useRef,useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const majarOptions = [
  { value: "컴퓨터 소프트웨어과" },
  { value: "모바일 인터넷과" },
  { value: "컴퓨터 정보학부" },
];

function V2ProfileModifyModal({ isModalVisible, setIsModalVisible,userId}) {
  const [form] = Form.useForm();
  
  const navigate = useNavigate();

  const userLogout = async ()=>{

    try{
      const result = await logout(); 
        navigate('/');
    }catch({
      response:{ 
        data:{ result }
      },
    }) {
      alert(result);
    }
  }
  

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async ({
    user_email,
    user_department,
    password,
    profileImgUrl,
    introduction
  }) => {
    console.log(user_email);
    console.log(user_department);
    console.log(password);
    console.log(files[0].uploadedFile);
    console.log(introduction);
      try {
        const formData = new FormData();
        formData.append("user_department",user_department);
        formData.append("password",password);
        formData.append("profileImgUrl",files.length && files[0].uploadedFile);
        formData.append("introduction",introduction);
        const result = await userInfoModi(formData,userId);
        setIsModalVisible(false);
        userLogout();
        ModifyCompleteNotification();
      } catch ({ message }) {
        alert(message);
      }
    };

  const ModifyCompleteNotification = (user_id) => {
    notification.open({
      message: "프로필 수정 성공!",
      description: `다시 로그린하고 위티를 시작해봐요!`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const [files,setFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles([...files, { uploadedFile: file }]);
  };
  
  

  return (
    <Modal
      title={"프로필수정"}
      visible={isModalVisible}
      onOk={()=>{handleOk()}}
      okText={"수정완료"}
      onCancel={(()=>{handleCancel()})}
      cancelText="취소"
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >      
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호 확인을 입력해주세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("비밀번호와 일치하지 않습니다!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="introduction"
          label="자기소개"
        >
          <Input name="introduction"/>
        </Form.Item>
        <Form.Item
          label="프로필 이미지"
          name="profileImgUrl"
        >
          <Input
          type="file"
          encType="multipart/form-data"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleUpload}
          ></Input>
        </Form.Item>
       
        
        <Form.Item
          name="user_department"
          label="학과"
          rules={[{ required: true, message: "학과를 선택해 주세요!" }]}
        >
          <AutoComplete
            style={{
              width: 200,
            }}
            options={majarOptions}
            placeholder="학과"
            filterOption={(inputValue, option) =>
              option.value.indexOf(inputValue) !== -1
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}


export default V2ProfileModifyModal;
