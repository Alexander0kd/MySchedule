import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getActiveProfile, updateProfileById } from '../../../services/local-storage.service';
import { getUniqueSchedule, handleError } from '../../../services/utility.service';
import { ScheduleItem } from './ScheduleItem';
import { IHiddenItem } from '../../../shared/interfaces/settings.interface';
import { LoadingScreen } from '../../../shared/components/LoadingScreen';

export const ScheduleList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<IHiddenItem[]>([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const profile = await getActiveProfile();

            const scheduleSettings = profile.settings.hidden;
            const uniqueSchedule = getUniqueSchedule(profile.schedule);

            uniqueSchedule.forEach((item: string) => {
                if (!scheduleSettings.some((scheduleItem) => scheduleItem.l === item) && !item.includes('Письм.Екз.-')) {
                    scheduleSettings.push({
                        l: item,
                        isVisible: true,
                    });
                }
            });

            scheduleSettings.sort((a, b) => a.l.localeCompare(b.l));

            setSubjects(scheduleSettings);
            setIsLoading(false);
        } catch (error) {
            handleError(error);
        }
    };

    const onVisibilityChange = async (item: IHiddenItem) => {
        try {
            const profile = await getActiveProfile();
            const scheduleSettings = profile.settings.hidden;

            const hiddenItem = scheduleSettings.findIndex((itm) => itm.l === item.l);
            if (hiddenItem !== -1) {
                scheduleSettings[hiddenItem].isVisible = item.isVisible;
            } else {
                scheduleSettings.push(item);
            }

            profile.settings.hidden = scheduleSettings;
            updateProfileById(profile.id, profile, true);

            await fetchData();
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {subjects.map((subject, index) => (
                    <ScheduleItem key={index} subject={subject} onVisibilityChange={onVisibilityChange}></ScheduleItem>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 24,
    },
});
