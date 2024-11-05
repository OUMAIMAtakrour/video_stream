import { useState, useEffect } from "react";

export function useLocalCameraStream() {
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    async function getLocalStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing camera/microphone:", error);
        if (error.name === "NotReadableError") {
          alert(
            "We're sorry, but we were unable to access your camera and microphone. Please check your device settings and try again."
          );
        } else {
          alert("An error occurred while accessing the camera and microphone.");
        }
      }
    }

    getLocalStream();
  }, []);

  return { localStream };
}