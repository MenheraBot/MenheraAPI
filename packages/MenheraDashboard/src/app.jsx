import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ActivitiesContextProvider } from './context/ActivitiesContext'
import DashboardPage from './routes/dashboard/index'

const App = () => {
    return (
        <ActivitiesContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={DashboardPage} />
                    </Switch>
                </Router>
            </div>
        </ActivitiesContextProvider>

    )
}

export default App;