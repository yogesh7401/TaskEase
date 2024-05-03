import { useState } from "react"
import Header from "../Header"
import TaskDashboard from "../Pages/TaskDashboard"

export default function Layout() {
    const [ toggle, setToggle ] = useState(false)

    return <div className="min-h-screen">
        <Header toggle={toggle} setToggle={setToggle}/>
        <TaskDashboard toggle={toggle} setToggle={setToggle}/>
    </div>
}