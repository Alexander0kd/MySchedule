import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import { SettingsButtons } from './SettingsButtons';
import { Notification } from './Notification/Notification';
import { SettingsShedule } from './Schedule/SettingsShedule';
import { ProfileMenu } from '../Navigation/ProfileMenu';
import { ProfileStack } from './Profile/ProfileStack';

export const Settings = () => {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerStyle: { backgroundColor: '#4F378B' },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: '#141218' },
        headerRight: () => <ProfileMenu />,
    };

    const modalScreenOptions = {
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="SettingsBs"
                component={SettingsButtons}
                options={{
                    title: 'Налаштування',
                }}
            />
            <Stack.Screen
                name="SettingsProfile"
                component={ProfileStack}
                options={{
                    headerShown: false,
                    title: 'Налаштування профілів',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="SettingsNotification"
                component={Notification}
                options={{
                    title: 'Налаштування сповіщень',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="SettingsShedule"
                component={SettingsShedule}
                options={{
                    title: 'Налаштування занять',
                    ...modalScreenOptions,
                }}
            />
        </Stack.Navigator>
    );
};
