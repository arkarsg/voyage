import React, { useState } from 'react';
import { Calendar, type DateData } from 'react-native-calendars';
import { eachDayOfInterval, format, isBefore, isWithinInterval } from 'date-fns';

interface MarkedDate {
  selected?: boolean;
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  disableTouchEvent?: boolean;
  dotColor?: string;
  marked?: boolean;
  dotMarked?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
}

type MarkedDatesType = Record<string, MarkedDate>;

interface TripCalendarProps {
  initialStartDate: Date | undefined;
  initialEndDate: Date | undefined;
  handleStartDateChange: (newStartDate: Date | undefined) => void;
  handleEndDateChange: (newEndDate: Date | undefined) => void;
}

export default function TripCalendar({
  initialStartDate,
  initialEndDate,
  handleStartDateChange,
  handleEndDateChange,
}: TripCalendarProps): React.JSX.Element {
  const today: string = format(new Date(), 'yyyy-MM-dd');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(initialStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(initialEndDate);
  // TODO: use Tamagui colors
  const selectedColor = 'purple';
  const markedDates: MarkedDatesType = {};

  const handleDayPress = (day: DateData): void => {
    const selectedDay = new Date(day.dateString);
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDay);
      handleStartDateChange(selectedDay);
      setSelectedEndDate(undefined);
    } else if (selectedStartDate && isBefore(selectedDay, selectedStartDate)) {
      setSelectedStartDate(selectedDay);
      handleStartDateChange(selectedDay);
    } else {
      setSelectedEndDate(selectedDay);
      handleEndDateChange(selectedDay);
    }
  };

  if (selectedStartDate) {
    markedDates[format(selectedStartDate, 'yyyy-MM-dd')] = {
      selected: true,
      startingDay: true,
      color: selectedColor,
    };
  }

  if (selectedStartDate && selectedEndDate) {
    eachDayOfInterval({
      start: selectedStartDate,
      end: selectedEndDate,
    })
      .filter((date) => isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate }))
      .forEach((date) => {
        markedDates[format(date, 'yyyy-MM-dd')] = { selected: true, color: selectedColor };
      });
  }

  if (selectedEndDate) {
    markedDates[format(selectedEndDate, 'yyyy-MM-dd')] = {
      selected: true,
      endingDay: true,
      color: selectedColor,
    };
  }

  return (
    <Calendar
      initialDate={today}
      minDate={today}
      monthFormat={'MMM yyyy'}
      hideExtraDays={true}
      enableSwipeMonths={true}
      markingType={'period'}
      markedDates={markedDates}
      onDayPress={(day) => {
        handleDayPress(day);
      }}
    />
  );
}
