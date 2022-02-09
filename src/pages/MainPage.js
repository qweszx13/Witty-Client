import NavBar from "../components/NavBar";
import MenuBar from "../components/MenuBar";
import SearchBar from "../components/SearchBar";
import WittyHome from "../components/WittyHome";
import {useEffect, useState} from "react";
import { auth } from "../apis/users";
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
      user_id: '',
      user_email: '',
      user_department: ''
  });

  const fetchUser = async () => {
      const res = await auth();
      const result = res.data.result;

      if(result !== '성공') {
          alert('로그인이 필요한 서비스 입니다!');
          navigate('/login');
      }else {
           const fetchedUser = res.data.user;
           setUser({
               user_id: fetchedUser.user_id,
               user_email: fetchedUser.user_email,
               user_department: fetchedUser.user_department
           });
      }
  }

  useEffect(() => {
      fetchUser();
  }, [])
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
