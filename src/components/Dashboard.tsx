import React from 'react'
import SideBar from './SideBar'
import Table from './Table'

const Dashboard = () => {
    return (
        <div className='flex h-screen'>
            <SideBar />
            <div className='flex-1 bg-gray-900'>
                <Table />
            </div>
        </div>
    )
}

export default Dashboard
