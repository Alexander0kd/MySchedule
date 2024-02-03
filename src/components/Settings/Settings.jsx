import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsButtons from './SettingsButtons';
import ProfileList from './Profile/ProfileList';
import Notification from './Notification/Notification';
import SettingsShedule from './Schedule/SettingsShedule';
const Stack = createStackNavigator();

export default function Settings() {
    return (
        <View style={styles.background}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#4F378B' },
                    headerTintColor: 'white',
                    cardStyle: { backgroundColor: '#141218' },
                }}>
                <Stack.Screen
                    name="SettingsBs"
                    component={SettingsButtons}
                    options={{
                        title: 'Налаштування',
                    }}
                />
                <Stack.Screen
                    name="SettingsProfile"
                    component={ProfileList}
                    options={{
                        title: 'Налаштування профілів',
                    }}
                />
                <Stack.Screen
                    name="SettingsNotification"
                    component={Notification}
                    options={{
                        title: 'Налаштування сповіщень',
                    }}
                />
                <Stack.Screen
                    name="SettingsSche"
                    component={SettingsShedule}
                    options={{
                        title: 'Налаштування занять',
                    }}
                />
            </Stack.Navigator>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.1,
        marginLeft: 16,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'flex-start',
    },
    background: {
        flex: 1,
        backgroundColor: '#141218',
    },
});
