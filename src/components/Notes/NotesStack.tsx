import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { NotesList } from './NotesList/NotesList';
import { NotesEdit } from './NotesEdit/NotesEdit';
import { NotesAdd } from './NotesAdd/NotesAdd';
import { RouteProp } from '@react-navigation/native';
import { AvailableRoutes } from '../../environment/available-routes';
import { ProfileMenu } from '../Navigation/ProfileMenu';

export const NotesStack: React.FunctionComponent<{
    route: RouteProp<AvailableRoutes, 'NotesStack'>;
}> = (prop) => {
    const getLesson = () => {
        if (!prop.route.params) {
            return 'none';
        } else {
            return prop.route.params.lesson;
        }
    };

    const Stack = createStackNavigator();

    const screenOptions = {
        initialRouteName: 'NotesList',
        headerStyle: { backgroundColor: '#4F378B' },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: '#141218' },
        headerRight: () => <ProfileMenu />,
    };

    const modalScreenOptions = {
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="NotesList"
                options={{
                    title: 'Нотатки',
                    ...modalScreenOptions,
                }}>
                {() => <NotesList lesson={getLesson()} />}
            </Stack.Screen>
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
