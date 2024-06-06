import React from 'react';
import { render } from '@testing-library/react-native';
import UserCard from '@components/ui/UserCard';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

describe('UserCard Component', () => {
  const mockUser = {
    displayName: 'John Doe',
    email: 'john@example.com',
    photoURL: 'https://example.com/avatar.jpg',
  };

  test('renders user information correctly', () => {
    const { getByText, getByLabelText } = render(
      <TamaguiProvider config={config}>
        <UserCard user={mockUser} />
      </TamaguiProvider>
    );

    expect(getByText(mockUser.displayName)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
    expect(getByLabelText('You')).toBeTruthy();
  });
});
