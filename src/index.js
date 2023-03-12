import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="114723797368-f8jgu5mcdjrrqg7gja4gm3h193huhkoc.apps.googleusercontent.com">;
        <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);