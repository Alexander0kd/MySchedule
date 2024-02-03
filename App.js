import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import AppNavbar from './src/components/AppNavbar/AppNavbar';
import WelcomePage from './src/components/OnboardingPages/OnboardingPage';
import Schedule from './src/components/Schedule/Schedule';

export default function App() {
    const MainStack = createStackNavigator();

    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="WelcomePage">
                <MainStack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
                <MainStack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
                <MainStack.Screen name="AppNavbar" component={AppNavbar} options={{ headerShown: false }} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
