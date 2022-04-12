import Modal from "antd/lib/modal/Modal";
import {
  Form,
  Input,
  Checkbox,
  AutoComplete,
  notification,
  Row,
  Col,
  Button,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { signup, sendEmail, idCheck, verification,userInfoModi } from "../../apis/users";
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

function SignupModal({ isModalVisible, setIsModalVisible,userId }) {
  const propsUserId = userId;
  const setModiOb = {
    title:"회원수정",
    bt_input:"수정하기"
  }

  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async ({
    user_id,
    user_email,
    user_department,
    password,
    profileImgUrl,
    introduction
  }) => {
    console.log(user_id);
    console.log(user_email);
    console.log(user_department);
    console.log(password);
    console.log(files[0].uploadedFile);
    console.log(introduction);
    if(propsUserId!==undefined){
      try {
        const formData = new FormData();
        formData.append("user_id",user_id);
        formData.append("user_email",user_email);
        formData.append("user_department",user_department);
        formData.append("password",password);
        formData.append("profileImgUrl",files.length && files[0].uploadedFile);
        formData.append("introduction",introduction);
        const result = await userInfoModi(formData,propsUserId);
        setIsModalVisible(false);
        alert('수정이 완료되었습니다')
      } catch ({ message }) {
        alert(message);
      }
    }else{
      try {
        const formData = new FormData();
        formData.append("user_id",user_id);
        formData.append("user_email",user_email);
        formData.append("user_department",user_department);
        formData.append("password",password);
        formData.append("profileImgUrl",files.length && files[0].uploadedFile);
        formData.append("introduction",introduction);
        const result = await signup(formData);
        setIsModalVisible(false);
        SignupCompleteNotification(result.user_id);
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  const SignupCompleteNotification = (user_id) => {
    notification.open({
      message: "회원가입 성공 !",
      description: `회원가입이 성공적으로 이루어졌습니다! ${user_id}님의 Witty 회원이 되신 것을 환영합니다!`,
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

  const id = useRef();

  const onIdCheck = async () => {
    try {
      const result = await idCheck(id.current.input.defaultValue);
      alert("사용가능한 아이디 입니다.");
    } catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
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
      title={propsUserId!==undefined?"프로필수정":"회원가입"}
      visible={isModalVisible}
      onOk={()=>{handleOk()}}
      okText={propsUserId!==undefined?setModiOb.bt_input:"프로필수정"}
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
          label="아이디"
          name="user_id"
          tooltip="아이디는 다른 사람에게 보이는 이름 정보입니다."
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요!",
              whitespace: true,
            },
          ]}
        >
          <Row gutter={8}>
            <Col span={14}>
              <Input ref={id} name="user_id" />
            </Col>
            <Col span={8}>
              <Button onClick={()=>{onIdCheck()}}>아이디 중복 확인</Button>
            </Col>
          </Row>
        </Form.Item>

  
        <Form.Item
          label="이메일"
          name="user_email"
          tooltip="위티는 대림대 전용 커뮤니케이션입니다 @email.daelim.ac.kr 로 가입해주세요"
          rules={[
            {
              type: "email",
              message: "유효하지 않은 이메일 입니다!",
            },
            {
              //required: true,
              message: "이메일을 입력해주세요!",
            },
            {
              pattern:".+@email\.daelim\.ac\.kr",
              message:"email.daelim.ac.kr로 가입해주세요",
            },
          ]}
        >
          <Row gutter={8}>
            <Col span={14}>
              <Input ref={email} name="user_email" />
            </Col>  
            <Col span={8}>
              <Button 
              onClick={()=>{onEmailCheck()}}
              loading={myLoading}
              >이메일 인증</Button>
            </Col>
          </Row>
        </Form.Item>
            
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
                    {
                    
                    }
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

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("개인정보 처리방침에 동의해주세요!")
                    ),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            <a href="">개인정보 처리방침</a>에 동의합니다
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SignupModal;
