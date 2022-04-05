import styles from "./style.module.css";
import ReactLoading from "react-loading";

const V2WittyLoading = () => {
  return (
    <div className={styles.loading}>
      <ReactLoading type="spin" color="#00c7ee" />
    </div>
  );
};

export default V2WittyLoading;