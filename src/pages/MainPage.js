import NavBar from "../components/NavBar";
import MenuBar from "../components/MenuBar";
import SearchBar from "../components/SearchBar";
import WittyHome from "../components/WittyHome";

function MainPage() {
  return (
    <>
      <MenuBar></MenuBar>
      <NavBar></NavBar>
      <SearchBar></SearchBar>
      <WittyHome></WittyHome>
    </>
  );
}

export default MainPage;
