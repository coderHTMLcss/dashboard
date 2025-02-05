import React from "react";
import { AiOutlineDown } from "react-icons/ai";

type DropDownProps = {
    title: string,
    icon: React.ElementType,
    children: React.ReactNode,
    isActive: boolean,
    toggle: () => void;
}

const Dropdown = ({ title, icon: Icon, children, isActive, toggle }: DropDownProps) => (
    <div className='relative dropdown-container'>
        <button
            onClick={toggle}
            className='border border-gray-700 flex items-center text-white p-2 rounded'
        >
            <Icon
                className='mr-2' />
            {title}
            <AiOutlineDown className='ml-2' />
        </button>
        {isActive && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700
             rounded shadow-lg p-4">
                {children}
            </div>
        )}
    </div>
);


export default Dropdown;