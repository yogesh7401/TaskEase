/* eslint-disable react/prop-types */
export default function Header(props) {
    return <nav className="bg-light shadow-lg">
        <div className="flex justify-between container mx-auto p-3">
            <div className="flex">
            <svg className="my-auto mr-3 md:hidden cursor-pointer" onClick={() => props.setToggle(!props.toggle)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                <path fill="none" className="stroke-secondary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
            </svg>
                <h3 className="text-primary-light text-5xl font-bold font-serif italic">Task</h3>
                <h3 className="text-primary text-5xl font-bold font-serif italic ml-1">Ease</h3>
            </div>
            <div className="relative my-auto">
                <div className="w-10 h-10 bg-secondary text-light flex rounded-full cursor-pointer">
                    <h2 className="text-xl font-bold m-auto">Y</h2>
                </div>
                {/* 
                    <div className="absolute right-0 mt-2 z-10 p-3 bg-secondary-light text-light rounded-lg">
                        Dropdown
                    </div> 
                */}
            </div>
        </div>
    </nav>
}