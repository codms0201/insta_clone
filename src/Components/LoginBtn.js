import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { userState } from "../Atom";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";

const LoginBtn = () => {
  const API = process.env.REACT_APP_API_URL;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);

  // Google OAuth2 로그인 페이지로 리디렉션
  const handleLogin = () => {
    console.log("Sdfsfsdf");
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    console.log("aaaaaaaa");
  };

  const handleLogout = async () => {
    fetch(`${API}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("로그아웃 실패했다 문제는 서버와의 통신");
        }
        resetUserState();
        navigate("/");
      })
      .catch((error) => {
        console.error("서버와의 통신 오류 또는 로그아웃 작업 실패", error);
      });
  };

  return (
    <GoogleLoginButton onClick={handleLogin}>
      <FcGoogle />
      <span>{userInfo ? "Logoutㄱㄱ" : "Continue with"}</span>
    </GoogleLoginButton>
  );
};

export default LoginBtn;

const GoogleLoginButton = styled.button`
  width: 320px;
  background-color: grey;
  margin-top: 20px;
  color: #4285f4;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: blue;
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    background-color: darkblue;
    transform: translateY(0);
  }

  svg {
    margin-right: 10px;
  }

  span {
    margin-left: 8px;
  }
`;
