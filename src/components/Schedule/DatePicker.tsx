import React, { FunctionComponent, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const DatePicker: FunctionComponent<{
    handleDataPickerOpen: (value: boolean) => void;
    handleSetDate: (value: Date) => void;
}> = (props) => {
    const [date, setDate] = useState(new Date());

    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            props.handleDataPickerOpen(false);
            setDate(currentDate);
            props.handleSetDate(currentDate);
        }

        if (event.type === 'dismissed' || event.type === 'neutralButtonPressed') {
            props.handleDataPickerOpen(false);
        }
    };

    return <DateTimePicker value={date} mode="date" display="calendar" onChange={onChange} />;
};
