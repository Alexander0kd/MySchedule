import * as React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Dropdown from './Dropdown.jsx';
import DateBlock from './DateBlock.jsx';
import DatePicker from './DatePicker.jsx';
import { useState } from 'react';

const DATA = [
    {
        id: 'A1',
        date: '2024-02-10',
        title: 'Архітектоніка інформаційних систем та технологій',
        typeOfLesson: 'Лекція',
        group: 'ІСТ-31',
        audience: '316',
        teacher: 'Махней',
        time: '1 пара | 10:35-11:55',
    },
    {
        id: 'A2',
        date: '2024-02-10',
        title: 'Системне програмування1',
        typeOfLesson: 'Лекція',
        group: 'ІСТ-31',
        audience: '316',
        teacher: 'Махней',
        time: '1 пара | 10:35-11:55',
    },
    {
        id: 'A3',
        date: '2024-02-10',
        title: 'Системне програмування1',
        typeOfLesson: 'Лекція',
        group: 'ІСТ-31',
        audience: '316',
        teacher: 'Махней',
        time: '1 пара | 10:35-11:55',
    },
    {
        id: 'A4',
        date: '2024-02-09',
        title: 'Системне програмування2',
        typeOfLesson: 'Лекція',
        group: 'ІСТ-31',
        audience: '316',
        teacher: 'Махней',
        time: '1 пара | 10:35-11:55',
    },
    {
        id: 'A5',
        date: '2024-02-08',
        title: 'Системне програмування3',
        typeOfLesson: 'Лекція',
        group: 'ІСТ-31',
        audience: '316',
        teacher: 'Махней',
        time: '1 пара | 10:35-11:55',
    },
];

export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [swipeEnabled, setSwipeEnabled] = useState(true);
    const lastUpdateDate = '8 лютого';
    const lastUpdateTime = '7:00';

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleDataPickerOpen = (status) => {
        setIsDatePickerOpen(status);
    };

    const handleSetDate = (receivedDate) => {
        setCurrentDate(receivedDate);
    };

    const handleBackward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
        setSwipeEnabled(false);
    };

    const handleForward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
        setSwipeEnabled(false);
    };

    const filteredLessons = DATA.filter((lesson) => lesson.date === currentDate.toISOString().split('T')[0]);

    const onSwipeEvent = (event) => {
        if (swipeEnabled) {
            const { translationX } = event.nativeEvent;
            if (translationX > 0) {
                handleBackward();
            } else if (translationX < 0) {
                handleForward();
            }
        }
    };

    const onSwipeEnd = () => {
        setSwipeEnabled(true);
    };

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onSwipeEvent} onHandlerStateChange={onSwipeEnd} maxPointers={1} activeOffsetX={[-20, 20]}>
                <ScrollView>
                    <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward} handleDataPickerOpen={handleDataPickerOpen} />

                    <View style={styles.container}>
                        {filteredLessons.map((lesson) => (
                            <Dropdown key={lesson.id} lesson={lesson} />
                        ))}
                    </View>
                </ScrollView>
            </PanGestureHandler>
            <View>
                <Text style={styles.update}>
                    Останнє оновлення: {lastUpdateDate} | {lastUpdateTime}
                </Text>
            </View>
            {isDatePickerOpen && <DatePicker handleDataPickerOpen={handleDataPickerOpen} handleSetDate={handleSetDate} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        borderBottomWidth: 0,
    },
    update: {
        color: '#CAC4D0',
        fontSize: 12,
        margin: 10,
        textAlign: 'center',
        alignItems: 'flex-end',
    },
});
