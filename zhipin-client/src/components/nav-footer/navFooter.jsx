import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'

const Item = TabBar.Item;

class NavFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {navList, counter} = this.props;
        navList = navList.filter(nav => !nav.hidden);
        return (
            <TabBar>

                {navList.map(nav => {
                    return (<Item
                        title={nav.text}
                        key={nav.path}
                        icon={{uri: require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                        selected={this.props.location.pathname === nav.path}
                        onPress={() => {

                            this.props.history.replace(nav.path)
                        }}
                    />)
                })}
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)