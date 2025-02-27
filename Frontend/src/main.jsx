// filepath: /C:/Users/Krish-Rudra/OneDrive/Desktop/krish MERN/UberClone/Frontend/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import DoctorContext from '../context/DoctorContext.jsx';
// import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoctorContext>
      <UserContext>
        {/* <SocketProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </SocketProvider> */}
      </UserContext>
    </DoctorContext>
  </StrictMode>,
);