import React, { useEffect, useState } from 'react';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { View, StyleSheet, ScrollView, Text, RefreshControl, Dimensions } from 'react-native';
import { DropDown } from './Dropdown';
import { DateBlock } from './DateBlock';
import { DatePicker } from './DatePicker';
import { getActiveProfile, updateProfileData } from '../../services/profile.service';
import { IProfile } from '../../shared/interfaces/profile.interface';
import { getGroupSchedule } from '../../services/schedule-api.service';
import { UniEndpoints } from '../../shared/universities/uni-endpoints.enum';
import { ISchedule } from '../../shared/interfaces/schedule.interface';
import { filterSchedule, formatDateWithTime, handleError } from '../../services/utility.service';
import { LoadingScreen } from '../../shared/components/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import { handleNotifyList } from '../../services/notification.service';

const { width, height } = Dimensions.get('window');

export const Schedule = () => {
    const isFocused = useIsFocused();

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
        setFilteredSchedule(filterSchedule(currentDate, activeProfile));
    }, [currentDate]);

    useEffect(() => {
        setIsLoading(true);
        if (isFocused) {
            loadData();
        }
    }, [isFocused]);

    const loadData = async () => {
        try {
            setIsLoading(true);

            const profile = await getActiveProfile();

            const schedule: ISchedule[] = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);

            if (schedule && schedule.length > 0 && profile.schedule !== schedule) {
                profile.schedule = schedule;
            }
            profile.lastUpdate = new Date();

            setActiveProfile(profile);

            await updateProfileData(profile.id, profile).then(() => {
                setFilteredSchedule(filterSchedule(currentDate, profile));
                setIsLoading(false);
            });
        } catch (error) {
            handleError(error, `Виникла помилка під оновлення розкладу!`);
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

    const isHasNotificaton = (lesson: ISchedule) => {
        const findProfile = activeProfile.settings.notification.notificationList.find(
            (item) =>
                item.subject.d === lesson.d &&
                item.subject.li === lesson.li &&
                item.subject.ld === lesson.ld &&
                item.subject.ls === lesson.ls &&
                item.subject.l === lesson.l
        );

        return findProfile != undefined;
    };

    const addNotification = async (date: Date, lesson: ISchedule) => {
        const obj = {
            date: date,
            subject: lesson,
        };

        const item = activeProfile.settings.notification.notificationList.find((item) => item.subject === obj.subject);
        if (!item) {
            activeProfile.settings.notification.notificationList.push({
                date: date,
                subject: lesson,
            });
            await updateProfileData(activeProfile.id, activeProfile);
            await handleNotifyList(activeProfile.settings.notification.notificationList);
        }
    };

    const removeNotification = async (lesson: ISchedule) => {
        const index = activeProfile.settings.notification.notificationList.findIndex(
            (item) =>
                item.subject.d === lesson.d &&
                item.subject.li === lesson.li &&
                item.subject.ld === lesson.ld &&
                item.subject.ls === lesson.ls &&
                item.subject.l === lesson.l
        );

        if (index !== -1) {
            activeProfile.settings.notification.notificationList.splice(index, 1);
            await updateProfileData(activeProfile.id, activeProfile);
            await handleNotifyList(activeProfile.settings.notification.notificationList);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
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
                                filteredSchedule.map((lesson: ISchedule, index: number) => (
                                    <DropDown
                                        key={`${lesson.d}-${index}`}
                                        lesson={lesson}
                                        hasNotification={isHasNotificaton(lesson)}
                                        addNotificationFn={addNotification}
                                        removeNotificationFn={removeNotification}></DropDown>
                                ))
                            )}
                        </View>
                    </ScrollView>
                    <Text style={styles.update}>Останнє оновлення: {formatDateWithTime(activeProfile.lastUpdate)}</Text>
                </View>
            </PanGestureHandler>
            {isDatePickerOpen && <DatePicker handleDataPickerOpen={handleDataPickerOpen} handleSetDate={handleSetDate} />}
        </View>
    );
};
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
