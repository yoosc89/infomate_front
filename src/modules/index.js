import { combineReducers } from "redux";
import contactReducer from "./ContactModule";
import scheduleReducer from "./ScheduleMoudule";
import favCalendarReducer from './FavCalendarMoudule';
import mailReducer from "./MailModule";
import boardReducer from './BoardModule';
import memberReducer from "./MemberModule";
import documentsReducer from "./approval/DocumentModuels";
import calendarReducer from "./CalendarMoudule";
import departmentReducer from "./DepartmentModule";
import approvalReducer from "./approval/ApprovalModuels";
import fileReducer from "./FileModule";
import employeeReducer from "./EmployeeModule";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import homeMainReducer from "./HomeModules";
import registMemberReducer from "./MemberRegisterModule";
import memberMailReducer from "./MemberMailModule";
import mailTrashReducer from "./MailTrashModule";
import workReducer from "./WorkModule";
import chatReducer from "./ChatMoudule";

const rootReducer = combineReducers({
    favCalendarReducer,
    scheduleReducer,
    mailReducer,
    boardReducer,
    contactReducer,
    calendarReducer,
    documentsReducer,
    departmentReducer,
    approvalReducer,
    fileReducer,
    employeeReducer,
    memberReducer,
    registMemberReducer,
    homeMainReducer,
    memberMailReducer,
    mailTrashReducer,
    workReducer,
    chatReducer
});


const persistConfig = {
    key: "root",
    storage: storage,
    blacklist:["memberReducer"]
};


export default persistReducer(persistConfig, rootReducer);
