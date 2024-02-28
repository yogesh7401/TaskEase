/* eslint-disable react/prop-types */
export default function TaskMenu(props) {
    const menuClass = "py-2 px-4 rounded-lg cursor-pointer"
    const activeMenu = "bg-secondary text-light"
    const hoverMenu = " text-light md:text-gray-600 hover:text-gray-900 hover:bg-secondary-light md:hover:bg-light"
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
    return <div className={`flex-none absolute py-5 shadow-lg md:shadow-none -mt-5 md:mt-0 md:relative bg-primary-light md:bg-transparent p-3 md:p-0 md:w-full md:max-w-44 mx-5 md:mx-0 ${ props.toggle ? "block" : "hidden md:block"}`}>
    <ul className="text-lg flex-col">
        {
            menuItems.map(menuItem => {
                return <li 
                    className={`${menuClass} ${ props.selectedItem === menuItem.key ? activeMenu : hoverMenu }`}
                    onClick={() => {
                        props.setSelectedItem(menuItem.key), props.setToggle(false)
                    }}
                    key={menuItem.key}
                    >
                    { menuItem.name }
                </li>
            })
        }
    </ul>
    {/* <hr className="h-px my-8 border-0 bg-gray-200"/>
    <ul className="text-lg flex-col">
        <li className={`${menuClass} ${ props.selectedItem === "Task1" ? activeMenu : hoverMenu }`}>Tasks</li>
    </ul> */}
</div>
}