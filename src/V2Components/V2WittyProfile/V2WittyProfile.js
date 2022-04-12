import styles from "./style.module.css";
import V2WittyAddContents from "../V2WittyAddContents/V2WittyAddContents";
import V2WittyCreateModal from "../V2WittyCreateModal/V2WittyCreateModal";
import {followingNum} from "../../apis/users";
import {followersNum} from "../../apis/users";
import { useEffect, useState } from "react";
import SignupModal from "../V2SignupModal/V2SignupModal";




function V2WittyProfile(props){
    const userId = props.user.user_id;
    const user = props.user;
    const contentKey = 2;   
    const imgUrl = props.user.profile_imageUrl;

    const [fwerNum,setFwerNum] = useState(0);
    const [fwingNum,setFwingNum] = useState(0);

    const fNum = async () => {
        try{
            const resultFollower = await followersNum(props.user.user_id);
            const resultFollowing = await followingNum(props.user.user_id);
            setFwerNum(resultFollower.data);
            setFwingNum(resultFollowing.data);
        }catch ({
            response: {
            data: { fwerNum,fwingNum },
            },
        }) {
            alert(fwerNum,fwingNum);
        }
    }
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };
    
    useEffect(()=>{
      fNum();
    },[])
    

  return(
      <>
        <div id={styles.wrap}>
            <div id={styles.container1}>
                <img id={styles.user}></img>
                <div className={styles.profile}>Profile</div>
            </div>
            <div id={styles.container2}>
                <div id={styles.profileBox}>
                    <img className={styles.profileImg} src={process.env.PUBLIC_URL + '/V2UserImg/V2UserImg'+imgUrl} alt="어라..이미지가.."></img>
                </div>
                <div className={styles.name}>{props.user.user_id}</div>
                <div className={styles.major}>{props.user.user_department}</div>
                <div className={styles.msg}>{props.user.introduction}</div>
            </div>
            <div id={styles.container3}>
                <div className={styles.follow}>팔로잉</div>
                <div className={styles.follow}>팔로워</div>
                <div className={styles.number1}>{fwingNum}</div>
                <div className={styles.number2}>{fwerNum}</div>
            </div>
            <div id={styles.container4}>
                <V2WittyCreateModal></V2WittyCreateModal>
                <button className={styles.btn} onClick={showModal}>프로필 편집</button>
            </div>
        </div>
        <V2WittyAddContents user={user} contentKey={contentKey}/>
        <SignupModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        userId={userId}
        />
      </>
    
)}

export default V2WittyProfile;