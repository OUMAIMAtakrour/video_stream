import { useCallback } from "react";
import { socket } from "./socket";
import { useParams } from "react-router-dom";

export function useOffersListening(peerConnecion: RTCPeerConnection) {
  const { roomName } = useParams();
  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      await peerConnecion.setRemoteDescription(offer);
      const answer = await peerConnecion.createAnswer();
      await peerConnecion.setLocalDescription(answer);
      socket.emit("answer", { answer, roomName });
    },
    [roomName]
  );
  return {
    handleConnectionOffer,
  };
}
