import React, { useEffect, useState } from 'react';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { View, StyleSheet, ScrollView, Text, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { DropDown } from './Dropdown';
import { DateBlock } from './DateBlock';
import { DatePicker } from './DatePicker';
import { getActiveProfile, updateProfileById } from '../../services/local-storage.service';
import { IProfile } from '../../shared/interfaces/profile.interface';
import { getGroupSchedule } from '../../services/schedule-api.service';
import { UniEndpoints } from '../../shared/universities/uni-endpoints.enum';
import { ISchedule } from '../../shared/interfaces/schedule.interface';
import { filterShedule, formateDate } from '../../services/utility.service';

const { width, height } = Dimensions.get('window');

export default function Schedule() {
    const [activeProfile, setActiveProfile] = useState<IProfile>(null);
    const [filteredSchedule, setFilteredSchedule] = useState<ISchedule[]>(null);

    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
    const [isCanSwipe, setIsCanSwipe] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        updateSchedule();
    }, [currentDate]);

    const updateSchedule = () => {
        const schedule = filterShedule(currentDate, activeProfile);

        setFilteredSchedule(schedule);
    }

    const loadData = async () => {
        try {
            setIsLoading(true);
            
            await getActiveProfile().then(async (profile) => {
                const schedule: ISchedule[] = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);

                if (schedule && schedule.length > 0 && profile.schedule !== schedule) {
                    profile.schedule = schedule;
                }
                profile.lastUpdate = new Date();

                if (activeProfile !== profile) {
                    setActiveProfile(profile);
                    setCurrentDate(new Date());
                }
                updateSchedule();
    
                await updateProfileById(profile.id, profile);
            });

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadData();
        setIsRefreshing(false);
    };

    const handleDataPickerOpen = (status: boolean) => {
        setIsDatePickerOpen(status);
    };

    const handleSetDate = (receivedDate: Date) => {
        setCurrentDate(receivedDate);
    };

    const handleBackward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
        setIsCanSwipe(false);
    };

    const handleForward = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);
        setIsCanSwipe(false);
    };

    const onSwipeEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (isCanSwipe) {
            const { translationX } = event.nativeEvent;
            if (translationX > 0) {
                handleBackward();
            } else if (translationX < 0) {
                handleForward();
            }
        }
    };

    const onSwipeEnd = () => {
        setIsCanSwipe(true);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onSwipeEvent} onHandlerStateChange={onSwipeEnd} maxPointers={1} activeOffsetX={[-20, 20]}>
                <View style={{ flexGrow: 1 }}>
                    <DateBlock date={currentDate} onBackward={handleBackward} onForward={handleForward} handleDataPickerOpen={handleDataPickerOpen} />
                    <ScrollView style={{ marginTop: 45 }} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                        <View style={{ ...styles.container, paddingBottom: 48 }}>
                            {filteredSchedule.length === 0 ? (
                                <Text style={styles.noClassesText}>Сьогодні пар немає 😊</Text>
                            ) : (
                                filteredSchedule.map((lesson: ISchedule, index: number) => <DropDown key={`${lesson.d}-${index}`} lesson={lesson} />)
                            )}
                        </View>
                    </ScrollView>
                    <Text style={styles.update}>Останнє оновлення: {formateDate(activeProfile.lastUpdate)}</Text>
                </View>
            </PanGestureHandler>
            {isDatePickerOpen && <DatePicker handleDataPickerOpen={handleDataPickerOpen} handleSetDate={handleSetDate} />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#141218',
        borderBottomWidth: 0,
    },
    update: {
        backgroundColor: '#141218',
        color: '#CAC4D0',
        fontSize: 12,
        paddingVertical: 10,
        textAlign: 'center',

        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
    },
    noClassesText: {
        fontSize: 24,
        marginTop: height / 3,
        textAlign: 'center',
        color: 'white',
    },
});
