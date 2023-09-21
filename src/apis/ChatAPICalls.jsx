import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";
import axios from "axios";
import {GET_SCHEDULE_COUNT} from "../modules/ScheduleMoudule";
import {message} from "antd";
import {GET_CHATROOM_LIST} from "../modules/ChatMoudule";

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