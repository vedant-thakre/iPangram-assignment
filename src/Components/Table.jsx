import React, { useEffect, useState } from 'react';
import { useApp } from '../Context/AppContext';
import moment from 'moment';
import dummyData from '../Data/dummy.json';

const Table = () => {
    const [tableData, setTableData] = useState([]);
    const [check, setcheck] = useState(false)
    const { selectedOption, updateSelectedOption, currentDate, updateCurrentDate } = useApp();
    
    
    useEffect(() => {
    updateTableData();
  }, [currentDate]);

   const updateTableData = () => {
    // Change the start of the week to Monday
    const startOfWeek = moment(currentDate).startOf('week').add(1, 'day'); 
    const days = [];
    for (let i = 0; i < 5; i++) {
      const day = moment(startOfWeek).add(i, 'days');
      days.push({
        dayOfWeek: day.format('dddd'),
        date: day.format('DD-MM-YYYY'),
      });
    }
    setTableData(days);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <table className='w-full'>
        <tbody>
            {tableData.map((day, index) => {
            const eventsForDay = dummyData.filter(event =>
                moment(event.Date, 'DD-MM-YYYY').isSame(moment(day.date, 'DD-MM-YYYY'), 'day')
            );

            return (
                <tr key={index}>
                <td className='w-[70px] py-3 bg-gray-200 cursor-pointer hover:bg-slate-300 px-2'>
                    <div className='text-red-800 text-md font-medium'>{(day.dayOfWeek).substring(0, 3)}</div>
                    <div className='text-sm text-gray-600'>{(day.date).substring(0, 5).replace('-', '/')}</div>
                </td>
                <td className="border-[2px] border-gray-200 py-5 px-2">
                    <div className='flex flex-wrap'>
                    {eventsForDay.map((event) => (
                        <div key={event.Id} className="mr-[10px] w-[90px] flex items-center gap-1">
                        <input
                            type="checkbox"
                            className="appearance-none w-4 h-4 my-[5px] bg-white border-[1.5px] cursor-pointer
                            border-blue-200 hover:border-blue-400 checked:bg-green-500 checked:border-none flex items-center
                            justify-center"
                        />
                        <p className='text-gray-500 text-sm'>
                            {
                            (((parseInt((event.Time).substring(0, 2), 10) + (parseInt(selectedOption.replace('UTC', ''), 10) + 24) % 24) % 24)) > 12 ?
                                (((parseInt((event.Time).substring(0, 2), 10) + (parseInt(selectedOption.replace('UTC', ''), 10) + 24) % 24) % 24) % 12) :
                                (((parseInt((event.Time).substring(0, 2), 10) + (parseInt(selectedOption.replace('UTC', ''), 10) + 24) % 24) % 24))
                            }:{(event.Time).slice(-2)} {parseInt((event.Time).substring(0, 2), 10) > 12 ? "PM" : "AM" }
                        </p>
                        </div>
                    ))}
                    {eventsForDay.length === 0 && (
                        <div className="mr-[10px] w-[90px] text-gray-500 text-sm">None</div>
                    )}
                    </div>
                </td>
                </tr>
            );
            })}
        </tbody>
      </table>

    </div>
  )
}

export default Table