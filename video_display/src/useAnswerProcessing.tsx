import { useCallback } from "react";

export function useAnswerProcessing(peerConnecion: RTCPeerConnection) {
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      peerConnecion.setRemoteDescription(answer);
    },
    [peerConnecion]
  );
  return {
    handleOfferAnswer,
  };
}
