import TaskMenu from "../Tasks/TaskMenu";

export default function TaskDashboard() {
    return <div className="container pt-10 mx-auto md:flex">
    <TaskMenu />
    <div className="flex-1 bg-blue">
      {/* Main content area  */}
    </div>
  </div>
}