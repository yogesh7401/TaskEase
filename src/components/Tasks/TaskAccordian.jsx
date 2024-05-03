import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../firebase"

/* eslint-disable react/prop-types */
export default function TaskAccordian(props) {

    const [ task , setTask ] = useState(props.task)
    const [ isOpen , setIsOpen ] = useState(!props.collapseAll)
    const [ isEdit , setIsEdit ] = useState(false)
    const [ errorMessage , setErrorMessage ] = useState(false)
    const [ currentTask, setCurrentTask ] = useState({
        ...props.task,
        dueDate: formatDate(props.task.dueDate),
        startDate: formatDate(props.task.startDate) 
    })

    const labelClass = "text-primary-light text-xs md:text-sm"
    const inputClass = "border p-2 w-full rounded-md focus:outline-none"
    const accordianTitle = "w-full text-light cursor-pointer p-3 rounded-md flex justify-between text-sm my-auto"
    const accordianDesc = "w-full bg-white text-black p-3 rounded-b-md flex flex-col gap-3 text-sm text-gray-800"

    useEffect(() => {
        setIsOpen(!props.collapseAll)
    }, [props])

    function dateAndMonth() {
        let date = task.dueDate.toDate().toLocaleDateString().split("/")
        return `${date[0]}/${date[1]}`
    }

    function formatDate(date) {
        date = date.toDate().toLocaleDateString().split('/')
        date = date[2]+'-'+date[1]+'-'+date[0]
        return date
    }

    function handleSubmit(e) {
        e.preventDefault()
        let startDate = Timestamp.fromDate(new Date(currentTask.startDate+"T12:00:00"))
        let dueDate = Timestamp.fromDate(new Date(currentTask.dueDate+"T12:00:00"))
        if (currentTask.taskName.length < 3) {
            setErrorMessage("Task name should have more the 3 character!")
            return false
        }
        else if (currentTask.taskDescription.length < 10) {
            setErrorMessage("Task description should have more the 10 character!")
            return false
        }
        else if (currentTask.isImportant === "") {
            setErrorMessage("Invalid value for feild Important!")
            return false
        }
        else if (currentTask.startDate === "") {
            setErrorMessage("Please enter the start date!")
            return false
        }
        else if (new Date(currentTask.dueDate) < new Date(currentTask.startDate)) {
            setErrorMessage("Due date should be later than start date!")
            return false
        }
        else {
            setErrorMessage("")
        }
        const documentRef = doc(db, 'TaskList', currentTask.id);
        let updatedValue = {
            ...currentTask,
            updatedDateTime: Timestamp.now(), 
            startDate: startDate,
            dueDate: currentTask.dueDate !== "" ? dueDate : startDate,
            isImportant: currentTask.isImportant === "true" ? 'true' : 'false',
            user: currentTask.user
        }
        updateDoc(documentRef, updatedValue)
        .then(() => {
            setErrorMessage(null)
            setTask(updatedValue)
            alert("Task edited successfully")
        })
        setIsEdit(false)
        
    }

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        setCurrentTask({
            ...currentTask,
            [name]: value
        })
    }

    function confirmDelete()  {
        const confirmation = window.confirm('Are you sure you want to delete this document?');
        if (confirmation) {
          deleteTask();
        }
    }

    function deleteTask() {
        const documentRef = doc(db, 'TaskList', props.task.id);
        deleteDoc(documentRef)
        .then(() => {
            setErrorMessage(null)
            setTask(null)
            alert("Task deleted successfully")
        })
    }

    return props.type === 'important' && task?.isImportant === 'false' ? '' : task ?
    <div className="shadow-lg" key={task.id} >
        <div className={`${accordianTitle} ${isOpen ? "rounded-b-none bg-secondary" : 'bg-secondary-light'}`} onClick={() => { setIsOpen(!isOpen) }}>
            <h3 className="cursor-pointer my-auto mr-5">{ task.taskName }</h3>
            <div className="flex gap-2 md:gap-5 my-auto">
                <div className="italic my-auto hidden md:block">
                    { task.dueDate.toDate().toLocaleDateString()}
                </div>
                <div className="italic my-auto md:hidden">
                    { dateAndMonth() }
                </div>
                <div className="cursor-pointer" onClick={() => { setIsOpen(!isOpen) }}>
                    {
                        // down arrow 
                        isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                            <path className="fill-secondary-light" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"/>
                        </svg> : 
                        // up arrow
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                            <path className="fill-secondary" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/>
                        </svg>
                    }
                    
                </div>
            </div>
        </div>
            {
                !isEdit ? <div className={`${accordianDesc} ${!isOpen ? "hidden" : ""}`}> 
                    <div className="flex flex-wrap gap-x-5">
                        <p>
                            <span className="text-primary font-semibold">Start Date :</span> {task.startDate.toDate().toLocaleDateString('en-US')} <br />
                        </p>
                        <p>
                            <span className="text-primary font-semibold">Due Date :</span> {task.dueDate.toDate().toLocaleDateString('en-US')} <br />
                        </p>
                        <p>
                            <span className="text-primary font-semibold">Important :</span> {task.isImportant === "true" ? "Yes" : "No" } <br />
                        </p>
                    </div>  
                    <p>
                        <span className="text-primary font-semibold">Description :</span> {task.taskDescription}
                    </p> 

                    <div className="flex justify-end gap-x-4">
                        <button type="button" onClick={() => { setIsEdit(true) }} className={`p-2 rounded-md focus:outline-none mt-5 bg-primary-light hover:bg-primary !w-20 text-light`}>Edit</button>
                        <button type="button" onClick={() => { confirmDelete() }} className={`p-2 rounded-md focus:outline-none mt-5 bg-red-600 hover:bg-red-700 !w-20 text-light`}>Delete</button>
                    </div>
                </div> : <form method="POST" onSubmit={(e) => handleSubmit(e)} className={`${accordianDesc} ${!isOpen ? "hidden" : ""}`}>
                    {/* editable form  */}
                    <div>
                        <label className={`${labelClass} required`} htmlFor="taskTitle">
                            Task title
                        </label> <br />
                        <input 
                            className={inputClass} 
                            name="taskName" 
                            value={currentTask.taskName} 
                            onChange={(e) => handleChange(e)} 
                            type="text" 
                            id="taskTitle" 
                            required/>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        <div>
                            <label className={`${labelClass} required`} htmlFor="startDate">
                                Start date
                            </label> <br />
                            <input 
                                className={inputClass} 
                                onChange={(e) => handleChange(e)} 
                                type="date" 
                                name="startDate" 
                                value={currentTask.startDate} 
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
                                value={currentTask.dueDate} 
                                id="dueDate" />
                        </div>
                    </div>
                    <div className="mt-5">
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
                                    defaultChecked={currentTask.isImportant === 'true'} 
                                    value={true} 
                                    id="Yes" />
                            </div>
                            <div>
                                <label htmlFor="No">No</label>
                                <input 
                                    className="ml-3" 
                                    defaultChecked={currentTask.isImportant === 'false'} 
                                    onChange={(e) => handleChange(e)} 
                                    type="radio" 
                                    name="isImportant" 
                                    value={false} 
                                    id="No" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 mt-3">
                        <label className={`${labelClass} required`} htmlFor="taskDescription">
                            Description
                        </label> <br />
                        <textarea 
                            className={inputClass} 
                            onChange={(e) => handleChange(e)} 
                            name="taskDescription" 
                            value={currentTask.taskDescription}
                            id={"taskDescription"}
                            rows="3" 
                            required></textarea>
                    </div>
                    <small className="text-red-500">{ errorMessage }</small>
                    <div className="flex justify-end gap-x-4">
                        <button type="submit" className={`p-2 rounded-md focus:outline-none mt-5 bg-primary-light hover:bg-primary !w-20 text-light`}>Save</button>
                        <button type="button" onClick={() => { setIsEdit(false) }} className={`p-2 rounded-md focus:outline-none mt-5 bg-red-600 hover:bg-red-700 !w-20 text-light`}>cancel</button>
                    </div> 
                </form>
            }
    </div> : ''
}