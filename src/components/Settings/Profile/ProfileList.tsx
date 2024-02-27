import React, { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { setActiveProfile, deleteProfileById, getAllProfiles, getActiveProfile } from '../../../services/local-storage.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../../shared/env/available-routes';
import { IProfile } from '../../../shared/interfaces/profile.interface';

export const ProfileList = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeProfileId, setActiveProfileId] = useState<string>(null);

    const loadProfiles = async () => {
        const profiles = await getAllProfiles();
        const activeProfile = await getActiveProfile();
        if (activeProfile) {
            setActiveProfileId(activeProfile.id);
        }
        setAllProfiles(profiles);
        setLoading(false);
    };

    useEffect(() => {
        loadProfiles();
    }, []);

    const deleteProfile = async (id: string) => {
        await deleteProfileById(id, navigation);
        loadProfiles();
    };

    const activeProfile = async (id: string) => {
        await setActiveProfile(id, navigation);
    };

    const addProfile = () => {
        navigation.replace('OnboardingPage');
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={{ gap: 20, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: '#fff' }}>Список всіх Профілів | Активний: {activeProfileId}</Text>
            <View style={{ gap: 40 }}>
                {allProfiles.map((profile) => (
                    <View key={profile.id} style={{ gap: 10 }}>
                        <Button title={`DELETE PROFILE ${profile.id}`} color="red" onPress={() => deleteProfile(profile.id)} />
                        <Button title={`ACTIVATE PROFILE ${profile.id}`} color="red" onPress={() => activeProfile(profile.id)} />
                    </View>
                ))}
                <View>
                    <Button title="Add profile" color="red" onPress={() => addProfile()} />
                </View>
            </View>
        </View>
    );
};