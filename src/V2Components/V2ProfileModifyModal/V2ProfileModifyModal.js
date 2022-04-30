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
import { sendEmail, verification,userInfoModi } from "../../apis/users";
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

function V2ProfileModifyModal({ isModalVisible, setIsModalVisible,userId }) {
  const [form] = Form.useForm();
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
        ModifyCompleteNotification();
      } catch ({ message }) {
        alert(message);
      }
    };

  const ModifyCompleteNotification = (user_id) => {
    notification.open({
      message: "수정 성공!",
      description: `프로필을 새롭게 수정했어요!`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  
  const [myTimer,setMyTimer] = useState(300000);
  const email = useRef();
  const [emailCheckInput,setEmailCheckInput] = useState(false);
  const [myLoading,setMyLoading] = useState(false);//로딩
  const regExp = /.+@email\.daelim\.ac\.kr/;//규정

  const onEmailCheck = async () => {
    setMyLoading(true);
    try{
      if(regExp.test(email.current.input.defaultValue)){
        const result = await sendEmail(email.current.input.defaultValue);
        alert("이메일로 인증번호가 전송되었습니다.");
        setEmailCheckInput(true);
        setMyLoading(false);
        function disabled(){
          const input = document.getElementById("user_email");
          input.setAttribute("readonly","readonly")
        }
        disabled();
        setTimeout(() => {
        setEmailCheckInput(false)
        alert("입력시간이 초과되었습니다!")
      }, myTimer);//3분
      }else{
        alert("이메일은 대림대학교 이메일로 인증해주세요!");
        setMyLoading(false);
      }
    }catch({
      response: {
        data: { result }
      },
    }){
      if(result === "이미 가입된 이메일 입니다."){
        setEmailCheckInput(false);
        setMyLoading(false);
        alert(result);
      }else{
        setEmailCheckInput(false);
        setMyLoading(false);
        alert("이메일 인증이 잘못되었습니다.");
      }
    }
  };

  

  const userVerification = useRef();
  const [userVerficationCheck,setUserVerificationCheck] = useState(false);
  
  

  const onVerificationCheck = async () =>{
    try{
      const result = await verification(email.current.input.defaultValue,userVerification.current.input.defaultValue);
      if(result.data.result === "인증번호를 확인 해 주세요"){
        alert(result);
      }else{
        console.log(result);
        alert("인증번호가 일치합니다!");
        function disabled(){
          const input = document.getElementById("user_verification");
          input.setAttribute("readonly","readonly")
        }
        disabled();
        setMyTimer(300000000);
      }
      
      }catch({
        response:{ 
          data:{ result }
      },
    }) {
      alert(result);
    }

  }

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
        {()=>{
          emailCheckInput === true
          ?setUserVerificationCheck(true)
          :setUserVerificationCheck(false)
        }}

        <Form.Item label="이메일 인증" style={ {marginBottom:"0px"} } hidden={userVerification}>
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="verification"
                rules={[
                  {
                    len:6,
                    message:"인증번호는 6자 입니다!"
                  },
                  {
                  //required:true,
                  message:"인증번호를 입력해주세요!"
                  },
                ]}
              >
                <Input ref={userVerification} id="user_verification"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button onClick={()=>{onVerificationCheck()}}>인증번호 확인</Button>
            </Col>
          </Row>
        </Form.Item>
        
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
