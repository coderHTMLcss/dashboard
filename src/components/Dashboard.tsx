import SideBar from './SideBar';
import Table from './Table';
import Dropdown from './DropDown';
import Pagination from './Pagination';
import { TableProps } from '../types';
import { INPUTS_FIELD } from '../variables';
import { BiSort } from 'react-icons/bi';
import { MdSort } from 'react-icons/md';
import { useDropdown } from '../hooks/useDropdown';
import { usePagination } from '../hooks/usePagination';
import { useFilter } from '../hooks/useFilter';
import { useSort } from '../hooks/useSort';

const Dashboard = () => {
    const { projects, sortProjects } = useSort();
    const { activeDropdown, setActiveDropdown } = useDropdown();
    const { filters, filteredProjects, handleInputChange } = useFilter(projects)

    const { currentPage,
        totalPages,
        currentProject,
        handlePageChange
    } = usePagination(filteredProjects);


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
                            {INPUTS_FIELD.map(({ label, type, name }) => (
                                <div key={name} className="mb-2">
                                    <label className="block text-white">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={filters[name as keyof typeof filters]}
                                        onChange={handleInputChange}
                                        className="bg-gray-900 text-white rounded p-2 w-full" />
                                </div>
                            ))}
                        </Dropdown>
                    </div>

                    <Table projects={currentProject} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />

                </div>
            </div>
        </div>
    )
}

export default Dashboard
