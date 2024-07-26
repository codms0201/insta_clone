import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Menu from '../Components/Menu';
import Dot from '../Components/EditDeleteBtn';
import CommentForm from '../Components/CommentForm';
import P_img from '../Assets/Imgs/우유10.jpeg';
import P1 from '../Assets/Imgs/망곰이1.png';
import P2 from '../Assets/Imgs/망곰이2.png';
import P3 from '../Assets/Imgs/망곰이3.png';
import f_heart from '../Assets/Imgs/fullheart.svg';
import f_chet from '../Assets/Imgs/fullchet.svg';
import b_heart from '../Assets/Imgs/blankheart.svg';
import r_heart from '../Assets/Imgs/red.svg';
import comment from '../Assets/Imgs/comment.svg';
import dm from '../Assets/Imgs/dm.svg';
import save from '../Assets/Imgs/save.svg';

import { postWritingAPI } from '../API/AxiosAPI';

function MyPage() {
  const navigate = useNavigate();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [comments, setComments] = useState([[], [], []]);
  const [isHeartLiked, setIsHeartLiked] = useState(false);

  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setWriteModalOpen(false); // Close the modal after successful submission
      setFile(null);
      setContent('');
      setImagePreview(null); // Clear the state
    } catch (err) {
      setError('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  const posts = [
    { src: P1, description: "Post 1 description" },
    { src: P2, description: "Post 2 description" },
    { src: P3, description: "Post 3 description" }
  ];

  const goToProfileEdit = () => {
    navigate(`../profileEdit`);
  };

  const openPostModal = (index) => {
    setCurrentPostIndex(index);
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
  };

  const openWriteModal = () => {
    setWriteModalOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalOpen(false);
    setFile(null);
    setContent('');
    setImagePreview(null); // Clear the state
  };

  const addComment = (newComment) => {
    const updatedComments = [...comments];
    updatedComments[currentPostIndex].push(newComment);
    setComments(updatedComments);
  };

  const toggleHeart = () => {
    setIsHeartLiked(!isHeartLiked);
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
        <ProfileSection>
          <ProfileContainer>
            <Profile>
              <ProfileImage src={P_img} alt="Profile img" />
            </Profile>
            <ProfileInfo>
              <NickName>
                codms_0201
                <P_btn onClick={goToProfileEdit}>
                  프로필 편집
                </P_btn>
                <P_btn onClick={() => openWriteModal()}>
                  만들기
                </P_btn>
              </NickName>
              <Followers>
                <F1>게시물 0</F1>
                <F2>팔로워 0</F2>
                <F3>팔로우 0</F3>
              </Followers>
              <Etc>
                부앙단
              </Etc>
            </ProfileInfo>
          </ProfileContainer>
          <Line2 />
        </ProfileSection>
        <Posts>
          {posts.map((post, index) => (
            <Post key={index} onClick={() => openPostModal(index)}>
              <img src={post.src} alt={`Post ${index + 1}`} />
              <Overlay>
                <HeartCount>
                  <img src={f_heart} alt="full heart count" style={{width: '28px', height:'28px'}} />
                  110 만
                </HeartCount>
                <ChetCount>
                  <img src={f_chet} alt="full chet count" style={{width: '28px', height:'28px'}} />
                  110 만
                </ChetCount>
              </Overlay>
            </Post>
          ))}
        </Posts>
        {writeModalOpen && (
          <Modal2>
            <ModalOverlay2 onClick={closeWriteModal} />
            <form onSubmit={handleSubmit}>
            <ModalContent2>
              <ModalHeader>
                새 게시물 만들기
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
        {postModalOpen && (
          <Modal>
            <ModalOverlay onClick={closePostModal} />
            <ModalContent>
              <P_Modal_Content1>
                <img src={posts[currentPostIndex].src} alt={`Post ${currentPostIndex + 1}`} />
              </P_Modal_Content1>
              <P_Modal_Content>
                <P_Modal_Profile>
                  <Ppp>
                    <ProfileImage src={P_img} alt="Profile img" />
                  </Ppp>
                  <Name>
                    cheche
                  </Name>
                  <Dot />
                </P_Modal_Profile>
                <Line3 />
                {comments[currentPostIndex].map((comment, idx) => (
                  <P_Cont key={idx}>
                    <P_Modal_Profile>
                      <Ppp>
                        <ProfileImage src={comment.img} alt="Profile img" />
                      </Ppp>
                      <Name>
                        {comment.name}
                      </Name>
                      <Comment>
                        {comment.text}
                      </Comment>
                    </P_Modal_Profile>
                  </P_Cont>
                ))}
                <Line4 />
                <BottomContainer>
                <BottomIcon onClick={toggleHeart}>
                  <img src={isHeartLiked ? r_heart : b_heart} alt="heart icon" />
                </BottomIcon>
                <BottomIcon>
                  <img src={comment} alt="comment icon" />
                </BottomIcon>
                <BottomIcon>
                  <img src={dm} alt="dm icon" />
                </BottomIcon>
                <BottomIcon>
                  <img src={save} alt="save icon" />
                </BottomIcon>
                </BottomContainer>
                <Line5 />
                <CommentForm onSubmit={(data) => addComment({ name: 'cheche', img: P_img, text: data.comment })} />
              </P_Modal_Content>
            </ModalContent>
          </Modal>
        )}
      </Container2>
    </div>
  );
}

export default MyPage;

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

const Writtings = styled.div`
  margin-top: 20px;
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

const Container = styled.div`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
`;

const Container2 = styled.div`
  width: calc(100vw - 251px);
  margin-left: 251px;
  height: auto;
  background: #000;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  position: fixed;
  width: calc(100% - 60px);
  height: 100vh;
  padding: 50px 30px;
`;

const Line1 = styled.div`
  width: 1px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 250px;
  background: #262626;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 49px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 836px;
  margin: 0 auto;
`;

const Profile = styled.div`
  width: 145.357px;
  height: 145.357px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  height: 145.357px;
  margin-left: 78px;
  position: relative;
`;

const NickName = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const P_btn = styled.button`
  width: 85px;
  height: 29px;
  border-radius: 8px;
  background: #343434;
  color: #fff;
  border: none;
  margin-left: 10px;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: #606060;
  }
`;

const Followers = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const F1 = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const F2 = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const F3 = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Etc = styled.div`
  margin-top: 24px;
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Line2 = styled.div`
  width: 80%;
  height: 1px;
  background: #262626;
  margin-top: 70px;
`;

const Posts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 20px;
  padding: 20px;
  justify-content: center;
  margin-top: 30px;
`;

const Post = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border: 1px solid #262626;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover img {
    opacity: 0.8;
  }

  &:hover div {
    opacity: 1;
  }
`;

const HeartCount = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  margin-left: 28px;

  img {
    position: absolute;
    top: 132px;
    left: 64px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }
`;

const ChetCount = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;

  img {
    position: absolute;
    top: 132px;
    left: 154px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
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

const Modal = styled.div`
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

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  text-align: center;
  width: 1088px;
  height: 640px;
  display: flex;
`;

const P_Modal_Content1 = styled.div`
  width: 584px;
  height: 640px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const P_Modal_Content = styled.div`
  width: 504px;
  height: 640px;
  background-color: #000;
  padding-top: 15px;
  gap: 11px; 
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

const P_Modal_Profile = styled.div`
  display: flex;
`;

const Ppp = styled.div`
  margin-left: 18px;
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const Line3 = styled.div`
  width: 500px;
  height: 1px;
  background: #262626;
  position: fixed;
  top: 134px
`;

const Line4 = styled.div`
  width: 500px;
  height: 1px;
  background: #262626;
  position: fixed;
  top: 600px;
`;

const Line5 = styled.div`
  width: 500px;
  height: 1px;
  background: #262626;
  position: fixed;
  top: 654px;
`;

const P_Cont = styled.div`
  width: 480px;
  height: 30px;
  flex-shrink: 0;
  margin-top: 32px;
`;

const Comment = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
  margin-top: 10px;
  text-align: left;
`;

const BottomContainer = styled.div`
  display: flex;
  margin-top: 30.8rem;
  padding-left: 15px;
  gap: 11px;
  width: 500px;
  height: 54px;

  & > *:last-child {
    margin-left: 326px;
  }
`;

const BottomIcon = styled.div`
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`;