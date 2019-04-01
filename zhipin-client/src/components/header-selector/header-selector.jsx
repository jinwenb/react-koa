import React, {Component} from 'react';
import propTypes from 'prop-types'
import {List, Grid} from 'antd-mobile'

export default class headerSelector extends Component {
    static propTypes = {
        setHeader: propTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.listGroup = [];
        this.state = {
            icon: ''   //用来保存头像
        };
        for (let i = 0; i < 20; i++) {
            this.listGroup.push({
                text: `头像${i + 1}`,
                icon: require(`../../assets/images/头像${i + 1}.png`)
            })

        }
    }

    handleClick = ({icon, text}) => {
        this.setState({
            icon
        });
        this.props.setHeader(text);
    };

    render() {
        let listHeader = '';
        let {icon} = this.state;
        listHeader = icon ? (
            <div>
                已选择头像
                <img src={icon} alt=""/>
            </div>
        ) : '请选择头像';
        return (
            <List renderHeader={listHeader}>
                <Grid data={this.listGroup}
                      columnNum={5}
                      onClick={this.handleClick}
                />
            </List>
        )
    }
}