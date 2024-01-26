import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from '../Schedule/Schedule';
import NotesList from '../Notes/NotesList';
import Settings from '../Settings/Settings';
import Information from '../Information/Information';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import ScheduleIcon from '../../../assets/schedule.svg';
import NotesIcon from '../../../assets/notes.svg';
import SettingsIcon from '../../../assets/settings.svg';
import InformationIcon from '../../../assets/info.svg';
import {useEffect, useState} from "react";

export default function AppNavbar() {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateScreenWidth = () => {setScreenWidth(Dimensions.get('window').width);};
        Dimensions.addEventListener('change', updateScreenWidth);
        return () => { Dimensions.removeEventListener('change', updateScreenWidth);};}, []);

    const Tab = createBottomTabNavigator();

    const getTabBarIconStyle = (focused) => {
        return {backgroundColor: focused ? '#4A4458' : '#332D41'}
    };

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
                options={{
                    tabBarLabel: () => (
                        <Text style={{...styles.label, marginBottom: screenWidth <= 768 ? 7 : 0,
                            marginLeft: screenWidth <= 768 ? 0 : 30}}>Розклад</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ ...styles.icon, backgroundColor: getTabBarIconStyle(focused).backgroundColor, marginTop: screenWidth <= 768 ? 7 : 0 }}>
                            <Image source={ScheduleIcon} style={{ width: 20, height: 20 }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Нотатки"
                component={NotesList}
                options={{
                    tabBarLabel: () => (
                        <Text style={{...styles.label, marginBottom: screenWidth <= 768 ? 7 : 0,
                            marginLeft: screenWidth <= 768 ? 0 : 30}}>Нотатки</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ ...styles.icon, backgroundColor: getTabBarIconStyle(focused).backgroundColor, marginTop: screenWidth <= 768 ? 7 : 0}}>
                            <Image source={NotesIcon} style={{ width: 20, height: 20 }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Налаштування"
                component={Settings}
                options={{
                    tabBarLabel: () => (
                        <Text style={{...styles.label, marginBottom: screenWidth <= 768 ? 7 : 0,
                            marginLeft: screenWidth <= 768 ? 0 : 30}}>Налаштування</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ ...styles.icon, backgroundColor: getTabBarIconStyle(focused).backgroundColor, marginTop: screenWidth <= 768 ? 7 : 0}}>
                            <Image source={SettingsIcon} style={{ width: 20, height: 20 }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Інформація"
                component={Information}
                options={{
                    tabBarLabel: () => (
                        <Text style={{...styles.label, marginBottom: (screenWidth <= 768 ? 7 : 0),
                            marginLeft: screenWidth <= 768 ? 0 : 30}}>Інформація</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                         <View style={{ ...styles.icon, backgroundColor: getTabBarIconStyle(focused).backgroundColor, marginTop: screenWidth <= 768 ? 7 : 0}}>
                             <Image source={InformationIcon} style={{ width: 20, height: 20}} />
                         </View>

                    ),
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
    }
});
