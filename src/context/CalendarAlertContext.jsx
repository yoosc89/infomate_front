import {createContext, useState} from "react";

export const CalednarAlertContext = createContext({});

export const CalendarAlertProvider = ({children}) => {
    const [calendarAlert, setCalendarAlert] = useState({});

    return(
        <CalendarAlertContext.Provider value={{calendarAlert, setCalendarAlert}}>
            {children}
        </CalendarAlertContext.Provider>
    )
}