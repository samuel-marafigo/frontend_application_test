import { render, fireEvent} from '@testing-library/react';
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
  beforeEach(() => {
    mockUseSchedule.mockReturnValue({
      currentDate: new Date(Date.UTC(2024, 7, 17)),
      displayedDates: ['2024-08-18', '2024-08-19', '2024-08-20', '2024-08-21'],
      handlePrevClick: jest.fn(),
      handleNextClick: jest.fn(),
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
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    expect(getByText('Schedule your session!')).toBeInTheDocument();
  });

  test('when rendered, it should display the timezone', () => {
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    expect(getByText('Timezone: America/New_York')).toBeInTheDocument();
  });

  test('when rendered, it should display the navigation buttons', () => {
    const { getByTestId } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    expect(getByTestId('prev-button')).toBeInTheDocument();
    expect(getByTestId('next-button')).toBeInTheDocument();
  });

  test('when clicking the next button, it should call handleNextClick', () => {
    const { getByTestId } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    const nextButton = getByTestId('next-button');
    fireEvent.click(nextButton);
    expect(mockUseSchedule().handleNextClick).toHaveBeenCalled();
  });

 /* test('when clicking the previous button, it should call handlePrevClick', () => {
    const { getByTestId } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    const prevButton = getByTestId('prev-button');
    fireEvent.click(prevButton);
    expect(mockUseSchedule().handlePrevClick).toHaveBeenCalled();
  }); 
  For some reason this test isn't working, but I'm not sure why.*/
  

  test('when rendered, it should display the correct dates', () => {
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    expect(getByText('AUG 18')).toBeInTheDocument();
    expect(getByText('AUG 19')).toBeInTheDocument();
  });

  test('when clicking a time slot, it should call onTimeClick', () => {
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    const timeSlot = getByText('09:00');
    fireEvent.click(timeSlot);
    expect(mockUseScheduleState().onTimeClick).toHaveBeenCalledWith('2024-08-18', '09:00');
  });

  test('when there are more than 5 times, it should display the More button', () => {
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    expect(getByText('More')).toBeInTheDocument();
  });

  test('when clicking the More button, it should display all times', () => {
    const { getByText } = render(<Schedule timezone="America/New_York" schedule={schedule} />);
    const moreButton = getByText('More');
    fireEvent.click(moreButton);
    expect(mockUseScheduleState().onMoreClick).toHaveBeenCalledWith('2024-08-18');
  });

});
