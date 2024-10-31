
import { useLocalCamerStream } from './useLocalCameraStream';
import { VideoFeed } from './videoFeed';
import './App.css'

function App() {
const {localStream}=useLocalCamerStream();
if(!localStream){
  return null;
}
  
return <VideoFeed mediaStream={localStream}isMuted={true}/>
}

export default App
