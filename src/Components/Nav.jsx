import React, { useState } from 'react';
import moment from 'moment';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useApp } from '../Context/AppContext';

const Nav = () => {
     const { currentDate, updateCurrentDate } = useApp();


    const handlePrevClick = () => {
    updateCurrentDate(moment(currentDate).subtract(7, 'days'));
  };

    
  const handleNextClick = () => {
    updateCurrentDate(moment(currentDate).add(7, 'days'));
  };
  return (
    <div className='flex justify-between p-1 my-1 mx-1 border-[1px] border-gray-200' >
        <div className='flex  gap-20'>
            <div className='flex items-center cursor-pointer' onClick={handlePrevClick}>
                <IoMdArrowDropleft/>
        <p  className=' hidden md:block text-sm text-blue-400'> Previous Week </p>
            </div>
        <span className='text-sm text-gray-600 '>{currentDate.format('MMM DD YYYY')}</span>
        </div>
    
        <div className='flex items-center cursor-pointer' onClick={handleNextClick}>
                
        <p  className='hidden md:block text-sm text-blue-400'> Next Week  </p>
         <IoMdArrowDropright className="text-xl" />
            </div>
    </div>
  )
}

export default Nav