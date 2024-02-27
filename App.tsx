import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { AppNavbar } from './src/components/AppNavbar/AppNavbar';
import { OnboardingPage } from './src/components/OnboardingPages/OnboardingPage';
import { isLocalStorageEmpty } from './src/services/local-storage.service';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
    const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const initializeApp = async () => {
            if (!isInitialized) {
                const isEmpty = await isLocalStorageEmpty();
                setIsLocalStorageAvailable(!isEmpty);
                setIsInitialized(true);
            }
        };

        initializeApp();
    }, []);

    if (isInitialized) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="#381E72" />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={isLocalStorageAvailable ? 'AppNavbar' : 'OnboardingPage'}>
                        <Stack.Screen name="OnboardingPage" component={OnboardingPage} options={{ headerShown: false }} />
                        <Stack.Screen name="AppNavbar" component={AppNavbar} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        );
    }
}