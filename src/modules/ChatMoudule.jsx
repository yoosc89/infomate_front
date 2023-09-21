import { handleActions } from 'redux-actions';

const initialState = [];

export const GET_CHATROOM_LIST = 'CHAT/GET_CHATROOM_LIST'


const chatReducer = handleActions({
        PURGE : (state) => {
            return initialState;
        },
        [GET_CHATROOM_LIST]: (state, { payload }) => ({
           ...state, [GET_CHATROOM_LIST] : payload
        }),
    }, initialState
);

export default chatReducer;