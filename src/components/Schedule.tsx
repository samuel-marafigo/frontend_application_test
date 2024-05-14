import React from 'react';
import '../styles/Schedule.css';
import useSchedule from '../hooks/useSchedule';
import useScheduleState from '../hooks/useScheduleState';
import { ScheduleEntity } from '../interfaces';
import { formatDisplayDate } from '../utils/dateUtils';

const developmentDate = new Date(Date.UTC(2024, 7, 18, 0, 0, 0));  // Hard-coded date for development purposes - Months are 0-indexed, so 7 = August

interface ScheduleComponentProps {
  timezone: string;
  schedule: ScheduleEntity[];
}

const Schedule: React.FC<ScheduleComponentProps> = ({ timezone, schedule }) => {
  const { currentDate, displayedDates, navigateToPreviousDate, navigateToNextDate } = useSchedule(developmentDate);
  const { expandedDates, selectedTime, getTimesForDate, onMoreClick, onLessClick, onTimeClick } = useScheduleState(schedule);

  return (
    <div className="schedule">
      <div className="header">
        <h2>Schedule your session!</h2>
        <p>Timezone: {timezone}</p>
      </div>
      <div className="navigation">
        <button onClick={navigateToPreviousDate} disabled={currentDate <= developmentDate} data-testid="prev-button" className={currentDate <= developmentDate ? 'disabled' : ''}>
          &lt;
        </button>
        <button onClick={navigateToNextDate} data-testid="next-button">
          &gt;
        </button>
      </div>
      <div className="calendar">
        {displayedDates.map((date, index) => {
          const { weekday, monthday } = formatDisplayDate(new Date(date));
          return (
            <div key={index} className="day">
              <div className="date">
                <span className="weekday">{weekday}</span>
                <span className="monthday">{monthday}</span>
              </div>
              <div className="times">
                {Array.from({ length: expandedDates.includes(date) ? getTimesForDate(date).length : 5 }).map((_, idx) => {
                  const times = getTimesForDate(date);
                  const time = times[idx] || '-';
                  return (
                    <button
                      key={idx}
                      className={`time-slot ${selectedTime.date === date && selectedTime.time === time ? 'selected' : ''}`}
                      onClick={() => time !== '-' && onTimeClick(date, time)}
                      disabled={time === '-'}
                    >
                      {time}
                    </button>
                  );
                })}
                {getTimesForDate(date).length > 5 && !expandedDates.includes(date) && (
                  <button className="more-button" onClick={() => onMoreClick(date)}>More</button>
                )}
                {expandedDates.includes(date) && (
                  <button className="more-button" onClick={() => onLessClick(date)}>Less</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedTime.time && (
        <div className="schedule-button">
          {(() => {
            const { weekday, monthday } = formatDisplayDate(new Date(selectedTime.date));
            return (
              <button>
                Schedule for {monthday} {selectedTime.time} -- {weekday}
              </button>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default Schedule;