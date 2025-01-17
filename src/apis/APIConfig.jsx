export const SERVER_IP = process.env.REACT_APP_SPRINGBOOT_SERVER_IP;
export const SERVER_PORT = process.env.REACT_APP_SPRINGBOOT_SERVER_PORT;
export const PROTOCOL = process.env.REACT_APP_SPRINGBOOT_SERVER_PROTOCOL;

export const CHAT_SERVER = process.env.REACT_APP_CHATSERVER;

export const SOCKET = process.env.REACT_APP_SOCKET;
export const Pageable = ({page, size, sortId, sortDirection}) => {
    if(sortId && !sortDirection || !sortId && sortDirection) 
        return console.log(`sortId : ${sortId}, sortDirection : ${sortDirection} 존재 하지 않는 값이 있습니다.`);
    const pageOption = `page=${page}&size=${size}`
    const sort = (sortId && sortDirection) && `sort=${sortId},${sortDirection}`;
    return {pageOption: pageOption, sort: sort}
}
