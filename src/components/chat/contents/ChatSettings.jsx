import styles from './chatSettings.module.css';
import meterialIcon from '../../common/meterialIcon.module.css';
import {useState} from "react";

const ChatSettings = () => {
    const setting = [
        {subject: '채팅관리', options: [
            {text: '채팅방관리1-text1',chk: false},
            {text: '채팅방관리2-text1',chk: false},
            {text: '채팅방관리3-text1',chk: false},
            {text: '채팅방관리4-text1',chk: false}]
        },
        {subject: '그룹관리', options: [
                {text: '그룹관리1-text1',chk: false},
                {text: '그룹관리2-text1',chk: false},
                {text: '그룹관리3-text1',chk: false},
                {text: '그룹관리4-text1',chk: false}]
        },
    ]


    const onChangeOptionHandler = (e) => {

    }

    return (
        <div>
            {
                setting.map(setting =>
                    <ChatSubject
                        text={setting.subject}
                        options={setting.options}
                    />
                )
            }
        </div>
    )
}

export default ChatSettings;

const ChatSubject = ({text, options}) => {

    const [optionView, setOptionView ] = useState(true);

    const optionViewChangeHandler = () => {
        setOptionView(!optionView)
    }

    return (
        <div>
            <button className={styles.subject} onClick={optionViewChangeHandler}>
                <div>
                    {text}
                </div>
                <div className={meterialIcon.meterialIcon}>
                    { optionView ? 'arrow_drop_down' : 'arrow_drop_up' }
                </div>
            </button>
            <div className={[optionView && styles.noneView].join(' ')}>
                {
                    options.map(option =>
                        <ChatItem
                            text={option.text}
                            chk={option.chk}
                        />
                    )
                }
            </div>
        </div>
    )
}

const ChatItem = ({text, chk, onChange}) => {
    return (
        <div className={styles.itemContainer}>
            <div>
                {text}
            </div>
            <div className={styles.chk}>
                <input className={styles.inputChk} type={"checkbox"} defaultChecked={chk} onChange={onChange} />
            </div>
        </div>
    )
}