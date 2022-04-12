import http from "./instance";
import axios from "axios";

/**
 * 댓긓 정보
 * @property {string} id
 * @typedef {Object} UserInfo 
 * @property {string} content
 * @property {string} createdDateTime
 * @property {string} password
 * @property {file} likes
 * @property {string} likeStatus
 */

/**
 * 댓글 생성
 * @param {string} content
 * @param {String} wittyId
 * @returns {Promise}
 */
 export const comments = () => http.post("/comments");

/**
 * 댓글 수정
 * @param {string} content
 * @returns {Promise}
 */
export const commentModify = (commentId) => http.patch("/comments/"+commentId);

/**
 * 댓글 삭제
 * @returns {Promise}
 */
export const commentDelete = (commentId) => http.delete("/comments/"+commentId)

/**
 * 댓글 조회
 * @returns {Promise}
 */
 export const commentContents = (wittyId) => http.get("/comments/"+wittyId+"?page=0&size=8")

