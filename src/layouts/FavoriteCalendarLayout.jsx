import CalendarManageFavoriteNavbar from '../components/calendar/manage/CalendarManageFavoriteNavbar'
import CalendarMagnageFavoriteFollowerHeader from '../components/calendar/manage/CalendarMagnageFavoriteFollowerHeader';
import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';

export const ManageChkList = createContext(null);    

const FavoriteCalendarLayout = () => {

    const [chk ,setChk] = useState({
        itemAll: false,
        selectList: [],
    })
     let df=[1,2]
    return (
        <>
            <ManageChkList.Provider value={{chk, setChk}} >
                <CalendarManageFavoriteNavbar />
                <br/>
                <CalendarMagnageFavoriteFollowerHeader />
                <br/>
                <Outlet />
            </ManageChkList.Provider>
        </>
    );
}

export default FavoriteCalendarLayout;