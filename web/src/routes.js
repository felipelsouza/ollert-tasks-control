import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Home from './pages/Home';
import Register from './pages/Register';
import ProjectsList from './pages/ProjectsList';
import NotFound from './pages/NotFound';
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import Profile from './pages/Profile';

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
            <Route path="/" exact component={isAuthenticated() ? ProjectsList : Home} />
            <Route path="/singup" component={isAuthenticated() ? ProjectsList : Register} />
            <PrivateRoute path="*" component={NotFound} />
            <PrivateRoute path="/app" component={ProjectsList} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/new-project" component={CreateProject} />
            <PrivateRoute path="/project/:id" component={Project} />
        </Switch>
    </BrowserRouter>
);

export default Routes;