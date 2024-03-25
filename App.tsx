import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { AppNavbar } from './src/components/Navigation/AppNavbar';
import { OnboardingPage } from './src/components/OnboardingPages/OnboardingPage';
import { isLocalStorageEmpty } from './src/services/profile.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomisableAlert from 'react-native-customisable-alert';

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
                <CustomisableAlert
                    titleStyle={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'left',
                    }}
                    textStyle={{
                        color: 'white',
                        textAlign: 'left',
                        paddingTop: 16,
                        marginBottom: 0,
                    }}
                    alertContainerStyle={{
                        backgroundColor: '#2B2930',
                        padding: 24,
                        borderRadius: 28,
                    }}
                    btnLabelStyle={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                    btnStyle={{
                        backgroundColor: 'transparent',
                        flex: 1,
                    }}
                />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={isLocalStorageAvailable ? 'AppNavbar' : 'OnboardingPage'}>
                        <Stack.Screen name="OnboardingPage" component={OnboardingPage} options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }} />
                        <Stack.Screen name="AppNavbar" component={AppNavbar} options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        );
    }
}
