import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserCard from '../app/components/ui/UserCard';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

describe('UserCard Component', () => {
  const mockUser = {
    displayName: 'John Doe',
    email: 'john@example.com',
    photoURL: 'https://example.com/avatar.jpg',
  };

  const mockSignOut = jest.fn();

  test('renders user information correctly', () => {
    const { getByText, getByLabelText } = render(
      <TamaguiProvider config={config}>
        <UserCard user={mockUser} signOut={mockSignOut} />
      </TamaguiProvider>
    );

    expect(getByText(mockUser.displayName)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
    expect(getByLabelText('You')).toBeTruthy();
  });

  test('calls signOut function when log out button is pressed', () => {
    const { getByText } = render(<UserCard user={mockUser} signOut={mockSignOut} />);

    fireEvent.press(getByText('Log out'));
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
