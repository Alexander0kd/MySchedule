import React from 'react';
import { View } from 'react-native';
import {ScheduleChanges} from "./schedule-changes";
import {DropDown} from "./dropdown-pairing-notifications";
import RemindersList from "./reminders-list";


const testData = [
    { date: '13 грудня', time: '9:00', subject: 'Математика' },
    { date: '14 грудня', time: '10:30', subject: 'Фізика' },
    { date: '15 грудня', time: '12:00', subject: 'Історіяzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz' },
];

export const Notification = () => {
    return (
        <View>
            <ScheduleChanges/>
            <DropDown />
            <RemindersList lessons={testData}/>
        </View>
    );
};
