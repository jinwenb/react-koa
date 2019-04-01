import React, {Component} from 'react';
import {Card, InputItem, WhiteSpace, List, WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {userList} = this.props;
        return (
            <WingBlank>
                <QueueAnim type='left'>
                {userList.map(user => (
                    <Card key={user.id}
                          onClick={() => this.props.history.push(`/chat/${user.id}`)}
                    >
                        <Card.Header
                            title={user.username}
                            thumb={user.header&&require(`../../assets/images/${user.header}.png`)}
                            message={user.company}
                        />
                        <Card.Body>
                            <List>
                                <InputItem placeholder={user.post}> 职位 : </InputItem>
                                <WhiteSpace/>
                                <InputItem placeholder={user.info}> 简介 : </InputItem>
                                <WhiteSpace/>
                                {user.salary && <InputItem placeholder={user.salary}> 薪资: </InputItem>}
                            </List>

                        </Card.Body>
                    </Card>

                ))}
                </QueueAnim>
            </WingBlank>


        )
    }
}

/*
*
*
* */
export default withRouter(UserList)
