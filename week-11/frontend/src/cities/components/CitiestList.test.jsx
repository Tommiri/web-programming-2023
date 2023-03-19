import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import CitiesList from './CitiesList';

const TEST_CITIES_DATA = [
  {
    id: 1,
    capital: 'Maputo',
    country: 'Mozambique',
    image:
      'https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/africa/mozambique/maputo/destinations-maputo-banner-mobile-1024x553.jpg',
  },
  {
    id: 2,
    capital: 'Cairo',
    country: 'Egypt',
    image: 'https://ychef.files.bbci.co.uk/976x549/p07zy3y6.jpg',
  },
  {
    id: 3,
    capital: 'Luanda',
    country: 'Angola',
    image:
      'https://www.norwep.com/events/decarbonisation-and-low-emission-delegation-to-angola/_/attachment/inline/83a994ba-fe2a-4ff1-9b57-fff9bb8ab336:a5111e8b8358dc7066ba1bce9d63c62873075bd9/Luanda3.png',
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('The CitiesList', () => {
  it('should show no cities found when no cities are available', () => {
    render(<CitiesList items={[]} />);
    expect(screen.getByText('No cities found!')).toBeInTheDocument();
  });
  it('should show the cities when available', () => {
    render(<CitiesList items={TEST_CITIES_DATA} />, { wrapper });

    expect(screen.queryByText('No cities found!')).toBeNull();
    expect(
      screen.getByText('Maputo - Mozambique')
    ).toBeInTheDocument();
    expect(screen.getByText('Cairo - Egypt')).toBeInTheDocument();
    expect(screen.getByText('Luanda - Angola')).toBeInTheDocument();
  });
});
