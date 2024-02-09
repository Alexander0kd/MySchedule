import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useEffect, useState } from 'react';

import AppNavbar from './src/components/AppNavbar/AppNavbar';
import OnboardingPage from './src/components/OnboardingPages/OnboardingPage';
import { isLocalStorageEmpty, clearLocalStorage } from './src/services/localStorageService';

const Stack = createStackNavigator();

export default function App() {
    const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // IF YOU WANT ALWAYS SHOW ONBOARDING PAGE UNCOMMENT THIS FUNC \/ !!!!!!!!
                // IF YOU WANT OPEN ONBOARDING PAGE ONCE UNCOMMENT -> RELOAD APP -> COMMENT -> RELOAD PAGE !!!!!!!

                // await clearLocalStorage();
                if (!isInitialized) {
                    const isEmpty = await isLocalStorageEmpty();
                    setIsLocalStorageAvailable(!isEmpty);
                    setIsInitialized(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        initializeApp();
    }, []);

    if (!isInitialized) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLocalStorageAvailable ? 'AppNavbar' : 'OnboardingPage'}>
                <Stack.Screen name="OnboardingPage" component={OnboardingPage} options={{ headerShown: false }} />
                <Stack.Screen name="AppNavbar" component={AppNavbar} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
