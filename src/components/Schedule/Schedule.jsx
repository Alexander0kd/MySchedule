import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ScrollView, Text, RefreshControl } from 'react-native';
import Dropdown from './Dropdown.jsx';
import DateBlock from "./DateBlock";
import CreateDefaultModel from "../../services/create-default-model";
import { GetSchedule } from "../../services/local-storage.service";


export default function Schedule() {
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ lastUpdateDate, setLastUpdateDate ] = useState('');
    const [ lastUpdateTime, setLastUpdateTime ] = useState('');
    const [ schedule, setSchedule ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const {
        setFacultyId,
        setYear,
        setGroupId,
        data
    } = CreateDefaultModel();

    useEffect(() => {
        setFacultyId(1002);
        setYear('2023-2024-2');
        setGroupId(8567);
        fetchSchedule().then();
    }, [ currentDate ]);

    const fetchSchedule = async () => {
        try {
            const formattedDate = currentDate.toISOString().split('T')[0];
            const paddedGroupId = String(data.groupId).padStart(6, '0');
            // await SetSchedule(
            //     AvailableUni.PNU,
            //     paddedGroupId,
            //     data.year,
            //     data.facultyId,
            // );

            const schedule = await GetSchedule(paddedGroupId);


            const filteredSchedule = schedule.filter(lesson => lesson.d === formattedDate);
            setSchedule(filteredSchedule);
            
            const dateDay = schedule[0].lastUpdate.dateDay;
            const dateTime = schedule[0].lastUpdate.dateTime;

            setLastUpdateDate(dateDay);
            setLastUpdateTime(dateTime);


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
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward}/>
                <View style={{ ...styles.container, marginTop: 60 }}>
                    <StatusBar style="auto"/>
                    {schedule.length === 0 ? (
                        <Text style={styles.noClassesText}>Сьогодні немає пар:)</Text>
                    ) : (
                        schedule.map((lesson) => (
                            <Dropdown key={lesson.id} lesson={lesson}/>
                        ))
                    )}
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
    noClassesText:{
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        color: "white",
    }
});
