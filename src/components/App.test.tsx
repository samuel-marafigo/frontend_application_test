import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import useFetch from '../hooks/useFetch';

// Mocking useFetch hook
jest.mock('../hooks/useFetch');

const mockedUseFetch = useFetch as jest.Mock;


describe('App Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('when data is loading, Loading... should be displayed', () => {
    mockedUseFetch.mockReturnValue([null, true, null]);

    render(<App />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});
