import { Timestamp, addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../../firebase"

export default function NewTask() {
    const defaultValue = {
        "isImportant": false,
        "taskName": "",
        "taskDescription": "",
        "startDate": "",
        "dueDate": ""
    }
    const [ newTask, setNewTask ] = useState(defaultValue)

    const labelClass = "text-primary-light text-sm"
    const inputClass = "p-2 w-full rounded-md focus:outline-none"

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        setNewTask({
            ...newTask,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addDoc(collection(db, "TaskList"), { 
            createdDateTime: Timestamp.now(), 
            startDate: Timestamp.fromDate(new Date(newTask.startDate)),
            dueDate: newTask.dueDate !== "" ? Timestamp.fromDate(new Date(newTask.dueDate)) : Timestamp.fromDate(new Date(newTask.startDate)),
            isImportant: newTask.isImportant === "true",
            ...newTask
        })
        .then(e => {
            console.log(e);
            alert("Task added successfully")
        })
        setNewTask(defaultValue)
    }

    return <div className="h-full bg-light p-5 px-10 mx-5 lg:mx-10">
        <p className="text-primary font-bold text-3xl">Add new task</p>
        <form className="grid grid-cols-2 gap-5 my-5 text-gray-600" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label className={`${labelClass} required`} htmlFor="taskTitle">
                    Task title
                </label> <br />
                <input 
                    className={inputClass} 
                    name="taskName" 
                    value={newTask.taskName} 
                    onChange={(e) => handleChange(e)} 
                    type="text" 
                    id="taskTitle" 
                    required/>
            </div>
            <div>
                <label className={`${labelClass} required`} htmlFor="assignedTo" required>
                    Assigned to
                </label> <br />
                <input 
                    className={inputClass} 
                    onChange={(e) => handleChange(e)} 
                    type="text" 
                    id="assignedTo" 
                    disabled 
                    value={"My self"} />
            </div>
            <div className="col-span-2">
                <label className={`${labelClass} required`} htmlFor="taskDescription">
                    Description
                </label> <br />
                <textarea 
                    className={inputClass} 
                    onChange={(e) => handleChange(e)} 
                    name="taskDescription" 
                    value={newTask.taskDescription}
                    id={"taskDescription"}
                    rows="3" 
                    required></textarea>
            </div>
            <div>
                <label className={`${labelClass} required`} htmlFor="startDate">
                    Start date
                </label> <br />
                <input 
                    className={inputClass} 
                    onChange={(e) => handleChange(e)} 
                    type="date" 
                    name="startDate" 
                    value={NewTask.startDate} 
                    id="startDate" 
                    required/>
            </div>
            <div>
                <label className={`${labelClass}`} htmlFor="dueDate">
                    Due date
                </label> <br />
                <input 
                    className={inputClass} 
                    onChange={(e) => handleChange(e)} 
                    type="date" 
                    name="dueDate" 
                    value={newTask.dueDate} 
                    id="dueDate" />
            </div>
            <div>
                <label className={`${labelClass} required`} htmlFor="isImportant">
                    Important
                </label> <br />
                <div className="flex gap-5">
                    <div>
                        <label htmlFor="Yes">Yes</label>
                        <input 
                            className="ml-3" 
                            onChange={(e) => handleChange(e)} 
                            type="radio" 
                            name="isImportant" 
                            value={true} 
                            id="Yes" />
                    </div>
                    <div>
                        <label htmlFor="No">No</label>
                        <input 
                            className="ml-3" 
                            defaultChecked={!newTask.isImportant} 
                            onChange={(e) => handleChange(e)} 
                            type="radio" 
                            name="isImportant" 
                            value={false} 
                            id="No" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse text-light">
                <button value={"submit"} className={`p-2 rounded-md focus:outline-none mt-5 bg-primary-light hover:bg-primary !w-20`}>Create</button>
            </div>
        </form>
    </div>
}