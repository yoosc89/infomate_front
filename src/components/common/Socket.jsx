import {useContext, useEffect, useRef, useState} from "react";
import {onDisconnect, SOCKET} from "../../apis/APIConfig";
import {SocketContext} from "../../context/SocketContext";
import * as StompJs from "@stomp/stompjs";

const Socket = () => {

    const client = useRef();
    const {data, setData} = useContext(SocketContext);
    const memberCode = JSON.parse(localStorage.getItem('authToken')).memberCode;
    const accessToken = localStorage.getItem('accessToken')


    useEffect(()=>{
        client.current = new StompJs.Client({
            brokerURL: SOCKET,
            connectHeaders:{
                Authorization: accessToken
            },
            debug: str => {
                console.log(str);
            },
            onConnect,
            onDisconnect: () => {
                client.current.deactivate();
            }
        })
        client.current.activate()


    },[])

    const onConnect = () => {
        client.current.subscribe(
            `/sub/chat/${memberCode}`,
            message => {
                setData(JSON.parse(message.body));
            }
        )
    }

    console.log(data)
}

export default Socket;