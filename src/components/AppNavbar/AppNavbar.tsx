import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ImageSourcePropType, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ScheduleIcon from '../../../assets/schedule.png';
import NotesIcon from '../../../assets/notes.png';
import SettingsIcon from '../../../assets/setting.png';
import InformationIcon from '../../../assets/info.png';
import { Schedule } from '../Schedule/Schedule';
import { NotesList } from '../Notes/NotesList';
import { Settings } from '../Settings/Settings';
import { Information } from '../Information/Information';

export const AppNavbar = () => {
    const window = useWindowDimensions();
    const Tab = createBottomTabNavigator();
    
    const tabBarIconStyle = (focused: boolean) => ({
        ...styles.icon,
        backgroundColor: focused ? '#4A4458' : '#211F26',
        marginTop: window.width <= 768 ? 7 : 0,
    });

    const tabBarLabelStyle = {
        ...styles.label,
        marginBottom: window.width <= 768 ? 7 : 0,
        marginLeft: window.width <= 768 ? 0 : 30,
    };

    const getTabScreenOptions = (label: string, icon: ImageSourcePropType) => ({
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
            <Tab.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    headerTitle: 'Розклад',
                    ...getTabScreenOptions('Розклад', ScheduleIcon),
                }}
            />
            <Tab.Screen
                name="Notes"
                component={NotesList}
                options={{
                    headerTitle: 'Нотатки',
                    ...getTabScreenOptions('Нотатки', NotesIcon),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    headerTitle: 'Налаштування',
                    ...getTabScreenOptions('Налаштування', SettingsIcon),
                }}
            />
            <Tab.Screen
                name="Information"
                component={Information}
                options={{
                    headerShown: false,
                    headerTitle: 'Інформація',
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
