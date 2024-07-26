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

//게시물 작성 포스트
export const postWritingAPI = async (data) => {
    try {
      const response = await axiosInstance.post(`${server}/api/boards/create`, data);
      console.log(response.data);
      return response;
    } catch (err) {
      console.error(err);
    }
  };



//회원정보 겟
export const getUserInfoAPI = async (userId) => {
    try {
      const response = await axios.get(`${server}/api/user${userId}`);
      return response.data;
    } catch(err) {
      console.error(err);
    }
  }


//전체 게시물 겟
//게시물 한개 겟
//특정 사용자의 전체 게시물 겟
//회원정보 겟

//게시물 작성 포스트
//게시물 좋아요 포스트
//댓글작성 포스트
//로그인 포스트
//회원가입 포스트

//게시물 수정 패치
//회원 정보 수정 패치

//게시물 수정 딜릿