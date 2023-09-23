import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";
import axios from "axios";
import {GET_SCHEDULE_COUNT} from "../modules/ScheduleMoudule";
import {message} from "antd";
import {GET_CHATROOM, GET_CHATROOM_LIST, GET_MESSAGE} from "../modules/ChatMoudule";

export const getChatRoomList = () => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/chat/roomlist`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }})
            .then(res => res.data)
            .catch(err => err);

        if(result?.status === 200) {
            console.log(result)
            dispatch({ type: GET_CHATROOM_LIST,  payload: result.data });
        }

    };
}

export const registChatRooms = ({memberCode}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/chat/room/regist`;
    const data = Array.of(memberCode);
    return async (dispatch, getState) => {
        const result = await axios.post(requestURL,data,{headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }})
            .then(res => res.data)
            .catch(err => err);

        if(result?.status === 200) {
            console.log(result)
            dispatch({ type: GET_CHATROOM,  payload: result });
        }

    };
}


export const getChatRoomDetail = ({chatRoomCode}) => {

    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/chat/room/${chatRoomCode}`;
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL,{headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }})
            .then(res => res.data)
            .catch(err => err);

        if(result?.status === 200) {
            dispatch({ type: GET_MESSAGE,  payload: result });
        }

    };
}
