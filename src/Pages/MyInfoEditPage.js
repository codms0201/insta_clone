import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Menu from '../Components/Menu';
import profile from '../Assets/Imgs/profile.svg';

function MyInfoEditPage() {
  const [text, setText] = useState('');
  const maxChars = 150;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxChars) {
      setText(newText);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Container>
        <MenuWrapper>
          <Menu />
        </MenuWrapper>
      </Container>
      <Line1 />
      <Container2>
        <Header>
          프로필 편집
        </Header>
        <P_Reg>
          <img src={profile} alt="profile img" style={{ width: '62.071px', height: '62.071px' }} />
          <NameContainer>
            <NickName>
              cheche
            </NickName>
            <Name>
              채채
            </Name>
          </NameContainer>
          <P_ChangeBtn>사진 변경</P_ChangeBtn>
        </P_Reg>
        <Intro>소개</Intro>
        <TextAreaWrapper>
          <TextArea 
            rows="1"
            value={text} 
            onChange={handleTextChange} 
          />
          <CharCount>{text.length} / {maxChars} characters</CharCount>
        </TextAreaWrapper>
        <SubmitBtn>제출</SubmitBtn>
      </Container2>
    </div>
  );
}

export default MyInfoEditPage;

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
`

const Container2 = styled.div`
  width: calc(100vw - 251px);
  margin-left: 251px;
  min-height: 600px;
  background: #000;
`

const Header = styled.div`
  margin-left: 192px;
  margin-top: 109px;
  color: #FFF;
  font-family: Inter;
  font-size: 21px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`

const P_Reg = styled.div`
  display: flex;
  width: 674px;
  height: 96px;
  margin-left: 192px;
  margin-top: 52px;
  padding-top: 18px;
  padding-left: 15.5px;
  gap: 20.5px;
  flex-shrink: 0;
  border: none;
  border-radius: 20px;
  background-color: #1A1A1A;
`

const NameContainer = styled.div`
  margin-top: 12px;
`

const NickName = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const Name = styled.div`
  color: #AEAEAE;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const Intro = styled.div`
  margin-top: 37px;
  margin-left: 192px;
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`

const P_ChangeBtn = styled.button`
  width: 93px;
  height: 36px;
  margin-top: 12px;
  margin-left: 394px;
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  background: #3C98FF;
  z-index: 10;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:hover {
    cursor: pointer;
  }
`

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 192px;
  margin-top: 26px;
  gap: 10px;
  width: 674px;
  height: 100px;

`

const TextArea = styled.textarea`
  flex: 1;
  width: 674px;
  height: 67px;
  border-radius: 16px;
  background-color: #1A1A1A;
  color: #FFF;
  border: 1px solid #333;
  padding: 10px;
  resize: vertical;
  box-sizing: border-box;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  z-index: 10;
`

const CharCount = styled.div`
  margin-top: 5px;
  color: #AEAEAE;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const SubmitBtn=styled.button`
  width: 275px;
  height: 48px;
  flex-shrink: 0;
  margin-top: 50px;
  margin-left: 598px;
  border: none;
  border-radius: 8px;
  background: #3C98FF;

  color: #FFF;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  z-index: 100;
  &:hover{
    cursor: pointer;
  }
`

const MenuWrapper = styled.div`
  position: fixed;
  width: calc(100% - 60px);
  height: 100vh;
  padding: 50px 30px;
`

const Line1 = styled.div`
  width: 1px;
  height: 832px;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 250px;
  background: #262626;
`