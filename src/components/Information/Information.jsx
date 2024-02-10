import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import InformationButtons from './InformationButtons';
import FAQ from './FAQ';
export default function Information() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerStyle: { backgroundColor: '#4F378B' },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: '#141218' },
    };

    const modalScreenOptions = {
        presentation: 'modal',
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="InformationBs"
                component={InformationButtons}
                options={{
                    title: 'Корисна Інформація',
                }}
            />
            <Stack.Screen
                name="FAQPage"
                component={FAQ}
                options={{
                    title: 'Поширені запитання (FAQ)',
                    ...modalScreenOptions,
                }}
            />
        </Stack.Navigator>
    );
}
