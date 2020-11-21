import React, { useContext, useState } from 'react'
import FetchActivities from "../../apis/FetchActivities"
import { ActivitiesContext } from '../../context/ActivitiesContext'
import { token } from "../../config.json"

import "./ActivityManager.css"

const ActivityManager = () => {
    const { addActivities } = useContext(ActivitiesContext)
    const [name, setName] = useState("")
    const [type, setType] = useState("")

    const config = {
        headers: {
            token
        }
    }

    const handlePut = () => {
        FetchActivities.put("/", { name, type }, config).catch()
    }

    const handleDelete = () => {
        FetchActivities.delete("/", { name, type }, config).catch()
    }

    const handleSubmit = async () => {
        FetchActivities.post("/", { name, type }, config).catch()
        addActivities(name, type)
    }
    return (
        <div className="activity-manager">
            <main>
                <div className="delete">
                    <form>
                        <button onClick={handleDelete} className="botao" type="submit">LIMPAR ACTIVITIES</button>
                    </form>
                </div>
                <br />
                <div className="put">
                    <form>
                        <button onClick={handlePut} className="botao" type="submit">RESETAR ACTIVITIES</button>
                    </form>
                </div>
                <br />
                <div className="post">
                    <form>
                        <input className="botao" required="required" type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                        <select value={type} onChange={e => setType(e.target.value)} className="botao" name="type" id="type">
                            <option value="PLAYING">Playing</option>
                            <option value="WATCHING">Watching</option>
                            <option value="STREAMING">Streaming</option>
                            <option value="LISTENING">Listening</option>
                        </select>
                        <br /><br /><br />
                        <button onClick={handleSubmit} className="botao" type="submit">POST ACTIVITY</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default ActivityManager
