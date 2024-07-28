import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Menu from '../Components/Menu';
import CommentForm from '../Components/CommentForm';
import P_img from '../Assets/Imgs/우유10.jpeg';
import f_heart from '../Assets/Imgs/fullheart.svg';
import f_chet from '../Assets/Imgs/fullchet.svg';
import b_heart from '../Assets/Imgs/blankheart.svg';
import r_heart from '../Assets/Imgs/red.svg';
import comment from '../Assets/Imgs/comment.svg';
import dm from '../Assets/Imgs/dm.svg';
import save from '../Assets/Imgs/save.svg';

import { getUserPostAPI , getUserAPI } from '../API/AxiosAPI';
import { useRecoilValue } from 'recoil';
import { userState } from "../Atom";

function OtherPage() {
  const navigate = useNavigate();
  const { userId, postId } = useParams(); // URL에서 userId와 postId를 가져옵니다.
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const userInfo = useRecoilValue(userState);
  const [posts, setPosts] = useState([]); // 배열로 초기화
  const [users, setUsers] = useState({});

  console.log(userId, postId);
  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = [...new Set(posts.map(post => post.userId))]; // Get unique userIds
      const userPromises = userIds.map(userId => getUserAPI(userId));
      const userResponses = await Promise.all(userPromises);

      const usersData = userResponses.reduce((acc, response) => {
        acc[response.id] = response;
        return acc;
      }, {});

      setUsers(usersData);
    };

    if (posts.length > 0) {
      fetchUsers();
    }
  }, [posts]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const data = await getUserPostAPI(userId);
        console.log(data);
        if (Array.isArray(data)) {
          setPosts(data.reverse()); // 게시물 순서를 역순으로 설정
          setComments(data.map(() => [])); // posts 길이에 맞게 comments 초기화
        } else {
          console.error('API 응답이 배열이 아닙니다:', data);
          setPosts([]);
          setComments([]);
        }
      } catch (error) {
        console.error('게시물 가져오기 오류:', error);
        setPosts([]);
        setComments([]);
      }
    };

    fetchUserAndPosts();
  }, [userId]);

  useEffect(() => {
    if (posts.length > 0) {
      const postIndex = posts.findIndex(post => post.id === Number(postId));
      if (postIndex !== -1) {
        setCurrentPostIndex(postIndex);
        setPostModalOpen(true);
      }
    }
  }, [posts, postId]);

  const openPostModal = (index) => {
    setCurrentPostIndex(index);
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
  };

  const addComment = (newComment) => {
    const updatedComments = [...comments];
    if (updatedComments[currentPostIndex]) {
      updatedComments[currentPostIndex].push(newComment);
      setComments(updatedComments);
    }
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
                {users[userId]?.name}
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
          {Array.isArray(posts) && posts.map((post, index) => (
            <Post key={index} onClick={() => openPostModal(index)}>
              <img src={post.imgUrl} alt={`Post ${index + 1}`} />
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
        {postModalOpen && (
          <Modal>
            <ModalOverlay onClick={closePostModal} />
            <ModalContent>
              <P_Modal_Content1>
                <img src={posts[currentPostIndex]?.imgUrl} alt={`Post ${currentPostIndex + 1}`} />
              </P_Modal_Content1>
              <P_Modal_Content>
                <P_Modal_Profile>
                  <Ppp>
                    <ProfileImage src={P_img} alt="Profile img" />
                  </Ppp>
                  <Name>
                    {users[userId]?.name}
                  </Name>
                </P_Modal_Profile>
                <Line3 />
                <P_Modal_Profile1>
                  <Ppp>
                    <ProfileImage src={P_img} alt="Profile img" />
                  </Ppp>
                  <Name>
                    {users[userId]?.name}
                  </Name>
                  <Content>
                    {posts[currentPostIndex]?.content}
                  </Content>
                </P_Modal_Profile1>
                {comments[currentPostIndex]?.map((comment, idx) => (
                  <P_Cont key={idx}>
                    <P_Modal_Profile>
                      <Ppp>
                        <ProfileImage src={comment.img} alt="Profile img" />
                      </Ppp>
                      <Name>
                        {userInfo.name}
                      </Name>
                      <Comment>
                        {comment.content}
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
                <CommentForm boardId={postId} memberId={userId} onCommentSubmit={addComment} />
              </P_Modal_Content>
            </ModalContent>
          </Modal>
        )}
      </Container2>
    </div>
  );
}

export default OtherPage;

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

const Content = styled.div`
  margin-left: 11px;
  margin-top: 8px;
  color: #FFF;
`;

const P_Modal_Profile1 = styled.div`
  display: flex;
  width: 800px;
  margin-top: 20px;
`;

const P_Modal_Profile = styled.div`
  display: flex;
  width: 800px;
  margin-top: -12px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
  margin-top: 10px;
  text-align: left;
`;

const BottomContainer = styled.div`
  display: flex;
  margin-top: 30.4rem;
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
