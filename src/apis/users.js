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
export const signin = (userInfo) => http.post("/users", userInfo);

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
 * @param {string} userId 아이디 확인
 * @returns {Promise}
 */
export const idCheck = (userId) => http.post("/users/id_check", { userId });
