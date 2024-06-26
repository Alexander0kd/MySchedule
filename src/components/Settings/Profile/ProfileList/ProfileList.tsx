import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { setActiveProfile, deleteProfileById, getAllProfiles, getActiveProfile } from '../../../../services/profile.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../../../environment/available-routes';
import { IProfile } from '../../../../interfaces/profile.interface';
import { LoadingScreen } from '../../../../shared/LoadingScreen';
import { RoundButton } from '../../../../shared/RoundButton';
import { openModal } from '../../../../utils/utility.service';
import { ProfileDropdown } from './ProfileDropdown';

export const ProfileList = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState<boolean>(true);

    const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
    const [activeProfileId, setActiveProfileId] = useState<string>(null);

    const loadProfiles = async () => {
        setLoading(true);
        const profiles = await getAllProfiles();
        const activeProfile = await getActiveProfile();
        if (activeProfile) {
            setActiveProfileId(activeProfile.id);
        }
        setAllProfiles(profiles);
        setLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            loadProfiles();
        }
    }, [isFocused]);

    const deleteProfile = async (id: string) => {
        const isDelete = await openModal(
            'Бажаєте видалити профіль?',
            'Всі дані цього профілю будуть видалені без можливості повернути їх',
            'Скасувати',
            'Видалити'
        );

        if (isDelete) {
            await deleteProfileById(id, navigation);
            loadProfiles();
        }
    };

    const activeProfile = async (id: string) => {
        await setActiveProfile(id, navigation);
    };

    const addProfile = () => {
        navigation.navigate('ProfileAdd');
    };

    const editProfile = (id: string) => {
        navigation.navigate('ProfileEdit', {
            profileId: id,
        });
    };

    if (loading) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {allProfiles.map((profile: IProfile) => (
                    <ProfileDropdown
                        key={`${profile.id}`}
                        profile={profile}
                        isProfileActive={activeProfileId === profile.id}
                        deleteProfileFn={deleteProfile}
                        activeProfileFn={activeProfile}
                        editProfileFn={editProfile}
                    />
                ))}
                <View style={styles.wrapper}>
                    <RoundButton iconPosition="center" icon="add" label="Додати профіль" onPressFn={() => addProfile()} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        paddingTop: 16,
        paddingBottom: 16,
    },
    wrapper: {
        marginHorizontal: 24,
    },
});
