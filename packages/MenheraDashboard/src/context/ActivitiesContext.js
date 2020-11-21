import React, { useState, createContext } from "react"

export const ActivitiesContext = createContext();

export const ActivitiesContextProvider = props => {
    const [activities, setActivities] = useState([])

    const addActivities = (activity) => {
        setActivities([...activities, activity])
    }

    return (
        <ActivitiesContext.Provider value={{ activities, setActivities, addActivities }}>
            {props.children}
        </ActivitiesContext.Provider>
    )
}