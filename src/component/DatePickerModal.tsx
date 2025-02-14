import React from 'react';
import DatePicker from 'react-native-date-picker';

const DatePickerModal = ({
  open,
  setOpen,
  date,
  setDate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  date: Date;
  setDate: (date: Date) => void;
}) => {
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      mode="date"
      onConfirm={(selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        console.log('Selected Date:', selectedDate);
      }}
      onCancel={() => setOpen(false)}
    />
  );
};

export default DatePickerModal;
