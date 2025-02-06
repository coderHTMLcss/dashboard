import { TableProps } from '../types';
import { BsThreeDots } from 'react-icons/bs';

const Table = ({ projects }: { projects: TableProps[] }) => {
    return (
        <table className="min-w-full table-auto border border-gray-700 text-white">
            <thead>
                <tr>
                    {['Image', 'Name', 'City', 'Email', 'Project Name', 'Task Progress', 'Status', 'Date', 'Actions'].map(header => (
                        <th key={header} className="px-5 py-3 text-left">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {projects.map(({ id, image, client, city, email, project, progress, status, date }) => (
                    <tr key={id} className="border border-gray-700">
                        <td className="px-4 py-2">
                            <img src={image} alt={client} className="w-[3rem] h-[3rem] object-cover rounded-full" />
                        </td>
                        <td className="px-4 py-2">{client}</td>
                        <td className="px-4 py-2">{city}</td>
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

    );
};

export default Table;


