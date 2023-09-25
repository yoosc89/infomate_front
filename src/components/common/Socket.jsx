import {useEffect, useRef} from "react";
import {SOCKET} from "../../apis/APIConfig";
import * as StompJs from "@stomp/stompjs";
import CalendarAlert from "../calendar/CalendarAlert";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const Socket = () => {

    const navigate = useNavigate();

    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const memberCode = authToken.memberCode;
    const profile = authToken.profile;
    const accessToken = localStorage.getItem('accessToken')

    const client = new StompJs.Client({
        brokerURL: SOCKET,
        connectHeaders:{
            Authorization: accessToken
        },
        debug: str => {
            console.log(str);
        }
    })

    client.onConnect(()=>{
        client.subscribe(
            `/sub/chat/${memberCode}`,
            message => {
                // setData(JSON.parse(message.body));
            }
        )
        client.subscribe(
            `/sub/calendar/alert/${memberCode}`,
            message => {
                const data =JSON.parse(message.body)
                toast.custom(t=> (
                    <CalendarAlert
                        profile={profile}
                        message={data.scheduleTitle}
                        startDate={data.startDate}
                        endDate={data.endDate}
                        onClick={e=>calednarAlertOnclickHandler(t, data)}
                    />
                ),{duration: 30*1000});
            }
        )
    });

    client.activate();

    const calednarAlertOnclickHandler = (e, data) => {
        toast.remove(e.id)
        navigate(`/calendar/regist?scheduleId=${data.scheduleId}&isread=true`)
    }

    return client;

}

export default Socket;