import axios from 'axios';
import axiosInstance from './axiosInstance';

const server = process.env.REACT_APP_API_URL;

//로그인 포스트
export const loginAPI = async (id, password) => {
  try{
      const response = await axios.get(
          `${server}/api/auth/login?email=${id}&password=${password}`
      );
      return response.data;
  } catch(err) {
      console.log(err);
  }
};

//회원가입 포스트
export const postUserAPI = async (data) => {
    try {
      const config = {"Content-Type": 'application/json'};
      const response = await axios.post(`${server}/api/register`, data, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

//유저 정보 가져오기
export const getUserAPI = async (userId) => {
  try {
    const config = { headers: { "Content-Type": 'application/json' } };
    const response = await axiosInstance.get(`${server}/api/user/${userId}`, config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//전체 게시물 가져오기
export const getPostAPI = async ()=> {
  try {
    const config = {"Content-Type": 'application/json'};
    const response = await axiosInstance.get(`${server}/api/boards`, config);
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
};

//한 유저의 게시물 가져오기
export const getUserPostAPI = async (userId)=> {
  try {
    const config = {"Content-Type": 'application/json'};
    const response = await axiosInstance.get(`${server}/api/boards/user/${userId}`, config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//게시물 작성 포스트
export const postWritingAPI = async (data) => {
    try {
      const config = {"Content-Type": 'application/json'};
      const response = await axiosInstance.post(`${server}/api/boards/create`, data, config);
      console.log(response.data);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  export const updateWritingAPI = async (boardId, data) => {
    try {
      const config = {"Content-Type": 'application/json'};
      const response = await axiosInstance.patch(`${server}/api/boards/${boardId}`, data, config);
      console.log(response.data);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  export const deletePostAPI = async (boardId) => {
    try {
      const config = {"Content-Type": 'application/json'};
      const response = await axiosInstance.delete(`${server}/api/boards/${boardId}`, config);
      console.log(response.data);
      return response;
    } catch (err) {
      console.error(err);
    }
  };


  export const getUserIdInfoAPI = async (boardId) => {
    try {
      const response = await axios.get(`${server}/api/boards/${boardId}/user`);
      return response.data;
    } catch(err) {
      console.error(err);
    }
  }

//회원정보 겟
export const getUserInfoAPI = async (userId) => {
    try {
      const response = await axios.get(`${server}/api/user${userId}`);
      return response.data;
    } catch(err) {
      console.error(err);
    }
  }

  //댓글 생성
export const postCommentAPI = async (data)=> {
  try {
    const config = {"Content-Type": 'application/json'};
    const response = await axiosInstance.post(`${server}/api/comments/create`, data, config);
    console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
  }
};