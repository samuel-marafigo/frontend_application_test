import { useState } from 'react';
import {  generateDates } from '../utils/dateUtils';

const useSchedule = (initialDate: Date) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handlePrevClick = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(currentDate.getUTCDate() - 1);
    if (newDate >= initialDate) {
      setCurrentDate(newDate);
    }
  };

  const handleNextClick = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(currentDate.getUTCDate() + 1);
    setCurrentDate(newDate);
  };

  const displayedDates = generateDates(currentDate);

  return { currentDate, displayedDates, handlePrevClick, handleNextClick };
};

export default useSchedule;