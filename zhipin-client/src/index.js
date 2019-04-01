import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./containers/login/login";
import Main from "./containers/main/main";
import Register from "./containers/register/register";
import store from './redux/index'
import {Provider} from 'react-redux'
import './assets/css/index.less'
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route component={Main}/>
            </Switch>
        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));