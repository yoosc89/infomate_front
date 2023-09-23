import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_CHATROOM_LIST = 'CHAT/GET_CHATROOM_LIST'
export const GET_CHATROOM = 'CHAT/GET_CHATROOM'

export const GET_MESSAGE = 'CHAT/GET_MESSAGE'

const chatReducer = handleActions({
        PURGE : (state) => {
            return initialState;
        },
        [GET_CHATROOM_LIST]: (state, { payload }) => ({
           ...state, [GET_CHATROOM_LIST] : payload
        }),
        [GET_CHATROOM]: (state, { payload }) => ({
            ...state, [GET_CHATROOM] : payload
        }),
        [GET_MESSAGE]: (state, { payload }) => ({
            ...state, [GET_MESSAGE] : payload
        }),
    }, initialState
);

export default chatReducer;