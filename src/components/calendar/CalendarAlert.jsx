import styles from './calendarAlert.module.css';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

const CalendarAlert = ({profile, message, startDate, endDate, onClick}) => {

    const errorImgHandler = e => {
        e.target.src = '/img/user.jpg';
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <div>
                <img src={profile} onError={errorImgHandler}/>
            </div>
            <div>
                <div>{message}</div>
                <div>{`${dayjs(startDate).format("YY-MM-DD HH:mm")} ~ ${dayjs(endDate).format("YY-MM-DD HH:mm")}`}</div>
            </div>
        </div>
    )
}

export default CalendarAlert;