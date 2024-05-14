import { render } from '@testing-library/react';
import ProfessionalCard from '../components/ProfessionalCard'; // Adjust the path as necessary
import { Professional } from '../interfaces';

const professional: Professional = {
  id: 1,
  name: 'Dr. John Doe',
  role: 'Psychologist',
  location: 'New York, NY',
  price: 100,
  appointment_length: 30,
  description: 'Experienced Psychologist providing quality care.',
  timezone: 'America/New_York',
  total_reviews: 50,
  review_score: 4.7
};

describe('ProfessionalCard Component', () => {

  test('when rendered, it should display the professional name', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('Dr. John Doe')).toBeInTheDocument();
  });

  test('when rendered, it should display the role', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('Psychologist')).toBeInTheDocument();
  });

  test('when rendered, it should display the location', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('New York, NY')).toBeInTheDocument();
  });

  test('when rendered, it should display the price', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('R$100')).toBeInTheDocument();
  });

  test('when rendered, it should display the appointment length', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('30 minutes')).toBeInTheDocument();
  });

  test('when rendered, it should display the description', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('Experienced Psychologist providing quality care.')).toBeInTheDocument();
  });

  test('when rendered, it should display the correct number of stars based on review_score', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('⭐⭐⭐⭐⭐')).toBeInTheDocument();
  });

  test('when rendered, it should display the total number of reviews', () => {
    const { getByText } = render(<ProfessionalCard {...professional} />);
    expect(getByText('(50 reviews)')).toBeInTheDocument();
  });


});
