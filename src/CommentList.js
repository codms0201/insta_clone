import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #dbdbdb;
`;

const Comment = styled.div`
  margin-bottom: 5px;
`;

const CommentList = ({ comments }) => {
  return (
    <CommentContainer>
      {comments.map((comment, index) => (
        <Comment key={index}>{comment}</Comment>
      ))}
    </CommentContainer>
  );
};

export default CommentList;
