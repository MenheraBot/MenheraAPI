import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/index';
import globalStyle from './styles/globalStyle';

const App = () => (
  <globalStyle>
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </Router>
  </globalStyle>
);

export default App;
