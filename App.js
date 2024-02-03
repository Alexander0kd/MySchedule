import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import AppNavbar from './src/components/AppNavbar/AppNavbar';
import OnboardingPage from './src/components/OnboardingPages/OnboardingPage';

export default function App() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardingPage">
                {/* // TODO: Добавити перевірку чи варто запускати користувача на Онбординг */}
                <Stack.Screen name="OnboardingPage" component={OnboardingPage} options={{ headerShown: false }} />
                <Stack.Screen name="AppNavbar" component={AppNavbar} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
