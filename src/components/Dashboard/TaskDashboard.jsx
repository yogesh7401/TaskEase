import { useState } from "react";
import NewTask from "../Tasks/NewTask";
import AllTask from "../Tasks/AllTask";
import TaskMenu from "../Tasks/TaskMenu";
import ImportantTask from "../Tasks/ImportantTask";

export default function TaskDashboard() {

  const [ selectedItem, setSelectedItem ] = useState("New")

  function renderPage(menu) {
    switch (menu) {
      case "New":
        return <NewTask />
      case "All":
        return <AllTask />
      case "Important":
        return <ImportantTask />
    
      default:
        break;
    }
  }

  return <div className="container pt-10 mx-auto md:flex">
    <TaskMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    <div className="flex-1 mb-10">
      {
        renderPage(selectedItem)
      }
    </div>
  </div>
}