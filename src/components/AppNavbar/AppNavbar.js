import * as React from 'react';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import ScheduleIcon from '../../../assets/schedule.svg';
import NotesIcon from '../../../assets/notes.svg';
import SettingsIcon from '../../../assets/settings.svg';
import InformationIcon from '../../../assets/info.svg';

import Schedule from '../Schedule/Schedule';
import NotesList from '../Notes/NotesList';
import Settings from '../Settings/Settings';
import Information from '../Information/Information';

export default function AppNavbar() {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateScreenWidth = () => {setScreenWidth(Dimensions.get('window').width);};
        Dimensions.addEventListener('change', updateScreenWidth);
        return () => { Dimensions.removeEventListener('change', updateScreenWidth);};
    }, []);

    const Tab = createBottomTabNavigator();

    const tabBarIconStyle = (focused) => ({
        ...styles.icon,
        backgroundColor: focused ? '#4A4458' : '#332D41',
        marginTop: screenWidth <= 768 ? 7 : 0,
    });

    const tabBarLabelStyle = {
        ...styles.label,
        marginBottom: screenWidth <= 768 ? 7 : 0,
        marginLeft: screenWidth <= 768 ? 0 : 30,
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
                tabBarStyle: {
                    backgroundColor: '#332D41',
                    height: 60,
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="Розклад"
                component={Schedule}
                options={getTabScreenOptions('Розклад', ScheduleIcon)}
            />
            <Tab.Screen
                name="Нотатки"
                component={NotesList}
                options={getTabScreenOptions('Нотатки', NotesIcon)}
            />
            <Tab.Screen
                name="Налаштування"
                component={Settings}
                options={getTabScreenOptions('Налаштування', SettingsIcon)}
            />
            <Tab.Screen
                name="Інформація"
                component={Information}
                options={getTabScreenOptions('Інформація', InformationIcon)}
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
    }
});
