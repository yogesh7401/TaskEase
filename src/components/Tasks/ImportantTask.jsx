import { useEffect, useState } from "react";
import TaskAccordian from "./TaskAccordian";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function ImportantTask() {
    const [ tasks, setTasks ] = useState([])
    useEffect(() => {
        getDocs(collection(db, "TaskList"),where("isImportant","==",true))
        .then(querySnapshot => {
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
            setTasks(newData)
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    return <div className="h-full bg-light p-5 px-10 mx-5 lg:mx-10">
        <p className="text-primary font-bold text-3xl">Important tasks</p>
        <div className="flex flex-col gap-2 mt-8">
            {
                tasks.map(task => {
                    return task.isImportant ? <TaskAccordian key={task.taskName} task={task}/> : ""
                })
            }
        </div>
    </div>
}