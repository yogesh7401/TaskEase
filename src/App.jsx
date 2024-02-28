import { useState } from "react";
import TaskDashboard from "./components/Dashboard/TaskDashboard";
import Header from "./components/Header";

export default function App() {
  const [ toggle, setToggle ] = useState(false)
  return (
    <div className="min-h-screen">
      <Header toggle={toggle} setToggle={setToggle}/>
      <TaskDashboard toggle={toggle} setToggle={setToggle}/>
    </div>
  )
}