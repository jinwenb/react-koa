import React, {Component} from 'react';
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getLastMsg = (message) => {
        // 第一步保存分组的结果
        let lastMsgObj = {};
        message.forEach(msg => {
            //统计有几条消息
            let last = lastMsgObj[msg.chat_id];
            // 判断有没有值
            let count = !msg.readCount ? 1 : 0;
            if (!last) {
                lastMsgObj[msg.chat_id] = msg;
            } else {
                if (msg.create_time > last.create_time) {
                    lastMsgObj[msg.chat_id] = msg;
                }
            }
        });
        let lastMessags = Object.values(lastMsgObj);
        lastMessags.sort((a, b) => b.create_time - a.create_time);
        return lastMessags
    };

    render() {
        const {user, chat} = this.props;
        let {message, users} = chat;
        let messages = message.filter(
            msg => msg.user_from === user.id ||
                msg.user_to === user.id);
        //获取最后的消息

        const lastMessags = this.getLastMsg(messages);
        let counter = (user_to, user_from) => {
            let targetId = [user_to, user_from].sort().join('_');
            let msg = message.filter(msg => msg.chat_id === targetId)
            let count = msg.reduce((a, b) => {
                if (!b.readCount) {
                    return a += 1
                } else {
                    return a += 0
                }
            }, 0);
            return count
        }
        return (
            <List style={{marginTop: 50}}>
                <QueueAnim type='top'>
                    {lastMessags.map(msg => {
                        const lastId = msg.user_to === user.id ? msg.user_from : msg.user_to;
                        return (
                            <Item
                                onClick={() => {
                                    this.props.history.push(`chat/${lastId}`)
                                }}
                                key={msg._id}
                                extra={counter(msg.user_to, msg.user_from) > 0 ?
                                    <span style={{color: 'blue'}}>counter(msg.user_to, msg.user_from)</span> : null}
                                thumb={users[lastId] && users[lastId].header && require(`../../assets/images/${users[lastId].header}.png`)}
                            >

                                {users[lastId] && users[lastId].username}: {msg.content}
                            </Item>)
                    })}
                </QueueAnim>
            </List>


        )
    }
}

export default connect(state => (
    {
        user: state.user,
        chat: state.chat
    }), {})(Message)