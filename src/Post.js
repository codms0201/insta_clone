import React, { useState } from 'react';
import styled from 'styled-components';
import CommentList from './CommentList';

const PostContainer = styled.div`
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
  border-radius: 3px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-weight: bold;
`;

const PostContent = styled.div`
  padding: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #dbdbdb;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-right: 10px;
`;

const CommentButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #3897f0;
  color: white;
  border-radius: 3px;
  cursor: pointer;

  &:disabled {
    background-color: #b2dffc;
  }
`;

const Post = ({ post, addComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <PostContainer>
      <PostHeader>{post.username}</PostHeader>
      <PostContent>{post.content}</PostContent>
      <CommentList comments={post.comments} />
      <CommentForm onSubmit={handleCommentSubmit}>
        <CommentInput
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <CommentButton type="submit" disabled={!comment.trim()}>Post</CommentButton>
      </CommentForm>
    </PostContainer>
  );
};

export default Post;