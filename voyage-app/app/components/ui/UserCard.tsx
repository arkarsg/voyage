import React from 'react';
import { Card, H3, XStack, YStack, Paragraph, Avatar } from 'tamagui';
import type { IUserCard } from '../../types';

const UserCard = ({ user }: IUserCard): React.JSX.Element => {
  return (
    <Card bordered borderRadius="$6" margin="$1">
      <Card.Header padded>
        <XStack alignItems="center" gap="$3">
          <Avatar circular size="$4">
            <Avatar.Image accessibilityLabel="You" src={user.photoURL} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack>
            <H3>{user.displayName}</H3>
            <Paragraph>{user.email}</Paragraph>
          </YStack>
        </XStack>
      </Card.Header>
    </Card>
  );
};

export default UserCard;
