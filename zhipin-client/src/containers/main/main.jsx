/*
* 主要页面
* */
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import LanBanInfo from '../lanbanInfo/lanbaninfo'
import DashenInfo from '../dashenInfo/dashenInfo'
import Cookies from 'js-cookie'
import {RedirectTo} from '../../utils'
import {connect} from 'react-redux'
import Laoban from "../laoban/laoban";
import Chat from '../chat/chat'
import Dashen from "../dashen/dashen";
import Personal from "../personal/personal"
import Message from "../message/message"
import NotFound from "../../components/not-found/not-found";
import NavFooter from '../../components/nav-footer/navFooter'
import {NavBar} from 'antd-mobile'
import {getUser} from '../../redux/action'

class Main extends Component {
    componentDidMount() {
        let user_id = Cookies.get('user_id');
        let {id} = this.props;
        //如果没有 user id则不会进入到啊这里面
        //如果有cookie并且没id说明要自动登录了
        if (user_id && !id) {
            //重新渲染render 这时候!user_id不会进去
            //id也有值了
            //就会进去渲染了
            //如果点的是登陆也会到这里面
            //这时候cookie会有，user的id也会有，就会判断路径所以走了最后的渲染路由
            this.props.getUser()
        }
        //先拿到id
    }

    navList = [
        {
            title: '老板列表',
            icon: 'dashen',
            component: Laoban,
            text: '老板',
            path: '/laoban',
            hidden: false
        },
        {
            title: '大神列表',
            icon: 'laoban',
            component: Dashen,
            text: '大神',
            path: '/dashen',
            hidden: false
        },
        {
            title: '消息列表',
            icon: 'message',
            component: Message,
            text: '消息',
            path: '/message',
            hidden: false
        },
        {
            title: '个人信息',
            icon: 'personal',
            component: Personal,
            text: '个人信息',
            path: '/personal',
            hidden: false
        },
    ];

    render() {
        // const {user_id} = localStorage.getItem('user_id')
        //先拿到cookie里的id
        let user_id = Cookies.get('user_id');
        //如果没有送你去登陆
        if (!user_id) {
            return <Redirect to='/login'/>
        } else {
            //看看user=里的id又没有
            let {id} = this.props.user;
            //这说明开始已经登陆过了就要计算一个新路径
            if (id) {
                let {type, header} = this.props;
                let path = this.props.location.pathname;
                //拿到当前的路径
                //不是访问跟路径就会不管
                if (path === '/') {
                    path = RedirectTo({type, header});
                    return <Redirect to={path}/>
                }
            } else {
                //如果没有的话会去componentDidMount
                return null;
            }
        }

        const {navList} = this;
        //查询有没有对应的路径，如果匹配上了则显示NavBar  因为不是所有的路由组件都需要头顶的navBar
        let current = navList.find(nav => nav.path === this.props.location.pathname);
        //如果找到的话就判断当前的类型
        if (current) {
            if (this.props.user.type === 'dashen') {
                navList[0].hidden = true;
            } else {
                navList[1].hidden = true;
            }
        }
        return (
            <div>
                {current && <NavBar className='fixed-header'>{current.title}</NavBar>}
                <Switch>
                    {/*映射路由*/}
                    {navList.map(nav => (
                        <Route key={nav.path} path={nav.path} component={nav.component}/>
                    ))}
                    <Route path='/laobaninfo' component={LanBanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/chat/:user_id' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {current && <NavFooter navList={navList}
                                       counter={this.props.chat.unReadCount}
                />}
            </div>

        )
    }
}

export default connect(state => (
    {user: state.user, chat: state.chat}
), {getUser})(Main)