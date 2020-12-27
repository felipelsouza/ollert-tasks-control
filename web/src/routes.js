import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Projects from './pages/Projects';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/singup" component={Register} />
                <Route path="/app" exact component={Projects} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;