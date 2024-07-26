import React, { useState } from 'react';
import styled from 'styled-components';
import dot from '../Assets/Imgs/점점점.svg';
import P_img from '../Assets/Imgs/우유10.jpeg';
import { postWritingAPI } from '../API/AxiosAPI';

function EditDeleteBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !content) {
      alert('Both image and content are required.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('imgUrl', file);

    console.log(content);
    console.log(file);

    setLoading(true);
    try {
      await postWritingAPI(formData);
      alert('Post created successfully!');
      setWriteModalOpen(false);
      setFile(null);
      setContent('');
      setImagePreview(null); // Clear the state
    } catch (err) {
      setError('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  const openWriteModal = () => {
    setWriteModalOpen(true);
    setIsModalOpen(false); // Close the first modal when opening the write modal
  };

  const closeWriteModal = () => {
    setWriteModalOpen(false);
    setFile(null);
    setContent('');
    setImagePreview(null); // Clear the state
  };

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
            <M_Btn onClick={() => openWriteModal()}>수정</M_Btn>
            <Line />
            <M_Btn onClick={() => setIsModalOpen(false)}>취소</M_Btn>
          </ModalContent>
        </Modal>
      )}
      {writeModalOpen && (
        <Modal2>
          <ModalOverlay2 onClick={closeWriteModal} />
          <form onSubmit={handleSubmit}>
            <ModalContent2>
              <ModalHeader>
                게시물 수정하기
                <ShareBtn type="submit" disabled={loading}>공유하기</ShareBtn>
              </ModalHeader>
              <ModalWriteContent>
                <FileInputWrapper>
                  <FileInput type="file" id="file" onChange={handleFileChange} />
                  <FileInputLabel htmlFor="file">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Selected" />
                    ) : (
                      "사진 업로드 하기!!"
                    )}
                  </FileInputLabel>
                </FileInputWrapper>
                <WriteContent>
                  <P_Modal_Profile2>
                    <Ppp>
                      <ProfileImage src={P_img} alt="Profile img" />
                    </Ppp>
                    <Name>
                      cheche
                    </Name>
                  </P_Modal_Profile2>
                  <Writtings>
                    <TextArea 
                      id="content" 
                      value={content} 
                      onChange={handleContentChange} 
                      placeholder="문구를 입력하세요..."
                    />
                  </Writtings>
                </WriteContent>
              </ModalWriteContent>
            </ModalContent2>
          </form>
        </Modal2>
      )}
    </div>
  );
}

export default EditDeleteBtn;

const Btn = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 6px;
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

const Modal2 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalOverlay2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
`;

const ModalContent2 = styled.div`
  flex-direction: column;
  position: relative;
  background: #262626;
  border-radius: 16px;
  text-align: center;
  width: 900px;
  height: 500px;
  display: flex;
`;

const ModalHeader = styled.div`
  margin-left: 196px;
  width: 900px;
  height: 50px;
  padding-top: 18px;
  color: #FFF;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ShareBtn = styled.button`
  width: 64px;
  height: 20px;
  margin-left: 332px;
  border: none;
  background-color: #262626;
  color: #0095F6;
  &:hover{
    cursor: pointer;
  }
`;

const ModalWriteContent = styled.div`
  display: flex;
  width: 900px;
  height: 450px;
`;

const FileInputWrapper = styled.div`
  width: 450px;
  height: 450px;
  flex-shrink: 0;
  border-radius: 0px 0px 0px 16px;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 450px;
    height: 450px;
    object-fit: cover;
    border-radius: 0px 0px 0px 16px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #D9D9D9;
  border-radius: 0px 0px 0px 16px;
  color: #000;
  cursor: pointer;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  margin-left: 11px;
  margin-top: 8px;
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal; 
`;

const P_Modal_Profile2 = styled.div`
  display: flex;
  padding-top: 6px;
`;

const Ppp = styled.div`
  margin-left: 18px;
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const Writtings = styled.div`
  margin-top: 20px;
`;

const WriteContent = styled.div`
  width: 450px;
  height: 450px;
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 160px;
  background: #262626;
  color: #FFF;
  border: none;
  resize: none;
  padding: 10px;
  font-family: Inter;
  font-size: 14px;
`;
