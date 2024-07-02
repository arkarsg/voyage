import React from 'react';
import { Adapt, Button, Dialog, Sheet, XStack, H3, Text } from 'tamagui';
import TripCalendar from './TripCalendar';

interface DatePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (newStartDate: Date | undefined) => void;
  onEndDateChange: (newEndDate: Date | undefined) => void;
}

const DatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DatePickerProps): React.JSX.Element => {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>
          <Text>
            {startDate?.getDate()} -- {endDate?.getDate()}
          </Text>
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm">
        <Sheet
          animation="quick"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
          snapPointsMode="percent"
          snapPoints={[65]}
        >
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
          <Dialog.Description>Pick the start date and end date of your voyage</Dialog.Description>
          <TripCalendar
            initialStartDate={startDate}
            initialEndDate={endDate}
            handleStartDateChange={onStartDateChange}
            handleEndDateChange={onEndDateChange}
          />
          <XStack alignSelf="center" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button flex={1} theme="purple" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default DatePicker;
