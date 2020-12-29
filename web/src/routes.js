import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Home from './pages/Home';
import Register from './pages/Register';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated()
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        }
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={isAuthenticated() ? Projects : Home} />
            <Route path="/singup" component={isAuthenticated() ? Projects : Register} />
            <PrivateRoute path="/app" component={Projects} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;