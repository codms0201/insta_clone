import React from 'react';
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import MainPage from './Pages/MainPage';
import MyPage from './Pages/MyPage';
import MyInfoEditPage from './Pages/MyInfoEditPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profileEdit" element={<MyInfoEditPage />} />
      </Routes>
    </div>
  );
};

export default App;