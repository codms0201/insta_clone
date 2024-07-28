import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import b_heart from '../Assets/Imgs/blankheart.svg';
import r_heart from '../Assets/Imgs/red.svg';
import comment from '../Assets/Imgs/comment.svg';
import dm from '../Assets/Imgs/dm.svg';
import save from '../Assets/Imgs/save.svg';
import Menu from '../Components/Menu';
import dot from '../Assets/Imgs/점점점.svg';
import P_img from '../Assets/Imgs/우유10.jpeg';
import { getPostAPI, getUserAPI } from '../API/AxiosAPI';

function MainPage() {
  const navigate = useNavigate();
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  const toggleHeart = () => {
    setIsHeartLiked(!isHeartLiked);
  };

  const goToOtherPage = (userId, postId) => {
    navigate(`/otherpage/${userId}/${postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPostAPI();
      if (response && response.data) {
        setPosts(response.data.reverse());
      }
    };

    fetchPosts();
  }, []);

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
        <CenteredWrapper>
          {posts.map((post) => (
            <PostContainer key={post.id}>
              <Header>
                <Ppp onClick={() => goToOtherPage(post.userId, post.id)}>
                  <ProfileImage src={P_img} alt="Profile img" />
                </Ppp>
                <Name onClick={() => goToOtherPage(post.userId, post.id)}>
                  {users[post.userId]?.name || 'Loading...'}
                </Name>
                <Btn>
                  <img src={dot} alt="점점점" />
                </Btn>
              </Header>
              <PostImg>
                <img src={post.imgUrl} alt="post img" onClick={() => goToOtherPage(post.userId, post.id)} />
              </PostImg>
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
              <PostContent>
                좋아요 41.5만개
                <br />
                {post.content}
                <br />
                <p>댓글 5639개 모두 보기</p>
              </PostContent>
              <Line2 />
            </PostContainer>
          ))}
        </CenteredWrapper>
      </Container2>
    </div>
  );
}

export default MainPage;

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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  margin-left: 11px;
  margin-top: 10px;
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;

const Ppp = styled.div`
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;

  &:hover{
    cursor: pointer;
  }
`;

const Btn = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 6px;
  margin-left: auto;
  z-index: 2;
  &:hover {
    cursor: pointer;
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
  margin-left: 250px;
  height: auto;
  overflow-y: auto;
  background: #000;
  z-index: 1;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const PostContainer = styled.div`
  width: 474px;
  height: auto;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  width: 474px;
  height: 60px;
`;

const PostImg = styled.div`
  width: 474px;
  height: 590px;
  overflow: hidden;
  border-radius: 4px; 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 11px;
  width: 474px;
  height: 46px;

  & > *:last-child {
    margin-left: auto;
  }
`;

const BottomIcon = styled.div`
  z-index: 2;
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`;

const PostContent = styled.div`
  flex-direction: column;
  width: 474px;
  height: auto;
  color: #FFF;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.8;

  p {
    color: #A0A0A0;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Line2 = styled.div`
  width: 474px;
  height: 1px;
  background: #262626;
  margin-top: 10px;
`;

const MenuWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 50px 30px;
`;

const Line1 = styled.div`
  width: 1px;
  height: 100vh;
  position: fixed;
  left: 250px;
  background: #262626;
`;
