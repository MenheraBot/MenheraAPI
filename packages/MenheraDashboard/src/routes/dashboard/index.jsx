import React from 'react'
import ActivityList from '../../components/activities/ActivityList'
import ActivityManager from '../../components/activities/ActivityManager'

import Header from "../../components/Header"

import "./style.css"

const DashboardPage = () => {
    return (
        <div>
            <Header />
            <div className="activity-container">
                <ActivityManager />
                <ActivityList />
            </div>
        </div>
    )
}

export default DashboardPage
