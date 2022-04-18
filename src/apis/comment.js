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
 * @param {string} wittyId
 * @returns {Promise}
 */
 export const comments = (content,wittyId) => http.post("/comments",{content,wittyId});

/**
 * 댓글 수정
 * @param {string} content
 * @returns {Promise}
 */
export const commentModify = (commentId,content) => http.patch("/comments/"+commentId,{content});

/**
 * 댓글 삭제
 * @returns {Promise}
 */
export const commentDelete = (commentId) => http.delete("/comments/"+commentId)

/**
 * 댓글 조회
 * @returns {Promise}
 */
 export const commentContents = (wittyId,page) => http.get("/comments/"+wittyId+"?page="+parseInt(page)+"&size=8")

 /**
 * 댓글 좋아요
 * @param {string} commentId
 * @returns {Promise}
 */
 export const commentLike = (commentId) => http.post("/users/comment/like/"+commentId);

  /**
 * 댓글 좋아요취소
 * @param {string} commentId
 * @returns {Promise}
 */
 export const commentUnlike = (commentId) => http.post("/users/comment/unlike/"+commentId);


 /**
 * 댓글 갯수 조회
 * @returns {Promise}
 */
 export const commentLength = (wittyId) => http.get("/comments/"+wittyId+"?page=0&size=100")

