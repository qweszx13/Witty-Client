import "./style.css";

function SearchBar() {
  return (
    <div className="search_box">
      <div style={{ padding: "50px 0px 0px 0px" }}>
        <div className="search_tool">
          <img src="##" alt="search img"></img>
          <input type="search" id="search" placeholder="search witty"></input>
        </div>
        <div className="search_content">여기에 검색한 내용이 들어갈 예정</div>
      </div>
    </div>
  );
}

export default SearchBar;
