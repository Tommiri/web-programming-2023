import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import NavLinks from './NavLinks';

describe('The Navigation Links', () => {
  it('should only show ALL CITIES and AUTHENTICATE when not logged in', () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          token: null,
          userId: null,
          login: () => {},
          logout: () => {},
        }}
      >
        <Router>
          <NavLinks />;
        </Router>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('ALL CITIES')).toBeInTheDocument();
    expect(screen.getByText('ALL CITIES')).toHaveAttribute(
      'href',
      '/'
    );

    expect(screen.getByText('AUTHENTICATE')).toBeInTheDocument();
    expect(screen.getByText('AUTHENTICATE')).toHaveAttribute(
      'href',
      '/auth'
    );

    expect(screen.queryByText('ALL USERS')).toBeNull();
  });

  it('should show ALL CITIES, ALL USERS, ADD CITY and LOGOUT when logged in', () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: '1234567890-0987654321',
          userId: 'userId1',
          login: () => {},
          logout: () => {},
        }}
      >
        <Router>
          <NavLinks />;
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('ALL CITIES')).toBeInTheDocument();
    expect(screen.getByText('ALL CITIES')).toHaveAttribute(
      'href',
      '/'
    );

    expect(screen.queryByText('AUTHENTICATE')).toBeNull();

    expect(screen.getByText('ALL USERS')).toBeInTheDocument();
    expect(screen.getByText('ALL USERS')).toHaveAttribute(
      'href',
      '/users'
    );

    expect(screen.getByText('ADD CITY')).toBeInTheDocument();
    expect(screen.getByText('ADD CITY')).toHaveAttribute(
      'href',
      '/cities/new'
    );

    expect(
      screen.getByRole('button', { name: 'LOGOUT' })
    ).toBeInTheDocument();
  });
});
