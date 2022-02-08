import http from "./instance";

/**
 * 유저 정보
 * @typedef {Object} UserInfo
 * @property {string} user_id
 * @property {string} user_email
 * @property {string} user_department
 * @property {string} password
 */

/**
 * @typedef {Object} UserLogin
 * @property {string} user_id
 * @property {string} password
 */

/**
 * 회원가입
 * @param {UserInfo} userInfo 유저 정보
 * @returns {Promise}
 */
export const signup = (userInfo) => http.post("/users", userInfo);

/**
 * 로그인
 * @param {UserLogin} userLogin 로그인 정보
 * @returns {Promise}
 */
export const login = (userLogin) => http.post("/users/login", userLogin);

/**
 * 로그아웃
 * @returns {Promise}
 */
export const logout = () => http.post("/users/logout");

/**
 * 아이디 중복 체크
 * @param {string} user_id 아이디 확인
 * @returns {Promise}
 */
export const idCheck = (user_id) => http.post("/users/id_check", { user_id });

/**
 * 이메일 전송
 * @param {string} email 이메일
 * @returns {Promise}
 */
export const sendEmail = (email) => http.post("/users/sendEmail", { email });

/**
 * 인증번호 확인
 * @param {string} email 이메일
 * @param {string} key 키
 * @returns {Promise}
 */
export const verification = (email, key) =>
  http.post("/users/verification", {
    email,
    key,
  });
