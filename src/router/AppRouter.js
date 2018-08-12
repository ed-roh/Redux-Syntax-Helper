import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import App from '../components/App/App';
import Help from '../components/Help';
import About from '../components/About';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/help" component={Help} />
                <Route path="/about" component={About} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;