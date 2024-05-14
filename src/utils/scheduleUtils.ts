import { ScheduleEntity } from '../interfaces';
import { formatDate } from './dateUtils';

export const getAvailableTimesForDate = (schedule: ScheduleEntity[], formattedDate: string): string[] => {
  const scheduleForDay = schedule.find(day => formatDate(new Date(day.date)) === formattedDate);
  return scheduleForDay ? scheduleForDay.times : [];
};

export const expandDate = (
  currentExpandedDates: string[],
  updateExpandedDates: React.Dispatch<React.SetStateAction<string[]>>,
  dateToExpand: string
) => {
  updateExpandedDates(previousDates => [...previousDates, dateToExpand]);
  console.log(currentExpandedDates);
};

export const collapseDate = (
  currentExpandedDates: string[],
  updateExpandedDates: React.Dispatch<React.SetStateAction<string[]>>,
  dateToCollapse: string
) => {
  updateExpandedDates(previousDates => previousDates.filter(date => date !== dateToCollapse));
  console.log(currentExpandedDates);
};

export const selectTimeForDate = (
  updateSelectedTime: React.Dispatch<React.SetStateAction<{ date: string; time: string | null }>>,
  selectedDate: string,
  selectedTime: string
) => {
  updateSelectedTime({ date: selectedDate, time: selectedTime });
};
