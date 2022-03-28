import styles from "./style.module.css";
import { useEffect, useState } from "react";
import V2WittyAddContents from "../V2WittyAddContents/V2WittyAddContents"
import V2WittyCreateModal from "../V2WittyCreateModal/V2WittyCreateModal"


function V2WittyProfile(props){

    const user = props.user;
    const contentKey = 2;


  
  return(
      <>
        <div id={styles.wrap}>
            <div id={styles.container1}>
                <img id={styles.user}></img>
                <div className={styles.profile}>Profile</div>
            </div>
            <div id={styles.container2}>
                <div id={styles.profileBox}>
                    <img className={styles.profileImg}></img>
                </div>
                <div className={styles.name}>{props.user.user_id}</div>
                <div className={styles.major}>{props.user.user_department}</div>
                <div className={styles.msg}>안녕하세요. 위티님들 :D</div>
            </div>
            <div id={styles.container3}>
                <div className={styles.follow}>팔로잉</div>
                <div className={styles.follow}>팔로워</div>
                <div className={styles.number1}>10</div>
                <div className={styles.number2}>25</div>
            </div>
            <div id={styles.container4}>
                <V2WittyCreateModal></V2WittyCreateModal>
                <button className={styles.btn}>프로필 편집</button>
            </div>
        </div>
        <V2WittyAddContents user={user} contentKey={contentKey}/>
      </>
    
)}

export default V2WittyProfile;