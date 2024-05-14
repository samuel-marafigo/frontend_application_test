import { ScheduleDay } from '../interfaces';
import { formatDate } from './dateUtils';

export const getTimesForDate = (schedule: ScheduleDay[], date: string): string[] => {
  const daySchedule = schedule.find(day => formatDate(new Date(day.date)) === date);
  return daySchedule ? daySchedule.times : [];
};

export const handleMoreClick = (
expandedDates: string[],
  setExpandedDates: React.Dispatch<React.SetStateAction<string[]>>,
  date: string
) => {
  setExpandedDates(prev => [...prev, date]);
  console.log(expandedDates);
};

export const handleLessClick = (
  expandedDates: string[],
  setExpandedDates: React.Dispatch<React.SetStateAction<string[]>>,
  date: string
) => {
  setExpandedDates(prev => prev.filter(d => d !== date));
  console.log(expandedDates);
};

export const handleTimeClick = (
  setSelectedTime: React.Dispatch<React.SetStateAction<{ date: string; time: string | null }>>,
  date: string,
  time: string
) => {
  setSelectedTime({ date, time });
};
