import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
export default function TaskAccordian(props) {

    const [ isOpen , setIsOpen ] = useState(!props.collapseAll)

    useEffect(() => {
        setIsOpen(!props.collapseAll)
    }, [props])

    const accordianTitle = "w-full cursor-pointer text-light p-3 rounded-md flex justify-between"
    const accordianDesc = "w-full bg-white text-black p-3 rounded-b-md flex flex-col gap-3 text-sm text-gray-800"

    return <div className="shadow-lg" key={props.task.id}>
        <div className={`${accordianTitle} ${isOpen ? "rounded-b-none bg-secondary" : 'bg-secondary-light'}`} onClick={() => { setIsOpen(!isOpen) }}>
            <h3>{ props.task.taskName }</h3>
            <div className="flex gap-2 md:gap-5 my-auto">
                <div className="italic">
                    { props.task.dueDate.toDate().toLocaleDateString()}
                </div>
                <div>
                    {
                        isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                            <path className="fill-secondary-light" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"/>
                        </svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                            <path className="fill-secondary" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/>
                        </svg>
                    }
                    
                </div>
            </div>
        </div>
        <div className={`${accordianDesc} ${!isOpen ? "hidden" : ""}`}>
            <div className="flex flex-wrap gap-x-5">
                <p>
                    <span className="text-primary font-semibold">Start Date :</span> {props.task.startDate.toDate().toLocaleDateString('en-US')} <br />
                </p>
                <p>
                    <span className="text-primary font-semibold">Due Date :</span> {props.task.dueDate.toDate().toLocaleDateString('en-US')} <br />
                </p>
                <p>
                    <span className="text-primary font-semibold">Important :</span> {props.task.isImportant === "true" ? "Yes" : "No" } <br />
                </p>
            </div>
            <p>
                <span className="text-primary font-semibold">Description :</span> {props.task.taskDescription}
            </p>
        </div>
    </div>
}