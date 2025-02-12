import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../Assets/Imgs/logo.svg';
import { postMemberAPI } from '../API/RegisterAPI';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const newData = {
      nickname: username,
    };

    try {
      const response = await postMemberAPI(newData);
      if (response.success === false) {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("가입 성공! 로그인 페이지로 이동합니다.");
        navigate('/');
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("가입 실패. 다시 시도하세요.");
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Container1>
        <Logo>
          <img src={logo} alt="instagram logo" />
        </Logo>
        <W_msg>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </W_msg>
        <form onSubmit={handleRegister}>
          <WriteContainer2>
            <Input 
              placeholder="사용자 이름" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </WriteContainer2>
          <WarnMsg>
            저희 서비스를 이용하는 사람이 회원님의 연락처 정보를<br />
            Instargram에 업로드했을 수도 있습니다. <LearnMore>더 알아보기</LearnMore>
          </WarnMsg>
          <SignBtn type="submit" disabled={isButtonDisabled}>
            가입
          </SignBtn>
        </form>
      </Container1>
      <Container2>
        <C2_1>계정이 있으신가요?</C2_1>
        <StyledLink to="/">
          <C2_2>로그인</C2_2>
        </StyledLink>
      </Container2>
    </Wrapper>
  );
}

export default SignUpPage;

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
  height: 340px;
  flex-shrink: 0;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const W_msg = styled.div`
  margin-top: 30px;
  color: #797979;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
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

const WriteContainer2 = styled.div`
  width: 268px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  position: relative;
  margin-top: 28px;
  margin-bottom: 30px;
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

const WarnMsg = styled.div`
  margin-top: 15px;
  color: #797979;
  font-family: Inter;
  font-size: 11.4px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center; /* Center align text */
`;

const LearnMore = styled.span`
  color: #FFF;
`;

const SignBtn = styled.button`
  width: 268px;
  height: 32px;
  margin-top: 15px;
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  background: #3C98FF;

  color: #FFF;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  cursor: pointer;

  &:disabled {
    background: #7CBDFF;
    color: #FEFFFF;
    cursor: not-allowed;
  }
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
