import * as React from 'react';
import { Text, View, StatusBar, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { deleteLocalProfileById, getUserById, editUserProfile } from '../../../services/localStorageService';

export default function ProfileList() {
    const navigation = useNavigation();
    const handleDeletePress = async () => {
        await deleteLocalProfileById('', navigation);
    };

    const editedProfileData = {
        faculty: 'faculty-edited',
        group: '1-edited',
        university: 'unik-edited',
        year: '2024-edited',
    };

    return (
        <View style={{ gap: 20 }}>
            <Text>Список всіх Профілів</Text>
            <StatusBar style="auto" />
            <Button title="DELETE CURRENT USER (TEST)" color="red" onPress={handleDeletePress} />
            <Button
                title="GET USER BY ID (TEST)"
                color="red"
                onPress={() => {
                    getUserById('');
                }}
            />
            <Button
                title="EDIT USER PROFILE BY ID (TEST)"
                color="red"
                onPress={() => {
                    editUserProfile('', editedProfileData);
                }}
            />
        </View>
    );
}
