import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Schedule } from '../Schedule/Schedule';
import { Settings } from '../Settings/Settings';
import { Information } from '../Information/Information';
import { ProfileMenu } from './ProfileMenu';
import { NotesList } from '../Notes/NotesList';
import { MaterialIcons } from '@expo/vector-icons';

export const AppNavbar = () => {
    const Tab = createBottomTabNavigator();

    const tabBarIconStyle = (focused: boolean) => ({
        ...styles.icon,
        backgroundColor: focused ? '#4A4458' : '#211F26',
        marginTop: 4,
    });

    const tabBarLabelStyle = {
        ...styles.label,
        marginBottom: 8,
    };

    const getTabScreenOptions = (label: string, iconName: keyof typeof MaterialIcons.glyphMap) => ({
        tabBarLabel: () => <Text style={tabBarLabelStyle}>{label}</Text>,
        tabBarIcon: ({ focused }) => (
            <View style={tabBarIconStyle(focused)}>
                <MaterialIcons name={iconName} color="white" size={20} />
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
                    borderTopWidth: 0,
                },
                headerRight: () => <ProfileMenu />,
            }}>
            <Tab.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    headerTitle: 'Розклад',
                    ...getTabScreenOptions('Розклад', 'today'),
                }}
            />
            <Tab.Screen
                name="NotesList"
                component={NotesList}
                options={{
                    headerTitle: 'Нотатки',
                    ...getTabScreenOptions('Нотатки', 'sticky-note-2'),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    headerTitle: 'Налаштування',
                    ...getTabScreenOptions('Налаштування', 'settings'),
                }}
            />
            <Tab.Screen
                name="Information"
                component={Information}
                options={{
                    headerShown: false,
                    headerTitle: 'Інформація',
                    ...getTabScreenOptions('Інформація', 'info'),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#332D41',
        width: '50%',
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
