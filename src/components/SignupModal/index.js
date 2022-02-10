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
import { signup, sendEmail, idCheck } from "../../apis/users";
import { createRef } from "react";

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

function SignupModal({ isModalVisible, setIsModalVisible }) {
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
  }) => {
    console.log(user_id);
    console.log(user_email);
    console.log(user_department);
    console.log(password);
    try {
      const result = await signup({
        user_id,
        user_email,
        user_department,
        password,
      });
      setIsModalVisible(false);
      SignupCompleteNotification(result.user_id);
    } catch ({ message }) {
      alert(message);
    }
  };

  const SignupCompleteNotification = (user_id) => {
    notification.open({
      message: "회원가입 성공 !",
      description: `회원가입이 성공적으로 이루어졌습니다! ${user_id}님의 Witty 회원이 되신 것을 환영합니다!`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const email = createRef();

  const onEmailCheck = async () => {
    console.log(email);
    const result = await sendEmail(email.current.state.value);
    console.log(result);
  };

  const id = createRef();

  const onIdCheck = async () => {
    try {
      const result = await idCheck(id.current.state.value);
    } catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  };

  return (
    <Modal
      title="회원가입"
      visible={isModalVisible}
      onOk={handleOk}
      okText="회원가입"
      onCancel={handleCancel}
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
              <Button onClick={onIdCheck}>아이디 중복 확인</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="이메일">
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="user_email"
                rules={[
                  {
                    type: "email",
                    message: "유효하지 않은 이메일 입니다!",
                  },
                  {
                    required: true,
                    message: "이메일을 입력해주세요!",
                  },
                ]}
              >
                <Input ref={email} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button onClick={onEmailCheck}>이메일 인증</Button>
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
