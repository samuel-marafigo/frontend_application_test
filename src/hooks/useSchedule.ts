import { useState } from 'react';
import {  generateDates } from '../utils/dateUtils';

const useSchedule = (initialDate: Date) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const navigateToPreviousDate = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(currentDate.getUTCDate() - 1);
    if (newDate >= initialDate) {
      setCurrentDate(newDate);
    }
  };

  const navigateToNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(currentDate.getUTCDate() + 1);
    setCurrentDate(newDate);
  };

  const displayedDates = generateDates(currentDate);

  return { currentDate, displayedDates, navigateToPreviousDate, navigateToNextDate };
};

export default useSchedule;