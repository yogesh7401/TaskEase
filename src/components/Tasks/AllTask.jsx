import { useEffect, useState } from "react";
import TaskAccordian from "./TaskAccordian";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AllTask() {
    const [ tasks, setTasks ] = useState([])
    useEffect(() => {
        getDocs(collection(db, "TaskList"))
        .then(querySnapshot => {
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
            setTasks(newData)
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    return <div className="h-full bg-light p-5 px-10 mx-5 lg:mx-10">
        <p className="text-primary font-bold text-3xl">All tasks</p>
        <div className="flex flex-col gap-2 mt-8">
            {
                tasks.length > 0 ? tasks.map(task => {
                    return <TaskAccordian key={task.id} task={task}/>
                }) : ""
            }
        </div>
    </div>
}