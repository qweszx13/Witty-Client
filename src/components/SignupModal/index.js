import Modal from "antd/lib/modal/Modal";
import { Form, Input, Checkbox, AutoComplete } from "antd";
import { useRef } from "react";

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
  const handleOk = () => {
    // 실행
    form.submit();
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          name="email"
          label="이메일"
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
          <Input />
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
          name="name"
          label="이름"
          tooltip="이름은 다른 사람에게 보이는 정보입니다."
          rules={[
            {
              required: true,
              message: "이름을 입력해주세요!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="major"
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
