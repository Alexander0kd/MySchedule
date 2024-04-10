import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getActiveProfile, updateProfileData } from '../../../services/profile.service';
import { getUniqueSchedule, handleError } from '../../../utils/utility.service';
import { ScheduleItem } from './ScheduleItem';
import { IHiddenItem } from '../../../interfaces/settings.interface';
import { LoadingScreen } from '../../../shared/LoadingScreen';

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
            handleError(error, `Виникла помилка під час отримання списку предметів!`);
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
            updateProfileData(profile.id, profile);

            await fetchData();
        } catch (error) {
            handleError(error, `Виникла помилка під час зміни видимості предмету!`);
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
