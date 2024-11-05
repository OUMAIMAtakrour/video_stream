
import React from 'react';
import { useLocalCameraStream } from './useLocalCameraStream';
import { VideoFeed } from './videoFeed';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { VideoChatRoom } from './VideoChatRoom';


function App() {
const {localStream}=useLocalCameraStream();

  
return (
  <BrowserRouter>
  <Routes>
    <Route
    path="video-chat-room"
   element={localStream && <VideoChatRoom localStream={localStream}/>}
    />
  </Routes>
  </BrowserRouter>
)
}

export default App
