export default function TaskMenu() {

    const menuItem = "text-gray-600 mb-2 py-2 px-4 rounded-xl cursor-pointer"
    
    return <div className="flex-none w-full md:max-w-60">
    <ul className="text-xl flex-col">
        <li className={menuItem+" bg-secondary-light text-white"}>New task</li>
        <li className={menuItem+" hover:text-gray-900"}>All tasks</li>
        <li className={menuItem+" hover:text-gray-900"}>Stared</li>
    </ul>
    <hr className="h-px my-8 border-0 bg-gray-200"/>
    <ul className="text-xl flex-col">
        <li className={menuItem}>Tasks</li>
    </ul>
</div>
}