import "./style.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export function Right() {
  return (
    <div>
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
            type="password"
            placeholder="PW"
          ></input>
          <p></p>
          <Link to="/">
            <button className="Right-login-button">로그인</button>
          </Link>
          <p></p>
          <label className="Right-login-label">
            로그인 상태 유지<input type="checkBox" name="auto-login"></input>
          </label>
          <p></p>
          <label style={{ marginRight: "20px" }}>아직 회원이 아니신가요?</label>
          <button className="Right-signup-button">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Right;
