import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DatePickerModal from './DatePickerModal';

const CustomHeader = ({ navigation }: { navigation: any }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <>
      {/* Calendar Button in Header */}
      <TouchableOpacity onPress={() => setOpen(true)} style={{ marginRight: 15 }}>
        <Icon name="calendar" size={24} color="black" />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePickerModal open={open} setOpen={setOpen} date={date} setDate={setDate} />
    </>
  );
};

export const MenuButton = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
    <Icon name="menu" size={24} color="black" />
  </TouchableOpacity>
);

export default CustomHeader;
