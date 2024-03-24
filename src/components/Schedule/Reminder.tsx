import React, { FunctionComponent } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const Reminder: FunctionComponent<{
    date: Date;
    onCancelFn: () => void;
    onSubmitFn: (date: Date) => void;
}> = (props) => {
    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        if (event.type === 'set') {
            props.onSubmitFn(selectedDate);
        }

        if (event.type === 'dismissed' || event.type === 'neutralButtonPressed') {
            props.onCancelFn();
        }
    };
    return (
        <RNDateTimePicker
            value={props.date}
            mode="time"
            is24Hour={true}
            display="clock"
            onChange={onChange}
        />
    );
};
