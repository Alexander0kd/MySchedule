import * as React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet, ScrollView, Text, StatusBar, RefreshControl } from 'react-native';
import Dropdown from './Dropdown.jsx';
import DateBlock from './DateBlock.jsx';
import DatePicker from './DatePicker.jsx';
import { useState } from 'react';
import CreateDefaultModel from "../../services/create-default-model";
import { GetSchedule } from "../../services/local-storage.service";


export default function Schedule() {
    const [swipeEnabled, setSwipeEnabled] = useState(true);
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
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward} handleDataPickerOpen={handleDataPickerOpen} />
                <View style={{ ...styles.container, marginTop: 60 }}>
                    {schedule.length === 0 ? (
                        <Text style={styles.noClassesText}>Сьогодні немає пар:)</Text>
                    ) : (
                        schedule.map((lesson) => (
                            <Dropdown key={lesson.id} lesson={lesson}/>
                        ))
                    )}
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
    noClassesText:{
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        color: "white",
    }
});
