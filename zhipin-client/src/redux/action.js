import {
    AUTO_SUCCESS, ERROR_MSG,
    RESULT_ERROR,
    RESULT_SUCCESS,
    USER_LIST,
    CHAT_MSG,
    ADD_MSG,
    CHAT_COUNTER,
} from './action-type'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatList,
    reqChatCounter
} from '../axios'
import io from 'socket.io-client';

let socket = io('ws://localhost:8080');
const auto_success = (user) => ({type: AUTO_SUCCESS, data: user});
const error_msg = (msg) => ({type: ERROR_MSG, data: msg});
const result_success = (user) => ({type: RESULT_SUCCESS, data: user});
export const result_error = (msg) => ({type: RESULT_ERROR, data: msg});
const req_User_List = (data) => ({type: USER_LIST, data: data});
const chat_msg = (data) => ({type: CHAT_MSG, data: data});
const add_msg = (data) => ({type: ADD_MSG, data: data});
const chat_counter = ({count,user_from}) => ({type: CHAT_COUNTER, data:{count,user_from}});


//初始化io

function initIo(dispatch, user_id) {
    if (!io.socket) {
        io.socket = socket.on('sendMsg', data => {
            if (data.user_from === user_id || data.user_to === user_id) {
                data.user_id = user_id;
                dispatch(add_msg(data))
            }
        })
    }
}

export function sendMsg({user_from, user_to, content}) {
    return dispatch => {
        io.socket.emit('message', {user_from, user_to, content})

    }
}

//获取消息列表
async function getMsgList(dispatch, user_id) {
    initIo(dispatch, user_id);
    let response = await  reqChatList();
    let result = response.data;
    if (!result.code) {
        result.data.user_id = user_id;
        dispatch(chat_msg(result.data))
    }
}

//登陆的函数
export function register(user) {
    let {username, password, password2} = user;
    //如果验证不通过则返回一个普通的action
    if (!username) {
        return error_msg('请输入用户名')
    } else if (password !== password2) {
        return error_msg('2次密码不一致')
    }
    return async dispatch => {
        let response = await  reqRegister(user);
        let result = response.data;
        if (result.code) {
            dispatch(error_msg(result.msg))
        } else {
            //在注册成功的时候就开hi监听了socket
            // 获取到消息数据

            getMsgList(dispatch, result.data.id)
            dispatch(auto_success(result.data))
        }
    }
}

//登陆的函数
export function login(user) {
    let {username, password} = user;
    if (!username) {
        return error_msg('用户名为空')
    } else if (!password) {
        return error_msg('密码为空')
    }
    return async dispatch => {
        let response = await reqLogin(user);
        let result = response.data;
        if (result.code) {
            dispatch(error_msg(result.msg))
        } else {
            //在登陆成功的时候就开hi监听了socket
            // 获取到消息数据
            getMsgList(dispatch, result.data.id);
            dispatch(auto_success(result.data))
        }
    }
}

//更新的函数
export function updateUser(user) {
    return async dispatch => {
        let response = await  reqUpdateUser(user);
        let result = response.data;
        if (result.code) {
            dispatch(result_error(result.msg))
        } else {
            //在修改的时候就开hi监听了socket
            // 获取到消息数据

            dispatch(result_success(result.data))
        }
    }
}

//获取信息
export function getUser() {
    return async dispatch => {
        let response = await reqUser();
        let result = response.data;
        if (result.code) {
            dispatch(result_error(result.msg))
        } else {
            getMsgList(dispatch, result.data.id);
            dispatch(result_success(result.data))
        }
    }
}

//显示列表
export function GetUserList(type) {
    return async dispatch => {
        let response = await  reqUserList(type);
        let result = response.data;
        if (!result.code) {
            dispatch(req_User_List(result.data))
        }
    }
}
//清楚未读数量
export function updataChatCounter({user_from}) {
    return async dispatch=>{
        let response = await  reqChatCounter({user_from})
        let result  = response.data;
        if(result.code===0){
               dispatch(chat_counter({count:result.data,user_from}));
        }
    }
}






