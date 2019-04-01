import React, {Component} from 'react';
import {InputItem, Result, WhiteSpace, List, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import jsCookie from 'js-cookie'
import {result_error} from '../../redux/action'

class Personal extends Component {
    handleClick = () => {
        Modal.alert('退出', '您确认退出', [
            {text: '取消'}, {
                text: '确定',
                onPress: () => {
                    jsCookie.remove('user_id');
                    this.props.result_error()
                }
            }
        ])
    };

    render() {
        let {header, post, info, company, username, salary} = this.props;
        return (
            <div style={{marginTop: 50, marginBottom: 50}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} className="spe am-icon am-icon-md"
                              alt=""/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <InputItem placeholder={post}> 职位: </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        placeholder={info}> 简介: </InputItem>
                    <WhiteSpace/>
                    {salary && <InputItem
                        placeholder={salary}
                    >薪资</InputItem>}
                    <WhiteSpace/>
                </List>

                <Button type='warning' onClick={this.handleClick}>点击退出</Button>
            </div>
        )
    }
}

export default connect(state => state.user, {result_error})(Personal)