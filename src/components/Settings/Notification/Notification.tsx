import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScheduleChanges } from './ScheduleChanges';
import { NotifyByDropdown } from './NotifyByDropdown';
import RemindersList from './RemindersList';
import { IProfile } from '../../../interfaces/profile.interface';
import { getActiveProfile, updateProfileData } from '../../../services/profile.service';
import { LoadingScreen } from '../../../shared/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import { handleNotifyBy, handleNotifyChanges, handleNotifyList } from '../../../services/notification.service';

export const Notification = () => {
    const isFocused = useIsFocused();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<IProfile>(null);

    const loadProfile = async () => {
        setIsLoading(true);
        const activeProfile = await getActiveProfile();
        if (activeProfile) {
            setProfile(activeProfile);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadProfile();
        }
    }, [isFocused]);

    const toggleNotify = async (state: boolean) => {
        profile.settings.notification.notifyChanges = state;
        await updateProfileData(profile.id, profile);
        await handleNotifyChanges(profile.settings.notification.notifyChanges);
    };

    const changeNotifyBy = async (time: number) => {
        profile.settings.notification.notifyBy = time;
        await updateProfileData(profile.id, profile);
        await handleNotifyBy(profile.schedule, profile.settings.notification.notifyBy);
    };

    const deleteNotify = async (index: number) => {
        profile.settings.notification.notificationList.splice(index, 1);
        await updateProfileData(profile.id, profile);
        await handleNotifyList(profile.settings.notification.notificationList);
    };

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View style={styles.container}>
            <ScheduleChanges isActive={profile.settings.notification.notifyChanges} onChangeFn={toggleNotify}></ScheduleChanges>

            <NotifyByDropdown notificationTime={profile.settings.notification.notifyBy} onChangeFn={changeNotifyBy}></NotifyByDropdown>

            <RemindersList list={profile.settings.notification.notificationList} onDeleteFn={deleteNotify}></RemindersList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
});
