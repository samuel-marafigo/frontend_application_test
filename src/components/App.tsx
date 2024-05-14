import React, { useState, useEffect } from 'react';
import ProfessionalCard from './ProfessionalCard';
import Schedule from './Schedule';
import { Professional, ScheduleDay } from '../interfaces';
import useFetch from '../hooks/useFetch';
import '../styles/App.css';

const App: React.FC = () => {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);

  // Fetch the professional with ID 1
  const [professionalData, loadingProfessional, errorProfessional] = useFetch<Professional>('http://localhost:3000/professionals/1');

  // Fetch all schedules
  const [scheduleData, loadingSchedule, errorSchedule] = useFetch<ScheduleDay[]>('http://localhost:3000/available_schedules');

  useEffect(() => {
    if (professionalData) {
      setProfessional(professionalData);
    }
  }, [professionalData]);

  useEffect(() => {
    if (scheduleData) {
      const filteredSchedules = scheduleData.filter(schedule => schedule.professional_id === 1);
      setSchedule(filteredSchedules);
    }
  }, [scheduleData]);

  if (loadingProfessional || loadingSchedule) return <div>Loading...</div>;
  if (errorProfessional || errorSchedule) return <div>Error: {errorProfessional || errorSchedule}</div>;

  if (!professional) return <div>Loading...</div>;

  console.log('Schedule:', schedule);

  return (
    <div className="app">
      <ProfessionalCard {...professional} />
      <Schedule timezone={professional.timezone} schedule={schedule} />
    </div>
  );
};

export default App;