import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider
    clientId={clientId}
    onScriptLoadError={() => console.log("실패")}
    onScriptLoadSuccess={() => console.log("성공")}
  >
    <RecoilRoot>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </RecoilRoot>
  </GoogleOAuthProvider>
);

reportWebVitals();