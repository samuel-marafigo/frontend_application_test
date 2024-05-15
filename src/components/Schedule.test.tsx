import { render, fireEvent } from '@testing-library/react';
import Schedule from '../components/Schedule'; // Adjust the path as necessary
import useSchedule from '../hooks/useSchedule';
import useScheduleState from '../hooks/useScheduleState';
import { ScheduleEntity } from '../interfaces';

// Mock the hooks
jest.mock('../hooks/useSchedule');
jest.mock('../hooks/useScheduleState');

const mockUseSchedule = useSchedule as jest.Mock;
const mockUseScheduleState = useScheduleState as jest.Mock;

const schedule: ScheduleEntity[] = [
  {
    professional_id: 1,
    date: '2024-08-18',
    times: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
  },
  {
    professional_id: 1,
    date: '2024-08-19',
    times: ['14:00', '15:00', '16:00']
  }
];

describe('Schedule Component', () => {
  let navigateToPreviousDate: jest.Mock;
  let navigateToNextDate: jest.Mock;

  beforeEach(() => {
    navigateToPreviousDate = jest.fn();
    navigateToNextDate = jest.fn();
    
    mockUseSchedule.mockReturnValue({
      currentDate: new Date(Date.UTC(2024, 7, 17)),
      displayedDates: ['2024-08-18', '2024-08-19', '2024-08-20', '2024-08-21'],
      navigateToPreviousDate,
      navigateToNextDate,
    });

    mockUseScheduleState.mockReturnValue({
      expandedDates: [],
      selectedTime: { date: '', time: null },
      getTimesForDate: (date: string) => {
        const daySchedule = schedule.find(day => day.date === date);
        return daySchedule ? daySchedule.times : [];
      },
      onMoreClick: jest.fn(),
      onLessClick: jest.fn(),
      onTimeClick: jest.fn(),
    });
  });

  test('when rendered, it should display the schedule header', () => {
    const { getByText } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    expect(getByText('Schedule your session!')).toBeInTheDocument();
  });

  test('when rendered, it should display the timezone', () => {
    const { getByText } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    expect(getByText('Timezone: Lisbon')).toBeInTheDocument();
  });

  test('when rendered, it should display the navigation buttons', () => {
    const { getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    expect(getByTestId('prev-button')).toBeInTheDocument();
    expect(getByTestId('next-button')).toBeInTheDocument();
  });

  test('when clicking the next button, it should call navigateToNextDate', () => {
    const { getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    const nextButton = getByTestId('next-button');
    fireEvent.click(nextButton);
    expect(mockUseSchedule().navigateToNextDate).toHaveBeenCalled();
  });

  test('when clicking the previous button, it should call navigateToPreviousDate', () => {
    mockUseSchedule.mockReturnValueOnce({
      currentDate: new Date(Date.UTC(2024, 7, 19)), // Set current date so the button isn't disabled.
      displayedDates: ['2024-08-17', '2024-08-18', '2024-08-19', '2024-08-20'],
      navigateToPreviousDate,
      navigateToNextDate,
    });
  
    const { getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    const prevButton = getByTestId('prev-button');
    
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);
    expect(navigateToPreviousDate).toHaveBeenCalled();
  });

  test('when rendered, it should display the correct dates', () => {
    const { getByText, getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    const calendar = getByTestId('calendar');
    expect(calendar).toBeInTheDocument();
    expect(getByText('AUG 18')).toBeInTheDocument();
    expect(getByText('AUG 19')).toBeInTheDocument();
  });

  test('when clicking a time slot, it should call onTimeClick', () => {
    const { getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    const timeSlot = getByTestId('time-slot-0-0');
    fireEvent.click(timeSlot);
    expect(mockUseScheduleState().onTimeClick).toHaveBeenCalledWith('2024-08-18', '09:00');
  });

  test('when there are more than 5 times, it should display the More button', () => {
    const { getByTestId } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    expect(getByTestId('more-button-0')).toBeInTheDocument();
  });

  test('when clicking the More button, it should display all times', () => {
    const { getByTestId, getByText } = render(<Schedule timezone="Lisbon" schedule={schedule} />);
    const moreButton = getByTestId('more-button-0');
    fireEvent.click(moreButton);
    expect(mockUseScheduleState().onMoreClick).toHaveBeenCalledWith('2024-08-18');
  

    const daySchedule = schedule.find(day => day.date === '2024-08-18');
    const times = daySchedule ? daySchedule.times : [];
    times.forEach(time => {
      expect(getByText(time)).toBeInTheDocument();
    });
  });
});
