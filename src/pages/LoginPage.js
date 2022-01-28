import logo from "../assets/images/logo.png";
import background from "../assets/images/login-background.jpg";
import { Button } from "antd";
import { useState } from "react";
import SignupModal from "../components/SignupModal";
import "../components/Left/style.css";
import "../components/Right/style.css";

function LoginPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="Left-main-body">
        <img className="Left-main-img" alt="메인 사진" src={background} />
        <img className="Left-main-logo" alt="로고" src={logo} />
      </div>
      <div id="Right-main-body">
        <div className="Right-main-content">
          <img className="Right-main-logo" alt="오른쪽 로고" src={logo} />
          <h1 style={{ color: "gray" }}>Daelim</h1>
          <h1>Witty 위트있게 시작하세요</h1>
          <h4>위트잇는 우리들의 커뮤니케이션</h4>
          <input
            className="Right-loginid-input"
            type="text"
            placeholder="ID"
          ></input>
          <p></p>
          <input
            className="Right-loginpw-input"
            type="text"
            placeholder="pw"
          ></input>
          <p></p>
          <Button type="primary" href="/">
            로그인
          </Button>
          <p></p>
          <label className="Right-login-label">
            로그인 상태 유지<input type="checkBox" name="auto-login"></input>
          </label>
          <p></p>
          <label style={{ marginRight: "20px" }}>아직 회원이 아니신가요?</label>
          <Button type="primary" onClick={showModal}>
            회원가입
          </Button>
        </div>
      </div>
      <SignupModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}

export default LoginPage;
