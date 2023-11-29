import React, { useEffect, useState } from 'react';
import { useApp } from '../Context/AppContext';
import moment from 'moment';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const { selectedOption, currentDate } = useApp();
  const [jsonData, setJsonData] = useState([]);
  const toDayDate = moment();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('https://ipangram-backend.onrender.com/api/json/all');
        const data = await response.data; // Assuming the response is in JSON format
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentDate]);

  useEffect(() => {
    updateTableData();
  }, [jsonData, currentDate]);

  const updateTableData = () => {
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

  console.log(jsonData);

  const getTimeFromData = (date) => {
    const matchingData = jsonData.find(item => item.Date === date);
    if (matchingData) {
      const [jsonHour, jsonMinute] = matchingData.Time.split(':');
      return { jsonHour, jsonMinute };
    }
    return { jsonHour: undefined, jsonMinute: undefined };
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <table className='w-full'>
        <tbody>
          {tableData.map((day, index) => {
            const isPast = moment(day.date, 'DD-MM-YYYY').isBefore(toDayDate, 'day');

            return (
              <tr key={index}>
                <td className='w-[70px] py-3 bg-gray-200 cursor-pointer hover:bg-slate-300 px-2'>
                  <div className={`text-red-800 text-md font-medium ${isPast ? 'text-gray-500' : ''}`}>
                    {day.dayOfWeek.substring(0, 3)}
                  </div>
                  <div className={`text-sm ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
                    {day.date.substring(0, 5).replace('-', '/')}
                  </div>
                </td>
                <td className="border-[2px] border-gray-200 py-5 px-2">
                  <div className='flex flex-wrap'>
                    {isPast ? (
                      <div className="mr-[10px] w-[90px] text-gray-500 text-sm">Past</div>
                    ) : (
                      Array.from({ length: 31 }).map((_, timeIndex) => {
                        const hour = Math.floor(timeIndex / 2) + 8;
                        const minute = timeIndex % 2 === 0 ? '00' : '30';
                        const generatedTime = `${hour}:${minute}`;
                        const { jsonHour, jsonMinute } = getTimeFromData(day.date);

                        return (
                          <div key={timeIndex} className="mr-[10px] w-[90px] flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={jsonHour === String(hour) && jsonMinute === String(minute)}
                              className="appearance-none w-4 h-4 my-[5px] bg-white border-[1.5px] cursor-pointer
                              border-blue-200 hover:border-blue-400 checked:bg-green-500 checked:border-none flex items-center
                              justify-center"
                            />
                            <p className='text-gray-500 text-sm'>
                              {hour > 12 ? hour - 12 : hour}:{minute} {hour >= 12 ? 'PM' : 'AM'}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;