// src/components/FileUpload.js
import React, { useState } from 'react';
import { postWritingAPI } from '../API/AxiosAPI';
import { uploadToS3 } from "../API/AwsS3";

const WriteModal = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

    setLoading(true);
    try {
      const result = await uploadToS3(setFile, true);
      setUploadResult(result);
      alert("파일 업로드 성공!");
      await postWritingAPI(formData);
      alert('Post created successfully!');
    } catch (err) {
      setError('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload Image:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={handleContentChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default WriteModal;