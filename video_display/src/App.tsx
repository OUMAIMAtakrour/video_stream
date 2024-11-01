
import React from 'react';
import { useLocalCamerStream } from './useLocalCameraStream';
import { VideoFeed } from './videoFeed';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


function App() {
const {localStream}=useLocalCamerStream();

  
return (
  <BrowserRouter>
  <Routes>
    <Route
    path='video-chat-room/:roomName'/>
  </Routes>
  </BrowserRouter>
)
}

export default App
