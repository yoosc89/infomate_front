import {useEffect, useRef} from "react";
import {SOCKET} from "../../apis/APIConfig";
import * as StompJs from "@stomp/stompjs";
import CalendarAlert from "../calendar/CalendarAlert";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGE} from "../../modules/ChatMoudule";
const Socket = ({chatroomList}) => {
    const client = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatMessage = useSelector(state => state.chatReducer[GET_MESSAGE]);

    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const memberCode = authToken.memberCode;
    const profile = authToken.profile;
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        client.current = new StompJs.Client({
            brokerURL: SOCKET,
            connectHeaders:{
                Authorization: accessToken
            },
            onConnect,
            onDisconnect: () => {
                client.current.deactivate();
            },
            debug: str => {
                console.log(str);
            }
        })
        client.current.activate();
    }, []);


    const onConnect = (()=>{
        chatroomList.forEach(chatroom => {
            client.current.subscribe(
                `/sub/chat/${chatroom.chatRoomCode}`,
                message => {
                    const data = JSON.parse(message.body);
                    dispatch((dispatch, getState) => {
                        dispatch({type: GET_MESSAGE, payload: [...getState().chatReducer[GET_MESSAGE], data]});
                    })
                }
            )
        })

        client.current.subscribe(
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


    const calednarAlertOnclickHandler = (e, data) => {
        toast.remove(e.id)
        navigate(`/calendar/regist?scheduleId=${data.scheduleId}&isread=true`)
    }

    return client;

}

export default Socket;