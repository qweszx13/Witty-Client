import http from "./instance";

/**
 * 위티 정보
 * @typedef {Object} UserWitty
 * @property {string} content
 * @property {Array<String>} tags
 * @property {Integer} wittyId
 */

/**
 * 위티 생성
 * @param {string} content 위티 정보
 * @param {Array<String>} tags 태그 정보
 * @returns {Promise}
 */
 export const wittys = (content,tags) => http.post("/wittys", {
   content,
   tags,
 });

 /**
 * 위티 수정
 * @param {string} content 위티 정보
 * @param {Array<String>} tags 태그 정보
 * @returns {Promise}
 */
 export const wittysModify = (wittyId,content,tags) => http.patch("/wittys/"+parseInt(wittyId),{
   content,
   tags,
 });

/** 
 * 위티 컨텐츠 조회
 * @returns {Promise}
 */
 export const wittysContent = (page) => http.get("/wittys?page="+parseInt(page)+"&size=3");

 /** 
 * 위티 컨텐츠 태그 조회
 * @returns {Promise}
 */
 export const wittysContentTag = (page,tag) => http.get("/wittys/byTag?page="+parseInt(page)+"&size=3&tag="+tag);

 /** 
 * 위티 컨텐츠 삭제
 * @returns {Promise}
 */
 export const wittysDelete = (wittyId) => http.delete("/wittys/"+parseInt(wittyId));


