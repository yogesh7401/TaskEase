import TaskDashboard from "./components/Dashboard/TaskDashboard";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <TaskDashboard />
    </div>
  )
}