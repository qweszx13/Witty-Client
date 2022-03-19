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
      try{
        const res = await auth();
        const fetchedUser = res.data.user;
           setUser({
               user_id: fetchedUser.user_id,
               user_email: fetchedUser.user_email,
               user_department: fetchedUser.user_department
           });
      }catch{
        alert('로그인이 필요한 서비스 입니다!');
          navigate('/login');
      }
      
  }

  useEffect(() => {
      fetchUser();
  }, [])
  return (
    <>
      <MenuBar user={user}></MenuBar>
      <NavBar user={user}></NavBar>
      <SearchBar user={user}></SearchBar>
      <WittyHome user={user}></WittyHome>
    </>
  );
}

export default MainPage;
