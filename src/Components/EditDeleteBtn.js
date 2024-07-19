import React, { useState } from 'react';
import styled from 'styled-components';
import dot from '../Assets/Imgs/점점점.svg';

function EditDeleteBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBtnClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Btn onClick={handleBtnClick}>
        <img src={dot} alt="삭제, 수정 모달 버튼" />
      </Btn>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <M_Btn2>삭제</M_Btn2>
            <Line />
            <M_Btn>수정</M_Btn>
            <Line />
            <M_Btn onClick={() => setIsModalOpen(false)}>취소</M_Btn>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default EditDeleteBtn;

const Btn = styled.div`
  width: 22px;
  height: 22px;
  margin-left: 340px;
  &:hover {
    cursor: pointer;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 401px;
  height: 147px;
  background: #262626;
  border-radius: 18px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;

const M_Btn2 = styled.button`
  width: 401px;
  height: 47px;
  color: #ED4956;
  border: none;
  border-radius: 18px;
  background-color: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const M_Btn = styled.button`
  width: 401px;
  height: 47px;
  color: #fff;
  border: none;
  border-radius: 18px;
  background-color: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 401px;
  height: 1px;
  background-color: #343434;
  margin: 10px 0;
`;