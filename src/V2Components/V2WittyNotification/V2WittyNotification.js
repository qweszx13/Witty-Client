import styles from "./style.module.css";

function V2WittyNotification(){
  return(
    <div id={styles.wrap}>
        <div id={styles.container1}>
            <img src={require("../../assets/images/img/notification.png")}></img>
            <h1 className={styles.title}>Notifications</h1>
        </div>
        <div id={styles.container2}>
            <div className={styles.post}>
                <h2 className={styles.title}>금일 점검 안내사항</h2>
                <h3 className={styles.date}>2022/02/22</h3>
            </div>
            <div className={styles.post}>
                <h2 className={styles.title}>건전한 채팅문화를 위한 공지사항</h2>
                <h3 className={styles.date}>2022/02/10</h3>
            </div>
        </div>
    </div>
  )}

  export default V2WittyNotification;