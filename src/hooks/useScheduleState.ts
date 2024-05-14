import { useState } from 'react';
import { ScheduleEntity } from '../interfaces';
import { getAvailableTimesForDate, expandDate, collapseDate, selectTimeForDate } from '../utils/scheduleUtils';

const useScheduleState = (schedule: ScheduleEntity[]) => {
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<{ date: string; time: string | null }>({ date: '', time: null });

  const onMoreClick = (date: string) => expandDate(expandedDates, setExpandedDates, date);
  const onLessClick = (date: string) => collapseDate(expandedDates, setExpandedDates, date);
  const onTimeClick = (date: string, time: string) => selectTimeForDate(setSelectedTime, date, time);

  return {
    expandedDates,
    selectedTime,
    getTimesForDate: (date: string) => getAvailableTimesForDate(schedule, date),
    onMoreClick,
    onLessClick,
    onTimeClick,
  };
};

export default useScheduleState;