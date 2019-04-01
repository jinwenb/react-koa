/*
* 大神信息完善界面
* */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavBar, TextareaItem, InputItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/action'
import {Redirect} from 'react-router-dom'

class DashenInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            info: '',
            post: '',
        }
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    };
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    };
    save = () => {
        this.props.updateUser(this.state);

    };

    render() {
        const {type, header} = this.props;
        //如果头部有值说明已经更新过了
        if (header) {
            return <Redirect to={type}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem
                    placeholder='请输入求职岗位'
                    onChange={val => this.handleChange('post', val)}
                >求职岗位</InputItem>
                <TextareaItem title='个人介绍'
                              placeholder='个人介绍'
                              onChange={val => this.handleChange('info', val)}
                              rows={3}/>
                <Button type='primary'
                        onClick={this.save}
                >保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(state => state.user,
    {updateUser}
)(DashenInfo)