import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileList } from './ProfileList/ProfileList';
import { ProfileEdit } from './ProfileEdit/ProfileEdit';
import { ProfileAdd } from './ProfileAdd/ProfileAdd';

export const ProfileStack = () => {
    const Stack = createStackNavigator();

    const screenOptions = {
        initialRouteName: 'ProfileList',
        headerStyle: { backgroundColor: '#4F378B' },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: '#141218' },
    };

    const modalScreenOptions = {
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="ProfileList"
                component={ProfileList}
                options={{
                    title: 'Налаштування профілів',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="ProfileEdit"
                component={ProfileEdit}
                options={{
                    title: 'Редагувати профіль',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="ProfileAdd"
                component={ProfileAdd}
                options={{
                    title: 'Новий профіль',
                    ...modalScreenOptions,
                }}
            />
        </Stack.Navigator>
    );
};
