import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ handleDataPickerOpen, handleSetDate }) {
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        if (event.type === 'set' || event.type === 'confirm') {
            const currentDate = selectedDate || date;
            console.log(currentDate);
            handleDataPickerOpen(false);
            setDate(currentDate);
            handleSetDate(currentDate);
        }
        if (event.type === 'dismissed' || event.type === 'neutralButtonPressed') {
            handleDataPickerOpen(false);
        }
    };

    return (
        <View>
            <DateTimePicker value={date} themeVariant="dark" mode="date" display="calendar" onChange={onChange} />
        </View>
    );
}
