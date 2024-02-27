/* eslint-disable react/prop-types */
export default function TaskMenu(props) {
    const menuClass = "text-gray-600 py-2 px-4 rounded-lg cursor-pointer"
    const activeMenu = "bg-secondary-light text-light"
    const hoverMenu = " hover:text-gray-900 hover:bg-light"
    const menuItems = [
        {
            name : "New task",
            key  : "New"
        },
        {
            name : "All tasks",
            key  : "All"
        },
        {
            name : "Important tasks",
            key  : "Important"
        }
    ]
    
    return <div className="flex-none w-full md:max-w-44">
    <ul className="text-lg flex-col">
        {
            menuItems.map(menuItem => {
                return <li 
                    className={`${menuClass} ${ props.selectedItem === menuItem.key ? activeMenu : hoverMenu }`}
                    onClick={() => props.setSelectedItem(menuItem.key)}
                    key={menuItem.key}
                    >
                    { menuItem.name }
                </li>
            })
        }
    </ul>
    <hr className="h-px my-8 border-0 bg-gray-200"/>
    <ul className="text-lg flex-col">
        <li className={`${menuClass} ${ props.selectedItem === "Task1" ? activeMenu : hoverMenu }`}>Tasks</li>
    </ul>
</div>
}