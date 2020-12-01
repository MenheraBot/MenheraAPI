import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/index';
import {StoreProvider} from './store/AuthContext';
import './styles/global.css';

const App = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default App;
