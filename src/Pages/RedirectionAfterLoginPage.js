import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { userState } from "../Atom";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../API/axiosInstance';

const RedirectionAfterLoginPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/api/userinfo')
      .then((response) => {
        setUserInfo(response.data);
        console.log(response.data);
        navigate('/main');
      })
      .catch((error) => {
        console.error('Fetching user info failed:', error);
      });
  }, [setUserInfo, navigate]);

  useEffect (()=>{
    console.log(userInfo);
  
},[userInfo]);

  if (!userInfo) {
    return (
      <Div>
        <Spinner />
      </Div>
    );
  }

  return null;
};

export default RedirectionAfterLoginPage;

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  `
;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  `
;

const Spinner = styled.div`
  border: 16px solid blue;
  border-top: 16px solid darkblue;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  `
;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  `
;
