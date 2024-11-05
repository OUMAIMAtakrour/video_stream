import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { socket } from "./socket";
import { useOfferSending } from "./useOfferSending";
// import { useSendingAnswer } from "./useSendingAnswer";
import { useOffersListening } from "./useSendingAnswer";
import { useAnswerProcessing } from "./useAnswerProcessing";

// import { connect } from "socket.io-client";

export function useChatConnection(peerConnecion: RTCPeerConnection) {
  const { roomName } = useParams();

  const { sendOffer } = useOfferSending(peerConnecion);

  const { handleConnectionOffer } = useOffersListening(peerConnecion);

  const { handleOfferAnswer } = useAnswerProcessing(peerConnecion);

  const handleConnection = useCallback(() => {
    socket.emit("join_room", roomName);
  }, [roomName]);
  const handleReceiveCandidate = useCallback(
    ({ candidate }: { candidate: RTCIceCandidate }) => {
      peerConnecion.addIceCandidate(candidate);
    },
    [peerConnecion]
  );
  useEffect(() => {
    socket.connect();
    socket.on("connect", handleConnection);
    socket.on("another person ready", sendOffer);
    socket.on("answer", handleOfferAnswer);
    socket.on("send connection offer", handleConnectionOffer);
    socket.on("send candidate", handleReceiveCandidate);
    return () => {
      socket.off("connect", handleConnection);
      socket.off("another person ready", sendOffer);
      socket.off("send connection offer", handleConnectionOffer);
      socket.off("answer", handleOfferAnswer);
      socket.off("send candidate", handleReceiveCandidate);
    };
  }, [
    roomName,
    handleConnection,
    roomName,
    handleConnectionOffer,
    sendOffer,
    handleReceiveCandidate,
  ]);
}
