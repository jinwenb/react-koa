import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserList from '../../components/userList/user-list'
import {GetUserList} from '../../redux/action'

class Laoban extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.GetUserList('dashen')
    }

    render() {
        const userList = this.props.userList;
        return (
            <div style={{marginTop: 50, marginBottom: 50}}>
                <UserList userList={userList}/>
            </div>
        )
    }
}

export default connect(state => ({userList: state.userList}), {GetUserList})(Laoban)