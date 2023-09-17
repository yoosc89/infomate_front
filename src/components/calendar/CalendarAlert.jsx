import styles from './calendarAlert.module.css';

const CalendarAlert = ({profile, message, createDate, onClick}) => {

    return (
        <div className={styles.container} onClick={onClick}>
            <div>
                <img src={profile}/>
            </div>
            <div>
                <div>{message}</div>
                <div>{createDate}</div>
            </div>
        </div>
    )
}

export default CalendarAlert;