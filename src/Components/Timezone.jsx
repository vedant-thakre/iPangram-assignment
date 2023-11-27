import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa6";
import { useApp } from '../Context/AppContext';

const Timezone = () => {
  const { selectedOption, updateSelectedOption } = useApp();

  const handleSelectChange = (e) => {
    updateSelectedOption(e.target.value);
  };


  return (
    <div className='mx-2'>
      <label htmlFor="exampleSelect" className="block text-sm font-medium text-gray-700">
        Timezone:
      </label>
      <div className="relative">
        <select
          id="exampleSelect"
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-1 block w-full py-2 px-3 border cursor-pointer border-gray-300 text-gray-600 bg-white rounded-md shadow-sm appearance-none focus:outline-none focus:ring-black focus:border-gray-700 sm:text-sm"
        >
          <option value="UTC+0">[ UTC+0 ] Greenwich Mean Time</option>
          <option value="UTC-2">[ UTC-2 ] Atlantic Time Zone</option>
          <option value="UTC-5">[ UTC-5 ] Eastern Time Zone</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <FaChevronDown
            className="w-3 h-4 text-gray-800"

          />
        </div>
      </div>
    </div>
  );
};

export default Timezone;
