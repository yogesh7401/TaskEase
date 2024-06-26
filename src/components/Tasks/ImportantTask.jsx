import { useEffect, useState } from "react";
import TaskAccordian from "./TaskAccordian";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import Loader from "../Loader";
import { useAuth } from "../Authentication/AuthProvider";

export default function ImportantTask() {
    const [ tasks, setTasks ] = useState([])
    const [ collapseAll, setCollapseAll ] = useState(true)
    const [ loading, setLoading ] = useState(true)

    const { user } = useAuth()

    useEffect(() => {
        getDocs(query(collection(db, "TaskList"),where("isImportant","==","true"),where("user","==",user.uid)))
        .then(querySnapshot => {
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
            setTasks(newData)
            setLoading(false)
        })
        .catch(e => {
            console.log(e);
        })
    }, [user.uid])

    return <div className="h-full bg-light p-5 sm:px-10 mx-3 sm:mx-5 lg:mx-10 shadow-md">
        <div className="flex justify-between">
            <p className="text-primary font-bold text-2xl">Important tasks</p>
            {
                tasks.length > 0 ? <>
                    {/* collapse */}
                    <svg onClick={() => setCollapseAll(true)} className={ collapseAll ? "hidden" : ""} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <title>Collapase all</title>
                        <path className="fill-primary-light" d="M14 4H4v10H2V4a2 2 0 0 1 2-2h10zm4 2H8a2 2 0 0 0-2 2v10h2V8h10zm4 6v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2m-2 3h-8v2h8z"/>
                    </svg>
                    {/* expand */}
                    <svg onClick={() => setCollapseAll(false)} className={ collapseAll ? "" : "hidden"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <title>Expand all</title>
                        <path className="fill-primary-light" d="M18 8H8v10H6V8a2 2 0 0 1 2-2h10zm-4-6H4a2 2 0 0 0-2 2v10h2V4h10zm8 10v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2m-2 3h-3v-3h-2v3h-3v2h3v3h2v-3h3z"/>
                    </svg>
                </> : ""
            }
        </div>
        {
            loading ?  <div className="flex h-96 w-full">
                    <Loader />
                </div> : <div className="flex flex-col gap-2 mt-8">
                {
                    tasks.map(task => {
                        return task.isImportant ? 
                            <TaskAccordian type='important' collapseAll={collapseAll} key={task.taskName} task={task}/> 
                            : '' 
                    })
                }
            </div>
        }
        
    </div>
}