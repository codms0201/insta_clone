import React, { useState } from "react";
import { uploadToS3 } from "../API/AwsS3";

const WritePost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택하세요.");
      return;
    }

    try {
      const result = await uploadToS3(selectedFile, true);
      setUploadResult(result);
      alert("파일 업로드 성공!");
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 실패!");
    }
  };

  return (
    <div>
      <h1>글 작성</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
      {uploadResult && (
        <div>
          <p>파일 키: {uploadResult.key}</p>
          <p>다운로드 링크: <a href={uploadResult.downloadLink} target="_blank" rel="noopener noreferrer">여기</a></p>
          {uploadResult.imageUrl && <img src={uploadResult.imageUrl} alt="업로드된 이미지" />}
        </div>
      )}
    </div>
  );
};

export default WritePost;
