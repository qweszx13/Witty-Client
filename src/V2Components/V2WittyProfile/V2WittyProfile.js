import styles from "./style.module.css";
import V2WittyAddContents from "../V2WittyAddContents/V2WittyAddContents";
import V2WittyCreateModal from "../V2WittyCreateModal/V2WittyCreateModal";
import {followingNum} from "../../apis/users";
import {followersNum} from "../../apis/users";
import { useEffect, useState } from "react";
import V2ProfileModifyModal from "../V2ProfileModifyModal/V2ProfileModifyModal";
import {Layout} from 'antd';


const { Header, Footer, Content } = Layout;

function V2WittyProfile(props){
    const profileFlag = props.profileFlag;
    const setProfileFlag = props.setProfileFlag;
    const userId = props.user.user_id;
    const user = props.user;
    const contentKey = 2;   
    const imgUrl = props.user.profile_imageUrl;
    const setWittySuccesFlag = props.setWittySuccesFlag;
    const wittySuccesFlag = props.wittySuccesFlag

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
      fNum()
    })
    

  return(
      <Layout>
        <Header>
            <div id={styles.container1}>
                <div className={styles.profile}>Witty Profile</div>
            </div>
        </Header>
        <Content>
        <div id={styles.container2}>
                <div id={styles.profileBox}>
                    <img className={styles.profileImg} src={process.env.PUBLIC_URL + '/v2/users/image/'+imgUrl} alt="어라..이미지가.."></img>
                </div>
                <div className={styles.name}>{props.user.user_id}</div>
                <div className={styles.major}>{props.user.user_department}</div>
                <div className={styles.msg}>{props.user.introduction}</div>
            </div>
            <div id={styles.container3}>
                <div className={styles.follow}>팔로잉</div>
                <div className={styles.follow}>팔로우</div>
                <div className={styles.number1}>{fwingNum}</div>
                <div className={styles.number2}>{fwerNum}</div>
            </div>
            <div id={styles.container4}>
                <V2WittyCreateModal setWittySuccesFlag={setWittySuccesFlag} wittySuccesFlag={wittySuccesFlag}></V2WittyCreateModal>
                <button className={styles.btn} onClick={showModal}>프로필 편집</button>
            </div>
        </Content>
        <Footer>
            <V2WittyAddContents user={user} contentKey={contentKey} wittySuccesFlag={wittySuccesFlag} setWittySuccesFlag={setWittySuccesFlag}/>
            <V2ProfileModifyModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            userId={userId}
            profileFlag = {profileFlag}
            setProfileFlag ={setProfileFlag}
            />
        </Footer>
      </Layout>
    
)}

export default V2WittyProfile;