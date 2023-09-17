import {useContext, useEffect, useRef, useState} from "react";
import {onDisconnect, SOCKET} from "../../apis/APIConfig";
import * as StompJs from "@stomp/stompjs";
import CalendarAlert from "../calendar/CalendarAlert";
import {toast} from "react-hot-toast";



const Socket = () => {

    const client = useRef();

    // const {calendarAlert, setCalendarAlert} = useContext(CalendarFilterContext);
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
                // setData(JSON.parse(message.body));
            }
        )

        client.current.subscribe(
            `/sub/calendar/alert/${memberCode}`,
            message => {
                const data =JSON.parse(message.body)
                toast.custom(t=> (
                    <CalendarAlert
                        message={data.scheduleTitle}
                        createDate={data.startDate}
                        onClick={()=>toast.remove(t.id)}
                    />
                ),{duration: 30*1000});
            }
        )
    }

}

export default Socket;