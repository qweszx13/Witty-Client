import "./style.css";

function NavBar() {
  return (
    <div className="navbar_box">
      <div style={{ padding: "0px 20px 0px 20px" }}>
        <h1 style={{ color: "gray" }}>Home</h1>
        <img src="##" alt="프로필 사진"></img>
        <input type="text" placeholder="오늘은 무슨일이 잇었나요??"></input>
        <br />
        <a href="##(모달)">
          <img src="##" alt="지구본"></img>누구나 볼수 있는 게시글
        </a>
        <hr></hr>
        {/*선길이 이미지 사진에 맞춰 조정예정*/}
        <div className="navbar_button">
          <img src="##사진" alt="사진"></img>
          <img src="##파일" alt="파일"></img>
          <img src="##태그" alt="태그"></img>
          <button type="button" /*</div>onClick={}클릭*/>Witty</button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
