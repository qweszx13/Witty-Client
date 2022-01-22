import "./style.css";
import logo from "../../assets/images/logo.png";
import background from "../../assets/images/login-background.jpg";

function Left() {
  return (
    <div className="Left-main-body">
      <img className="Left-main-img" alt="메인 사진" src={background} />
      <img className="Left-main-logo" alt="로고" src={logo} />
    </div>
  );
}

export default Left;
