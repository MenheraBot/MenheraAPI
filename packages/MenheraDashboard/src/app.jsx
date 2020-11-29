import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/index';
import './styles/global.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={DashboardPage} />
    </Switch>
  </Router>
);

export default App;
