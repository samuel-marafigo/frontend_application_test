import React, { useState, useEffect } from 'react';
import ProfessionalCard from './ProfessionalCard';
import Schedule from './Schedule';
import { ProfessionalEntity, ScheduleEntity } from '../interfaces';
import useFetch from '../hooks/useFetch';
import '../styles/App.css';

const App: React.FC = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalEntity | null>(null);
  const [availableSchedule, setAvailableSchedule] = useState<ScheduleEntity[]>([]);

  // Fetch the professional with ID 1
  const [fetchedProfessional, isProfessionalLoading, professionalError] = useFetch<ProfessionalEntity>('http://localhost:3000/professionals/1');

  // Fetch all available schedules
  const [fetchedSchedulesList, isScheduleLoading, scheduleError] = useFetch<ScheduleEntity[]>('http://localhost:3000/available_schedules');

  useEffect(() => {
    if (fetchedProfessional) {
      setSelectedProfessional(fetchedProfessional);
    }
  }, [fetchedProfessional]);

  useEffect(() => {
    if (fetchedSchedulesList) {
      const filteredSchedulesListByProfessionalId = fetchedSchedulesList.filter(schedule => schedule.professional_id === 1);
      setAvailableSchedule(filteredSchedulesListByProfessionalId);
    }
  }, [fetchedSchedulesList]);

  if (isProfessionalLoading || isScheduleLoading) return <div>Loading...</div>;
  if (professionalError || scheduleError) return <div>Error: {professionalError || scheduleError}</div>;

  if (!selectedProfessional) return <div>Error loading the selected professional.</div>;

  return (
    <div className="app">
      <ProfessionalCard {...selectedProfessional} />
      <Schedule timezone={selectedProfessional.timezone} schedule={availableSchedule} />
    </div>
  );
};

export default App;