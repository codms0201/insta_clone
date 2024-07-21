// src/components/FileUpload.js
import React, { useState } from 'react';
import { postWritingAPI } from '../API/AxiosAPI';

const WriteModal = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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