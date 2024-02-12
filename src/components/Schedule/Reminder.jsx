import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function Reminder({ onHide, onDismissed }) {
    const [date, setDate] = useState(new Date());
    const [mode] = useState('time');

    const onChange = (event, selectedDate) => {

        if (event.type === 'set' || event.type === 'confirm') {
            const currentDate = selectedDate || date;
            onHide();
            onDismissed(true);
            setDate(currentDate);
        }
        if (event.type === 'dismissed' || event.type === 'neutralButtonPressed') {
            onHide();
        }
    };
    return (
      <View>
          <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVariant="dark"
          />
          <StatusBar style="auto" />
      </View>
    );
}
