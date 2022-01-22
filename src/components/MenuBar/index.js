import "./style.css";

function MenuBar() {
  return (
    <div className="menu_box">
      <div style={{ padding: "0px 20px 0px 20px" }}>
        <h1>DU.Witty</h1>
        <label>
          <img src="##"></img> 위티 홈으로
          <br />
        </label>
        <label>
          <img src="##"></img> 피드 검색
          <br />
        </label>
        <label>
          <img src="##"></img> 공지
          <br />
        </label>
        <label>
          <img src="##"></img> 메시지
          <br />
        </label>
        <label>
          <img src="##"></img> 프로필 설정
          <br />
        </label>
        <label>
          <img src="##"></img> 팔로우 관리
          <br />
        </label>
        <label>
          <img src="##"></img> 추가 기능
          <br />
        </label>
      </div>
      <div style={{ padding: "40px 20px 0px 20px" }}>
        <button type="button" /*</div>onClick={}클릭*/ className="witty_button">
          Witty
        </button>
      </div>
      <div style={{ padding: "40px 20px 0px 20px" }}>
        <img src="##" alt="프로필사진"></img>
        <p>이름, 전공 state 들어갈예정</p>
      </div>
    </div>
  );
}

export default MenuBar;
