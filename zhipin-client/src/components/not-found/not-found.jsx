import React, {Component} from 'react';
import {Button} from 'antd-mobile'

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <p>抱歉该也买你找不到</p>
                <Button onClick={() => this.props.history.replace('/')}/>
            </div>
        )
    }
}