/*
* 注册页面
* */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {register} from '../../redux/action'
import {Redirect} from 'react-router-dom';
import {
    WhiteSpace,
    WingBlank,
    List,
    Radio,
    InputItem,
    NavBar,
    Button,
} from 'antd-mobile'
import Logo from '../../components/logo/logo'


const ListItem = List.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            type: 'laoban'
        }
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    };
    register = () => {
        this.props.register(this.state)
    };
    login = () => {
        this.props.history.replace('/login')
    };

    render() {
        const {type} = this.state;
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
                    <InputItem
                        onChange={val => this.handleChange('password2', val)}
                        type='password'
                        placeholder='请确认密码'
                    >确认密码:</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>类型:</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'dashen'}
                               onChange={val => this.handleChange('type', 'dashen')}>大神:</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'laoban'}
                               onChange={val => this.handleChange('type', 'laoban')}>老板:</Radio>
                    </ListItem>
                    <Button onClick={this.register} type='primary'>注册</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button onClick={this.login}>已有账户</Button>
                </WingBlank>

            </List>
        )
    }
}

export default connect(state => state.user,
    {register}
)(Register)