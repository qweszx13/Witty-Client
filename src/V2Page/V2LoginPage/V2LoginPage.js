import "./style.css";
import React from "react";
import { useState, createRef } from "react";
import SignupModal from "../../V2Components/V2SignupModal/index";
import { login } from "../../apis/users";
import { useNavigate } from 'react-router-dom';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NewLoginPage(){
	const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [userIdInput, userPwInput] = [createRef(), createRef()];

  const userLogin = async (e) => {
		e.preventDefault();
    try {
      const user_id = userIdInput.current.value;
      const password = userPwInput.current.value;
			console.log(user_id,password);
      await login({ user_id,password });
      navigate('/witty');
    } catch ({
      response: {
        data: { result },
      },
    }) {
      alert(result);
    }
  };

  return(
		<>
			<div id="wrap">
				<div id="container">
					<FontAwesomeIcon icon={brands('wikipedia-w')} size="3x" aria-hidden="true" />
					<h1>Witty, 위트있게!</h1>
					<h2>위트있는 우리들의 커뮤니케이션</h2>
					<form onSubmit={userLogin}>
						<div id="idInput">
							<input 
							type="text" 
							placeholder="your ID"
							ref={userIdInput}
							></input>
							<FontAwesomeIcon className="i" icon={solid('user')} aria-hidden="true" />
						</div>
						<div id="pwInput">
							<input 
							type="password" 
							placeholder="your PASSWORD"
							ref={userPwInput}></input>
							<FontAwesomeIcon className="i" icon={solid('lock')} aria-hidden="true" />
						</div>
						<button id="btnLogin" type="submit" >LOGIN</button>
						<div id="signIn">아직 회원이 아니신가요? <a onClick={()=>{showModal()}}>회원가입</a></div>
					</form>
				</div>
			</div>
			<SignupModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
		</>
    )
}

export default NewLoginPage;
