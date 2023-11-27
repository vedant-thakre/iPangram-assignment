import React, { createContext, useContext, useState } from 'react';
import moment from 'moment';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('UTC+0');
  const [currentDate, setCurrentDate] = useState(moment());

  const updateSelectedOption = (newOption) => {
    setSelectedOption(newOption);
  };

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <AppContext.Provider value={{ selectedOption, updateSelectedOption, currentDate, updateCurrentDate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
