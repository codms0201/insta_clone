import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dot from '../Assets/Imgs/점점점.svg';
import P_img from '../Assets/Imgs/우유10.jpeg';
import { deletePostAPI, updateWritingAPI, getUserPostAPI } from '../API/AxiosAPI';
import { useRecoilValue } from 'recoil';
import { userState } from "../Atom";

function EditDeleteBtn({ postId, onPostDeleted }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const userInfo = useRecoilValue(userState);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getUserPostAPI(userInfo.memberId);
      if (Array.isArray(data)) {
        setPosts(data.reverse());
      } else {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      alert('Content is required.');
      return;
    }

    setLoading(true);
    try {
      const data = {
        memberId: userInfo.memberId,
        content: content,
        imgUrl: posts[currentPostIndex]?.imgUrl
      };

      if (editPostId) {
        await updateWritingAPI(editPostId, data);
        alert('Post updated successfully!');
      }

      setWriteModalOpen(false);
      setContent('');
      fetchPosts();
    } catch (err) {
      setError('Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  const openWriteModal = (postId) => {
    setEditPostId(postId);
    setWriteModalOpen(true);
    setIsModalOpen(false);
    const post = posts.find(post => post.id === postId);
    setContent(post?.content || '');
    setCurrentPostIndex(posts.findIndex(post => post.id === postId));
  };

  const closeWriteModal = () => {
    setWriteModalOpen(false);
    setContent('');
    setEditPostId(null);
  };

  const handleBtnClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    try {
      await deletePostAPI(postId);
      onPostDeleted(postId); // 부모 컴포넌트에게 삭제 알림
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div>
      <Btn onClick={handleBtnClick}>
        <img src={dot} alt="삭제, 수정 모달 버튼" />
      </Btn>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <M_Btn2 onClick={handleDelete}>삭제</M_Btn2>
            <Line />
            <M_Btn onClick={() => openWriteModal(posts[currentPostIndex]?.id)}>수정</M_Btn>
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
                게시물 {editPostId ? '수정하기' : '작성하기'}
                <ShareBtn type="submit" disabled={loading}>공유하기</ShareBtn>
              </ModalHeader>
              <ModalWriteContent>
                <FileInputWrapper>
                  <img src={posts[currentPostIndex]?.imgUrl} alt="Selected" />
                </FileInputWrapper>
                <WriteContent>
                  <P_Modal_Profile2>
                    <Ppp>
                      <ProfileImage src={P_img} alt="Profile img" />
                    </Ppp>
                    <Name>
                      {userInfo.name}
                    </Name>
                  </P_Modal_Profile2>
                  <Writtings>
                    <TextArea 
                      id="content" 
                      value={content} 
                      onChange={handleContentChange} 
                      placeholder="내용을 입력하세요"
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
  margin-left: 314px;
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 0px 0px 16px;
  }
`;

const WriteContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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

const Writtings = styled.div`
  margin-top: 20px;
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

const Ppp = styled.div`
  margin-left: 18px;
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;
