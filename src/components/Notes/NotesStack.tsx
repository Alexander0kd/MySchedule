import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { NotesList } from './NotesList/NotesList';
import { NotesEdit } from './NotesEdit/NotesEdit';
import { NotesAdd } from './NotesAdd/NotesAdd';

export const NotesStack = () => {
    const Stack = createStackNavigator();

    const screenOptions = {
        initialRouteName: 'NotesList',
        headerStyle: { backgroundColor: '#4F378B' },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: '#141218' },
    };

    const modalScreenOptions = {
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="NotesList"
                component={NotesList}
                options={{
                    title: 'Нотатки',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="NotesEdit"
                component={NotesEdit}
                options={{
                    title: 'Редагування нотатки',
                    ...modalScreenOptions,
                }}
            />
            <Stack.Screen
                name="NotesAdd"
                component={NotesAdd}
                options={{
                    title: 'Додавання нотатки',
                    ...modalScreenOptions,
                }}
            />
        </Stack.Navigator>
    );
};
