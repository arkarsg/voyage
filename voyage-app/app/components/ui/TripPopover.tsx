import React from 'react';
import { Button, Input, Label, Popover, XStack, YStack } from 'tamagui';
import VoyageHeaderButton from './VoyageHeaderButton';

export default function TripPopover(): React.JSX.Element {
  return (
    <Popover size="$5" allowFlip placement="bottom">
      <Popover.Trigger asChild>
        <VoyageHeaderButton />
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <YStack space="$3">
          <XStack space="$3">
            <Label size="$3">Name</Label>
            <Input size="$3" />
          </XStack>

          <Popover.Close asChild>
            <Button size="$3">Submit</Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
