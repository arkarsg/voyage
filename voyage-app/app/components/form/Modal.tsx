import React from 'react';
import { Adapt, Button, Dialog, Sheet, XStack, H3 } from 'tamagui';
import TripCalendar from './TripCalendar';

export function DatePicker(): React.JSX.Element {
  return <DatePickerInstance />;
}

function DatePickerInstance(): React.JSX.Element {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="quick" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>
            <H3>🏝️ Trip date</H3>
          </Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you are done.
          </Dialog.Description>
          <TripCalendar />
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
