import React, {Component} from 'react';
import {connect} from 'react-redux'
import {List, InputItem, NavBar, Grid, Icon} from 'antd-mobile'
import {sendMsg, updataChatCounter} from '../../redux/action'
import QueueAnim from 'rc-queue-anim';
const Item = List.Item;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {content: '', isShow: false}
    }

    componentWillMount() {
        const emojis = ['😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍',
            '😀', '😛', '🤠', '😍'
        ];
        this.emoji = emojis.map(item => ({text: item}))
    }

    handleClick = () => {
        let {content} = this.state;
        const user_from = this.props.user.id;
        const user_to = this.props.match.params.user_id;
        content = content.trim();
        if (content) {
            this.props.sendMsg({content, user_from, user_to})
        }
        this.setState({content: '', isShow: false})

    };

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
        //处理以读取消息
        const targetId = this.props.user.id;
        const user_to = this.props.match.params.user_id;
        let user_from = [targetId, user_to].sort().join('_');
        this.props.updataChatCounter({user_from});
    }
    componentWillUnmount(){
        const targetId = this.props.user.id;
        const user_to = this.props.match.params.user_id;
        let user_from = [targetId, user_to].sort().join('_');
        this.props.updataChatCounter({user_from})
    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    toggleClick = () => {
        let isShow = !this.state.isShow;
        this.setState({isShow});
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    };

    render() {
        let {chat} = this.props;
        let {message, users} = chat;
        const user_from = this.props.user.id;
        const user_to = this.props.match.params.user_id;
        if (!users[user_from]) {
            return null;
        }
        let chat_id = [user_from, user_to].sort().join('_');
        let msgs = message.filter(msg => msg.chat_id === chat_id);
        let target = users[user_to];
        const header = target.header && require(`../../assets/images/${target.header}.png`)
        return (
            <div >
                <NavBar
                    onLeftClick={() => this.props.history.goBack()}
                    className='nav-bar'
                    icon={<Icon type="left"/>}
                >{users[user_to].username}</NavBar>
                <List style={{marginBottom: '50px', marginTop: '50px'}}>
                    <QueueAnim type='left'>
                    {msgs.map((list) => {
                        //如果这个值是等于
                        if (list.user_from === user_to) {
                            return (<Item
                                key={list._id}
                                thumb={header}
                            >
                                {list.content}
                            </Item>)
                        } else {
                            return (<Item
                                key={list._id}
                                extra={<span>我说</span>}
                            >
                                {list.content}
                            </Item>)
                        }
                    })}
                    </QueueAnim>

                </List>
                <span style={{position: 'fixed', width: "100%", bottom: 0}}>
                      <InputItem
                          onFocus={() => {
                              this.setState({isShow: false})
                          }}
                          placeholder='请输入'
                          value={this.state.content}
                          onChange={val => this.setState({content: val})}
                          extra={
                              <span>
                                   <span
                                       onClick={this.toggleClick}
                                       style={{marginRight: '5px'}}>😄
                                   </span>
                              <span
                                  onClick={this.handleClick}
                              >点击</span>
                              </span>

                          }
                      />
                    {this.state.isShow && <Grid
                        data={this.emoji}
                        columnNum={8}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={(item) => {
                            this.setState({content: this.state.content + item.text})
                        }}
                    />}
                </span>


            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat, counter: state.counter}),
    {sendMsg, updataChatCounter}
)(Chat)