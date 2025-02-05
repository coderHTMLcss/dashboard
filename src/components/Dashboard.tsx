import { useCallback, useState } from 'react';
import SideBar from './SideBar';
import Table from './Table';
import Dropdown from './DropDown';
import { TableProps } from '../types';
import { data } from '../utils/data';
import { BiSort } from 'react-icons/bi';
import { MdSort } from 'react-icons/md';
import { useDropdown } from '../hooks/useDropdown';


const inputs = [
    { label: "Filter by Name:", type: 'text', name: 'text' },
    { label: "Filter by Country:", type: 'text', name: 'country' },
    { label: "Filter by Email:", type: 'email', name: 'email' },
    { label: "Filter by Project:", type: 'text', name: 'project' },
    { label: "Filter by Status:", type: 'text', name: 'status' },
];
const Dashboard = () => {
    const [projects, setProjects] = useState<TableProps[]>(data);
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableProps, direction: string } | null>(null);
    const { activeDropdown, setActiveDropdown } = useDropdown();

    const sortProjects = useCallback((key: keyof TableProps) => {
        setProjects(prevProjects => {
            const sortedProjects = [...prevProjects].sort((a, b) =>
                a[key].toString().localeCompare(b[key].toString())
                * (sortConfig?.key === key && sortConfig.direction === 'ascending' ? -1 : 1)
            );
            setSortConfig({ key, direction: sortConfig?.direction === 'ascending' ? 'descending' : 'ascending' });
            return sortedProjects;
        });
    }, [sortConfig]);


    return (
        <div className='flex h-screen'>
            <SideBar />
            <div className='flex-1 bg-gray-900'>
                <div className='p-4 w-[93%] ml-[5rem]'>
                    <div className='flex items-center mb-5 gap-2'>
                        <Dropdown
                            title="Sort"
                            icon={BiSort}
                            isActive={activeDropdown === 'sort'}
                            toggle={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                        >
                            {['client', 'status', 'date'].map((key) => (
                                <button
                                    key={key}
                                    className="block px-4 py-2 text-white w-full hover:bg-gray-700"
                                    onClick={() => {
                                        sortProjects(key as keyof TableProps);
                                        setActiveDropdown(null);
                                    }}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            ))}
                        </Dropdown>

                        <Dropdown
                            title="Filters"
                            icon={MdSort}
                            isActive={activeDropdown === 'filters'}
                            toggle={() => setActiveDropdown(activeDropdown === 'filters' ? null : 'filters')}
                        >
                            {inputs.map(({ label, type, name }) => (
                                <div key={name} className="mb-2">
                                    <label className="block text-white">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        className="bg-gray-900 text-white rounded p-2 w-full" />
                                </div>
                            ))}
                        </Dropdown>
                    </div>

                    <Table projects={projects} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
