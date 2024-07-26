import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const CommentForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isWriting, setIsWriting] = useState(false);

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
    setIsWriting(false); // Reset writing state after submit
  };

  const handleInputChange = (e) => {
    setIsWriting(e.target.value.length > 0);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitHandler)}>
      <FormGroup>
        <label htmlFor="comment">Comment</label>
        <StyledTextarea 
          id="comment" 
          {...register('comment', { required: 'Comment is required' })}
          placeholder="댓글 달기..."
          onChange={handleInputChange}
        />
        {errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}
      </FormGroup>
      <SubmitButton type="submit" isWriting={isWriting}>게시</SubmitButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  position: fixed;
  top: 636px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTextarea = styled.textarea`
  width: 440px;
  height: 53px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 16px;
  border: none;
  background-color: #000;
  resize: none;

  color: #979797;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 54px;
  height: 30px;
  margin-top: 20px;
  margin-left: 4px;
  font-size: 16px;
  border: none;
  background-color: #000;
  color: ${({ isWriting }) => (isWriting ? '#3C98FF' : '#5A6E80')};
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export default CommentForm;