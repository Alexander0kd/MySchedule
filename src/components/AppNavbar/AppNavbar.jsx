import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ScheduleIcon from '../../../assets/schedule.png';
import NotesIcon from '../../../assets/notes.png';
import SettingsIcon from '../../../assets/setting.png';
import InformationIcon from '../../../assets/info.png';
import Schedule from '../Schedule/Schedule';
import NotesList from '../Notes/NotesList';
import Settings from '../Settings/Settings';
import Information from '../Information/Information';

export default function AppNavbar() {
    const window = useWindowDimensions();

    const Tab = createBottomTabNavigator();

    const tabBarIconStyle = (focused) => ({
        ...styles.icon,
        backgroundColor: focused ? '#4A4458' : '#211F26',
        marginTop: window.width <= 768 ? 7 : 0,
    });

    const tabBarLabelStyle = {
        ...styles.label,
        marginBottom: window.width <= 768 ? 7 : 0,
        marginLeft: window.width <= 768 ? 0 : 30,
    };

    const getTabScreenOptions = (label, icon) => ({
        tabBarLabel: () => <Text style={tabBarLabelStyle}>{label}</Text>,
        tabBarIcon: ({ focused }) => (
            <View style={tabBarIconStyle(focused)}>
                <Image source={icon} style={{ width: 20, height: 20 }} />
            </View>
        ),
    });

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#4F378B' },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#211F26',
                    height: 60,
                    borderTopWidth: 0,
                },
            }}>
            <Tab.Screen name="Розклад" component={Schedule} options={getTabScreenOptions('Розклад', ScheduleIcon)} />
            <Tab.Screen name="Нотатки" component={NotesList} options={getTabScreenOptions('Нотатки', NotesIcon)} />
            <Tab.Screen
                name="Налаштування"
                component={Settings}
                options={{
                    headerShown: false,
                    ...getTabScreenOptions('Налаштування', SettingsIcon),
                }}
            />
            <Tab.Screen
                name="Інформація"
                component={Information}
                options={{
                    headerShown: false,
                    ...getTabScreenOptions('Інформація', InformationIcon),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#332D41',
        width: 46,
        height: 24,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'white',
        fontSize: 11,
    },
});
