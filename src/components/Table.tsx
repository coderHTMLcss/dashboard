import React, { useState, useCallback } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { BiSort } from 'react-icons/bi';
import { AiOutlineDown } from 'react-icons/ai';
import { data } from '../utils/data';
import { TableProps } from '../types';

const Table = () => {
    const [projects, setProjects] = useState<TableProps[]>(data);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableProps, direction: string } | null>(null);

    const sortProjects = useCallback((key: keyof TableProps) => {
        setProjects((prevProjects) => {
            const sortedProjects = [...prevProjects].sort((a, b) =>
                a[key].toLocaleString().localeCompare(b[key].toLocaleString()) *
                (sortConfig?.key === key && sortConfig.direction === 'ascending' ? -1 : 1)
            );
            setSortConfig({
                key, direction: sortConfig?.direction === 'ascending' ?
                    'descending' : 'ascending'
            });
            return sortedProjects;
        });
    }, [sortConfig]);

    return (
        <div className='p-4 w-[93%] ml-[5rem]'>
            <div className='flex items-center mb-5'>
                <div className='relative'>
                    <button
                        onClick={() => setDropdownVisible(prev => !prev)}
                        className='border border-gray-700 flex items-center text-white p-2 rounded'>
                        <BiSort className='mr-2' /> Sort <AiOutlineDown className='ml-2' />
                    </button>
                    {dropdownVisible && (
                        <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
                            {['client', 'status', 'date'].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => { sortProjects(key as keyof TableProps); setDropdownVisible(false); }}
                                    className="block px-4 py-2 text-white w-full hover:bg-gray-700">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <table className="min-w-full table-auto border border-gray-700 text-white">
                <thead>
                    <tr>
                        {['Image', 'Name', 'Country', 'Email', 'Project Name', 'Task Progress', 'Status', 'Date', 'Actions'].map((header) => (
                            <th key={header} className="px-5 py-3 text-left">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {projects.map(({ id, image, client, country, email, project, progress, status, date }) => (
                        <tr key={id} className="border border-gray-700">
                            <td className="px-4 py-2">
                                <img src={image} alt={client} className="w-[3rem] h-[3rem] object-cover rounded-full" />
                            </td>
                            <td className="px-4 py-2">{client}</td>
                            <td className="px-4 py-2">{country}</td>
                            <td className="px-4 py-2">{email}</td>
                            <td className="px-4 py-2">{project}</td>
                            <td className="px-4 py-2">
                                <div className="w-24 h-2 bg-gray-700 rounded">
                                    <div className="h-2 bg-green-500 rounded" style={{ width: `${progress}` }}></div>
                                </div>
                            </td>
                            <td className="px-4 py-2 w-[10rem]">
                                <span className={`bg-${status === "Completed" ? "green" : "yellow"}-500 p-1 rounded`}>{status}</span>
                            </td>
                            <td className="px-4 py-2">{date}</td>
                            <td className="px-4 py-2">
                                <BsThreeDots className="cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50">Previous</button>
                <span className="px-4 py-2 text-white">{/* Page info */}</span>
                <button className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};

export default Table;
