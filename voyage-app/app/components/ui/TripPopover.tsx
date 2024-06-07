import React from 'react';
import { Button, Input, Label, Popover, XStack, YStack, Stack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';

export default function TripPopover(): React.JSX.Element {
  return (
    <Stack marginRight="$3">
      <Popover allowFlip placement="bottom">
        <Popover.Trigger asChild>
          <Button circular chromeless size="$2" icon={<Feather name="briefcase" size={24} />} />
        </Popover.Trigger>
        <Popover.Content
          size="$5"
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
    </Stack>
  );
}
