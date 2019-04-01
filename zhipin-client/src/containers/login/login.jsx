/*
* 登陆登陆
* */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {login} from '../../redux/action'
import {Redirect} from 'react-router-dom';
import {
    WhiteSpace,
    WingBlank,
    List,
    InputItem,
    NavBar,
    Button,
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    };
    register = () => {
        this.props.history.replace('/register')
    };
    loginTo = () => {
        this.props.login(this.state)
    };

    render() {
        const {msg, redirect} = this.props;
        //如果成功了则直接去了主界面
        if (redirect) {
            return <Redirect to={redirect}/>
        }
        return (
            <List>
                <NavBar>彬彬直聘</NavBar>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    {msg && <div className='error_msg'>{msg}</div>}
                    <InputItem
                        placeholder='请输入用户名'
                        onChange={val => this.handleChange('username', val)}>
                        用户名:
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        placeholder='请输入密码'
                        onChange={val => this.handleChange('password', val)
                        }
                        type='password'
                    >密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button onClick={this.loginTo} type='primary'>登陆</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button onClick={this.register}>去注册</Button>
                </WingBlank>

            </List>
        )
    }
}

export default connect(state => state.user,
    {login}
)(Login)