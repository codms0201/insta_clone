import React, { useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'user1',
      content: 'This is a post',
      comments: []
    }
  ]);

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  return (
    <AppContainer>
      {posts.map(post => (
        <Post key={post.id} post={post} addComment={addComment} />
      ))}
    </AppContainer>
  );
};

export default App;