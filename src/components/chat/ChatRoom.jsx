import styles from './chatRoom.module.css';
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_MESSAGE} from "../../modules/ChatMoudule";
import {LoadingSpiner} from "../common/other/LoadingSpiner";
import {getChatRoomDetail} from "../../apis/ChatAPICalls";
import meterialIcon from '../../components/common/meterialIcon.module.css';
import dayjs from "dayjs";
import {ChatContext} from "./ChatComponent";
import {NotResultData} from "../../pages/common/Error";
import Socket from "../common/Socket";
import {SocketContext} from "../../context/SocketContext";


const ChatRoom = () => {

    const dispatch = useDispatch();

    const {curState, setCurState} = useContext(ChatContext);

    const data = useSelector(state => state.chatReducer[GET_MESSAGE]);
    useEffect(() => {
        dispatch(getChatRoomDetail({chatRoomCode: curState.chatRoomCode}));

        return () =>
            dispatch(dispatch => {
                dispatch({type: GET_MESSAGE, payload: ''});
        })
    }, []);


    if(!data) return <LoadingSpiner />;

    return (
        <div className={styles.chatRoomContainer}>
            <div>
                <Header chatRoomName={curState?.chatRoomName} />
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

const Header = ({chatRoomName}) => {

    const {curState, setCurState} = useContext(ChatContext);

    const onClickHandler = () => {
        setCurState({mainMenu: 'list'});
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerText}>
                {chatRoomName}
            </div>
            <div className={styles.sticky}>
                <button
                    className={[meterialIcon.meterialIcon, styles.stickyBtn].join(' ')}
                    onClick={onClickHandler}
                >
                    arrow_back_ios
                </button>
            </div>
        </div>
    )
}

const Body = ({data}) => {

    const memberCode = JSON.parse(localStorage.getItem("authToken")).memberCode;

    if(data.length === 0) return <NotResultData />
    console.log(data)

    return (
        <div className={styles.bodyContainer}>
            {data.map(message => (
                <Message
                    message={message.message}
                    sender={message.sender}
                    createDate={dayjs(message.createDate).format('HH:mm:ss')}
                    isMe={message.sender === memberCode}
                />
            ))}
            {/*<Message message={data[0].message} sender={data[0].message} createDate={data[0].createDate} isMe={false} />*/}
            {/*<Message message={data[1].message} sender={data[1].message} createDate={data[1].createDate} isMe={true} />*/}
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
    const dispatch = useDispatch();
    const getMessage = useSelector(state => state.chatReducer[GET_MESSAGE]);

    const {curState, setCurState} = useContext(ChatContext);
    const [message, setMessage] = useState({});
    const memberCode = JSON.parse(localStorage.getItem("authToken")).memberCode;

    const client = useContext(SocketContext);
    useEffect(() => {
        setMessage({...message, sender: memberCode})
    }, []);

    const onChange = e => {
        setMessage({...message, [e.target.name]: e.target.value});
        textArea.current.style.height = '30px';
        textArea.current.style.height = textArea.current.scrollHeight + 'px';
    }

    const onSubmit = () => {
        sendMessage({receiver: curState.chatRoomCode, message: message})
    }

    const sendMessage = ({receiver, message}) => {
        message['chatRoomNo'] = receiver;
        message['createDate'] = dayjs().format('YYYY-MM-DDTHH:mm:ss');

        client.publish({
            destination: `/pub/chat/${receiver}`,
            body: JSON.stringify(message)
        });

        dispatch(dispatch => {
            dispatch({type: GET_MESSAGE ,payload: [...getMessage, message] })
        })

        setMessage({...message, message: ''});

    }

    return (
        <div className={styles.inputContainer}>
            <textarea
                ref={textArea}
                className={styles.input}
                name={'message'}
                rows={1}
                value={message.message}
                onChange={onChange} />
            <button className={styles.submitBtn} onClick={onSubmit}>
                <span className={meterialIcon.meterialIcon} style={{letterSpacing: 0}}>arrow_upward</span>
            </button>
        </div>
    )
}