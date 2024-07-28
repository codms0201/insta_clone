import React, { useEffect, useState } from 'react';
import { getPostAPI, getUserAPI, getUserPostAPI } from '../API/AxiosAPI'; // getPostAPI 함수가 정의된 파일을 import 합니다.
import { userState } from "../Atom";
import { useRecoilValue } from 'recoil';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPostAPI();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getUserPostAPI(userInfo.memberId);
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = 1;
        const userData = await getUserAPI(userId);
        console.log(userData.name);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Board List</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.content}</h2>
              {post.imgUrl && <img src={post.imgUrl} alt="Post Image" />}
              <p>Created at: {post.createdAt}</p>
              <p>Updated at: {post.updatedAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default BoardList;
