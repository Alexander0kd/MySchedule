import * as React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import Dropdown from './Dropdown.jsx';
import DateBlock from './DateBlock.jsx';
import { useState, useEffect } from 'react';
import { getGroupSchedule } from '../../services/schedule-api.service.js';
import { AvailableUni } from '../../shared/enums/available-uni.enum.js';
import CreateDefaultModel from '../../services/create-default-model.js';

export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [lastUpdateDate, setLastUpdateDate] = useState('');
    const [lastUpdateTime, setLastUpdateTime] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const { setFacultyId, setYear, setGroupId, data } = CreateDefaultModel();

    useEffect(() => {
        setFacultyId(1002);
        setYear('2023-2024-2');
        setGroupId(8567);
        fetchSchedule().then();
    }, [currentDate]);

    const fetchSchedule = async () => {
        try {
            const formattedDate = currentDate.toISOString().split('T')[0];
            const paddedGroupId = String(data.groupId).padStart(6, '0');
            const scheduleData = await getGroupSchedule(AvailableUni.PNU, paddedGroupId, data.year, data.facultyId);

            const filteredSchedule = scheduleData.filter((lesson) => lesson.d === formattedDate);
            setSchedule(filteredSchedule);

            const updateDateTime = new Date();
            const updateDate = updateDateTime.toLocaleDateString('uk-UA');
            const updateTime = updateDateTime.toLocaleTimeString('uk-UA');

            setLastUpdateDate(updateDate);
            setLastUpdateTime(updateTime);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchSchedule();
        setRefreshing(false);
    };

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

    return (
        <View style={styles.container}>
            <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ ...styles.container, marginTop: 60 }}>
                    {schedule.map((lesson, index) => (
                        <Dropdown key={index} lesson={lesson} />
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
