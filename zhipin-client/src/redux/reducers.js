import {combineReducers} from 'redux'
import {
    AUTO_SUCCESS, ERROR_MSG,
    RESULT_ERROR,
    RESULT_SUCCESS,
    USER_LIST,
    ADD_MSG,
    CHAT_MSG,
    CHAT_COUNTER,
} from './action-type'
/*
* 登陆或者注册的处理函数
*
* */
import {RedirectTo} from '../utils'

let initUser = {
    username: '',
    type: '',
    msg: '',
    id: '',
    redirect: ''  //成功后要走的路径
};

export function user(state = initUser, action) {
    switch (action.type) {
        case AUTO_SUCCESS:
            let {type, header} = action.data;
            return {...action.data, redirect: RedirectTo({type, header})};
        case ERROR_MSG:
            return {...state, msg: action.data, redirect: ''};
        case RESULT_SUCCESS:
            //如果成功了则直接返回了全部的状态
            return action.data;
        case RESULT_ERROR:
            //这时候把所有的数据全部清空
            return {...initUser, msg: action.data};
        default:
            return state
    }
}

/*
*
* 显示消息列表的reducer
* */
const initUserList = [];

export function userList(state = initUserList, action) {
    switch (action.type) {
        case USER_LIST:
            return action.data;
        default:
            return state
    }
}

let initChat = {
    message: [],
    users: {},
    unReadCount: 0
};

//消息列表的reducers
export function chat(state = initChat, action) {

    switch (action.type) {
        case CHAT_MSG:
            const {message, users, user_id: id} = action.data;
            let counter = message.reduce((a, b) => {
                if (b.user_to === id || b.user_from === id) {
                    return a += (!b.readCount ? 1 : 0)
                } else {
                    return a += 0
                }
            }, 0);
            return {
                message, users,
                unReadCount: counter
            };
        case ADD_MSG:
            return {
                users: state.users,
                unReadCount: (!action.data.readCount ? 1 : 0) + state.unReadCount,
                message: [...state.message, action.data],

            };
        case CHAT_COUNTER:
            let {count, user_from} = action.data;
            return {
                users: state.users,
                unReadCount: state.unReadCount - count,
                message: state.message.map(msg => {
                    if (msg.chat_id === user_from && !msg.readCount) {
                        return {...msg, readCount: 1}
                    } else {
                        return {...msg}
                    }
                }),
            };
            default:
            return state;
    }
}

export default combineReducers({
    user,
    userList,
    chat,
})