import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getActiveProfile } from '../../../services/local-storage.service';
import { getUniqueSchedule, handleError } from '../../../services/utility.service';
import { ScheduleItem } from './ScheduleItem';
import { IHiddenSchedule } from '../../../shared/interfaces/settings.interface';
import { LoadingScreen } from '../../../shared/components/LoadingScreen';

export const ScheduleList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<IHiddenSchedule[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const profile = await getActiveProfile();
 
                const hiddenSchedule = profile.settings.hidden || [];
                const uniqueSchedule = getUniqueSchedule(profile);

                uniqueSchedule.forEach((item: string) => {
                    if (!hiddenSchedule.some((scheduleItem) => scheduleItem.l === item ) && !item.includes('Письм.Екз.-')) {
                        hiddenSchedule.push({
                            l: item,
                            isVisible: true
                        });
                    }
                });
                
                setSubjects(hiddenSchedule);
                setIsLoading(false);
            } catch (error) {
                handleError(error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {subjects.map((subject, index) => (
                    <ScheduleItem key={index} subject={subject}></ScheduleItem>
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
