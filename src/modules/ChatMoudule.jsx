import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_CHATROOM_LIST = 'CHAT/GET_CHATROOM_LIST'
export const GET_CHATROOM = 'CHAT/GET_CHATROOM'

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
    }, initialState
);

export default chatReducer;