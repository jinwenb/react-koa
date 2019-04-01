import ajax from './ajax';
//注册异步方法
export const reqRegister = (user) => ajax('/register', user, 'post');
//登陆异步方法
export const reqLogin = (user) => ajax('/login', user, 'post');
//异步更新user方法
export const reqUpdateUser = (user) => ajax('/update', user, 'post');
//请求所有的值
export const reqUser = () => ajax('/main');
export const reqUserList = (type) => ajax('/getUserList', {type});
export const reqChatList = () => ajax('/chat/msgList');
export const reqChatCounter = ({user_from}) => ajax('/chat/counter',{user_from},'post')

