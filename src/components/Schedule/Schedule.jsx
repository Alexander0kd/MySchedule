import * as React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, Text } from 'react-native';
import Dropdown from './Dropdown.jsx';
import DateBlock from './DateBlock.jsx';
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
    const lastUpdateDate = '8 лютого';
    const lastUpdateTime = '7:00';

    const handleBackward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    const handleForward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    const filteredLessons = DATA.filter((lesson) => lesson.date === currentDate.toISOString().split('T')[0]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward} />
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    {filteredLessons.map((lesson) => (
                        <Dropdown key={lesson.id} lesson={lesson} />
                    ))}
                </View>
            </ScrollView>
            <View>
                <Text style={styles.update}>
                    Останнє оновлення: {lastUpdateDate} | {lastUpdateTime}
                </Text>
            </View>
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
