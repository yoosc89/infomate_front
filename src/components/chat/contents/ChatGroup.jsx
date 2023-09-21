import {useDispatch, useSelector} from "react-redux";
import {GET_PART_LIST} from "../../../modules/ScheduleMoudule";
import {useEffect, useState} from "react";
import {getParticipantList} from "../../../apis/DepartmentAPI";
import {LoadingSpiner} from "../../common/other/LoadingSpiner";
import meterialIcon from '../../common/meterialIcon.module.css';
import styles from './chatGroup.module.css'

const ChatGroup = () => {

    const getMembers = useSelector(state => state.scheduleReducer[GET_PART_LIST])
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getParticipantList());
    },[])

    if(!getMembers) return <LoadingSpiner />
    console.log(getMembers.data)

    return (
        <div>
            {
                getMembers.data.map(dept =>
                    <Groups
                        index={dept.deptCode}
                        deptCode={dept.deptCode}
                        deptName={dept.deptName}
                        members={dept.members}
                    />
                )
            }
        </div>
    )
}

export default ChatGroup;

const Groups = ({deptCode, deptName, members}) => {

    const [memberView, setMemberView] = useState(true);
    const memberViewChangeHandler = () => {
        setMemberView(!memberView);
    }

    return (
        <div>
            <button className={styles.groupSubject} onClick={memberViewChangeHandler}>
                <div>
                    {deptName}
                </div>
                <div>
                    <span className={meterialIcon.meterialIcon}>
                        { memberView ? 'arrow_drop_down' : 'arrow_drop_up' }
                    </span>
                </div>
            </button>
            <div className={[styles.groupMember, memberView && styles.memberNoneView].join(' ')}>
                {members.map(member =>
                    <Member
                        index={member.memberCode}
                        memberCode={member.memberCode}
                        memberName={member.memberName}
                    />
                )}
            </div>
        </div>
    )
}

const Member = ({memberName, memberCode}) => {

    return (
        <button className={styles.memberContainer}>
            <div>
                <img className={styles.memberProfile} src="/img/user.jpg" onError={(e)=> e.src='/img/user.jpg'}/>
            </div>
            <div>
                {memberName}
            </div>
        </button>
    )
}