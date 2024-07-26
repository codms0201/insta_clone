import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../Assets/Imgs/logo.svg';
import { UserData, LoginState } from '../Atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginAPI } from '../API/LoginAPI';
import LoginBtn from '../Components/LoginBtn';

function LoginPage() {
  const [loginCheck, setLoginCheck] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(UserData);
  const useData = useRecoilValue(UserData);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLocalLogin = async (email, password) => {
    try {
        const response = await loginAPI(email, password);
        // localStorage.setItem("token", response); // 로컬 스토리지에 토큰 저장
        // console.log(localStorage.getItem("token"));

        // server login 결과
        console.log(response);
        if (response) {
            setLoginCheck(false);
            setIsLoggedIn(true);
            setUserData(response);
            console.log(userData);
            //navigate(`../main/${response.user_id}`);
            navigate('/home');
        } else {
            setLoginCheck(true);
        }
    } catch (err) {
        console.log(err);
    }
};

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires returnValue to be set.
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLocalLogin(email, password);
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Container1>
        <Logo>
          <img src={logo} alt="instagram logo" />
        </Logo>
        <form onSubmit={handleLocalLogin}>
          <WriteContainer>
            <Input
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </WriteContainer>
          <WriteContainer2>
            <Input
              placeholder="비밀번호"
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggle onClick={togglePasswordVisibility}>
              {passwordVisible ? '숨기기' : '비밀번호 보기'}
            </PasswordToggle>
          </WriteContainer2>
          {/* <LoginBtn type="submit">
            로그인
          </LoginBtn> */}
          <LoginBtn/>
        </form>
      </Container1>
      <Container2>
        <C2_1>계정이 없으신가요?</C2_1>
        <StyledLink to="/signup">
          <C2_2>가입하기</C2_2>
        </StyledLink>
      </Container2>
    </Wrapper>
  );
}

export default LoginPage;

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container1 = styled.div`
  width: 349px;
  height: 302px;
  flex-shrink: 0;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  width: 175px;
  height: 49px;
  flex-shrink: 0;
  margin-top: 46px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const WriteContainer = styled.div`
  width: 268px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  position: relative;
  margin-top: 42px;
`;

const WriteContainer2 = styled.div`
  width: 268px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  position: relative;
  margin-top: 6px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 2px;
  padding: 4px 9px;
  box-sizing: border-box;
  background-color: transparent;
  color: #fff;

  &::placeholder {
    color: #8E8E8E;
    font-family: Inter;
    font-size: 9.6px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #3E96FC;
  font-size: 9.6px;
  cursor: pointer;
`;

// const LoginBtn = styled.button`
//   width: 268px;
//   height: 32px;
//   margin-top: 15px;
//   flex-shrink: 0;
//   border: none;
//   border-radius: 8px;
//   background: #3C98FF;

//   color: #FFF;
//   font-family: Inter;
//   font-size: 13px;
//   font-style: normal;
//   font-weight: 900;
//   line-height: normal;
//   cursor: pointer;
// `;

const OrContainer = styled.div`
  display: flex;
  align-items: center;
  width: 268px;
  height: 20px;
  margin-top: 22px;
  gap: 18px;

  color: #727272;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background: #EAEAEA;
`;

const OrText = styled.div`
  padding: 0 10px;
`;

const Container2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 349px;
  height: 62px;
  flex-shrink: 0;
  border: 1px solid #EAEAEA;
  gap: 10px;
`;

const C2_1 = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const C2_2 = styled.div`
  color: #3E96FC;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
