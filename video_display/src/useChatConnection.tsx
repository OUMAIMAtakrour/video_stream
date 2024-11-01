import { useParams } from "react-router-dom";
import { useCallback,useEffect } from "react";
import { socket } from "./socket";
import { useOfferSending } from "./useOfferSending";
// import { connect } from "socket.io-client";

export function useChatConnection(peerConnecion:RTCPeerConnection){
    const {roomName}=useParams();
    const {sendOffer}=useOfferSending(peerConnecion);
    const handleConnection =useCallback(()=>{
        socket.emit('join_room',roomName);

    },[roomName]);
    useEffect(()=>{
        socket.connect();
        socket.on('connect',handleConnection);
        socket.on('another person ready',sendOffer);
        return()=>{
            socket.off('connect',handleConnection);
            socket.off('another person ready',sendOffer);
        };
    },[roomName,handleConnection,roomName]);
}