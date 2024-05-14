import { useState } from 'react';
import { ScheduleDay } from '../interfaces';
import { getTimesForDate, handleMoreClick, handleLessClick, handleTimeClick } from '../utils/scheduleUtils';

const useScheduleState = (schedule: ScheduleDay[]) => {
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<{ date: string; time: string | null }>({ date: '', time: null });

  const onMoreClick = (date: string) => handleMoreClick(expandedDates, setExpandedDates, date);
  const onLessClick = (date: string) => handleLessClick(expandedDates, setExpandedDates, date);
  const onTimeClick = (date: string, time: string) => handleTimeClick(setSelectedTime, date, time);

  return {
    expandedDates,
    selectedTime,
    getTimesForDate: (date: string) => getTimesForDate(schedule, date),
    onMoreClick,
    onLessClick,
    onTimeClick,
  };
};

export default useScheduleState;