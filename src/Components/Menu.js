import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from '../Assets/Imgs/logo.svg';
import home from '../Assets/Imgs/home.svg';
import search from '../Assets/Imgs/search.svg';
import reels from '../Assets/Imgs/reels.svg';
import dm from '../Assets/Imgs/dm.svg';
import alert from '../Assets/Imgs/alert.svg';
import profile from '../Assets/Imgs/profile.svg';
import menubar from '../Assets/Imgs/menubar.svg';

function Menu({ onActiveChange }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMakeModalOpen, setMakeModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const goToMain = () => {
    navigate(`../main`);
  };

  const goToMyPage = () => {
    navigate(`../mypage`);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      setMakeModalOpen(false);
    }
  };

  const handleToggleChange = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    if (onActiveChange) {
      onActiveChange(newIsActive);
    }
  };

  return (
    <Div>
      <Container>
        <Logo onClick={goToMain}>
          <img src={logo} alt="Instargram logo" />
        </Logo>
        <Button onClick={goToMain}>
          <img src={home} alt="home button" />
          <p>홈</p>
        </Button>
        <Button>
          <img src={search} alt="search button" />
          <p>검색</p>
        </Button>
        <Button>
          <img src={reels} alt="reels button" />
          <p>릴스</p>
        </Button>
        <Button>
          <img src={dm} alt="dm button" />
          <p>메시지</p>
        </Button>
        <Button>
          <img src={alert} alt="alert button" />
          <p>알림</p>
        </Button>
        <Button onClick={goToMyPage}>
          <img src={profile} alt="profile button" />
          <p>프로필</p>
        </Button>
        <M_Button onClick={toggleModal}>
          <img src={menubar} alt="menubar button" />
          <p>더 보기</p>
        </M_Button>
        {isModalOpen && (
          <Modal onClick={closeModal}>
            <ModalContent>
              <Button2>
                <p>다크 모드</p>
                <ToggleSwitch>
                  <CheckBox
                    type="checkbox"
                    checked={isActive}
                    onChange={handleToggleChange}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </Button2>
              <Button2>
                로그아웃
              </Button2>
            </ModalContent>
          </Modal>
        )}
        {isMakeModalOpen && (
          <NewModal onClick={closeModal}>
            <NewModalContent>
              <p>새로운 모달 내용</p>
            </NewModalContent>
          </NewModal>
        )}
      </Container>
    </Div>
  );
};

export default Menu;

const Div = styled.div`
  display: inline-flex;
  width: 220px;
`;
const Container = styled.div`
  width: 195px;
  height: auto;
  gap: 6px;
`;

const Logo = styled.div`
  width: 92px;
  height: 26px;
  flex-shrink: 0;
  margin-bottom: 30px;
  &:hover{
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 195px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  border: none;
  background-color: #000;
  padding: 10px;
  flex-shrink: 0;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    background-color: #161616;
    cursor: pointer;
  }
`;

const Button2 = styled.button`
  width: 100%;
  height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  border: none;
  background-color: #343434;
  padding: 10px;
  flex-shrink: 0;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  &:hover {
    background-color: #606060;
    cursor: pointer;
  }
`;

const M_Button = styled.button`
  width: 195px;
  height: 42px;
  margin-top: 300px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  border: none;
  background-color: #000;
  padding: 10px;
  flex-shrink: 0;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    background-color: #161616;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0);
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 190px;
  height: 96px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-bottom: 86px;
  margin-left: 30px;
  background: #343434;
  color: #fff;
  border-radius: 8px;
  text-align: left;
  position: relative;
`;

const ToggleSwitch = styled.label`
  position: relative;
  margin-left: 56px;
  width: 32px;
  height: 19px;
  display: flex;
  align-items: center;
  border-radius: 4999.5px;
  &:hover {
    cursor: pointer;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #C6C6C6;
  transition: .4s;
  border-radius: 32px;

  &:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #C6C6C6;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(13px);
    background-color: #000;
  }
`;

const NewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const NewModalContent = styled.div`
  width: 300px;
  height: 200px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;