import styles from './chatRoom.module.css';
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGE} from "../../modules/ChatMoudule";
import {LoadingSpiner} from "../common/other/LoadingSpiner";
import {getChatRoomDetail} from "../../apis/ChatAPICalls";
import meterialIcon from '../../components/common/meterialIcon.module.css';
import dayjs from "dayjs";

const ChatRoom = () => {

    const chatRoomCode = 1;
    const dispatch = useDispatch();
    // const data = useSelector(state => state.chatReducer[GET_MESSAGE]);
    const data = [
        {message: 'message \n dfddf \n sdfsdfsdf \nsdfsfs', sender: '1', createDate: dayjs().format('HH:mm:ss')},
        {message: 'message12313', sender: '2', createDate: dayjs().format('HH:mm:ss')},
    ]
    // load chatRoomCode

    useEffect(() => {
        dispatch(getChatRoomDetail({chatRoomCode: chatRoomCode}));

        return () =>
            dispatch(dispatch => {
                dispatch({type: GET_MESSAGE, payload: ''});
        })
    }, []);

    if(!data) return <LoadingSpiner />;

    return (
        <div className={styles.chatRoomContainer}>
            <div>
                <Header />
            </div>
            <div>
                <Body data={data} />
            </div>
            <div>
                <Input />
            </div>
        </div>
    )
}

export default ChatRoom;

const Header = () => {
    return (
        <div>

        </div>
    )
}

const Body = ({data}) => {
    return (
        <div>
            <Message message={data[0].message} sender={data[0].message} createDate={data[0].createDate} isMe={false} />
            <Message message={data[1].message} sender={data[1].message} createDate={data[1].createDate} isMe={true} />
        </div>
    )
}

const Message = ({sender, message, createDate, isMe}) => {
    return (
        <div className={[styles.messageGrid, styles.messageContainerCol2].join(' ')}>
            <div>
                {isMe || <img className={styles.memberProfile} src="/img/user.jpg" onError={(e)=> e.src='/img/user.jpg'}/>}
            </div>
            <div className={[isMe ? styles.messageRight : styles.messageLeft].join(' ')}>
                <div>
                    <pre className={styles.message}>
                        {message}
                    </pre>
                    <div className={styles.messageDate}>
                        {createDate}
                    </div>
                </div>

            </div>
        </div>

    )
}

const Input = () => {
    const textArea = useRef();

    const resizeHeightHandler = () => {
        textArea.current.style.height = '30px';
        textArea.current.style.height = textArea.current.scrollHeight + 'px';
    }
    return (
        <div className={styles.inputContainer}>
            <textarea ref={textArea} className={styles.input} rows={1} onChange={resizeHeightHandler} />
            <button className={styles.submitBtn}>
                <span className={meterialIcon.meterialIcon} style={{letterSpacing: 0}}>arrow_upward</span>
            </button>
        </div>
    )
}