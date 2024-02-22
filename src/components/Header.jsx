export default function Header() {
    return <nav className="bg-light shadow-lg">
        <div className="flex justify-between container mx-auto py-3">
            <div className="flex">
                <h3 className="text-primary-light text-5xl font-bold font-serif italic">Task</h3>
                <h3 className="text-primary text-5xl font-bold font-serif italic">Ease</h3>
            </div>
            <div className="relative my-auto">
                <div className="w-10 h-10 bg-secondary text-white flex rounded-full cursor-pointer">
                    <h2 className="text-xl font-bold m-auto">Y</h2>
                </div>
                {/* 
                    <div className="absolute right-0 mt-2 z-10 p-3 bg-secondary-light text-white rounded-lg">
                        Dropdown
                    </div> 
                */}
            </div>
        </div>
    </nav>
}