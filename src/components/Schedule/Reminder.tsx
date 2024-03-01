import React, { FunctionComponent, useState } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const Reminder: FunctionComponent<{
    onHide: () => void;
    onDismissed: (value: boolean) => void;
}> = (props) => {
    const [date, setDate] = useState<Date>(new Date());

    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            props.onHide();
            props.onDismissed(true);
            setDate(currentDate);
        }

        if (event.type === 'dismissed' || event.type === 'neutralButtonPressed') {
            props.onHide();
        }
    };
    return (
        <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVariant="dark"
        />
    );
};
