const SideBar = () => {
    return (
        <nav className='w-16 fixed h-screen border border-[#242424]
        p-4'>
            <ul className="flex flex-col items-center space-y-8">
                <li>
                    <a className='text-white' href="/">Logo</a>
                </li>
                <li>
                    <a className='text-gray-400' href="">📁</a>
                </li>
                <li>
                    <a className='text-gray-400' href="">👤</a>
                </li>
                <li>
                    <a className='text-gray-400' href="">⚙️</a>
                </li>
            </ul>
        </nav>
    )
}

export default SideBar
