import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from '../Schedule/Schedule';
import NotesList from '../Notes/NotesList';
import Settings from '../Settings/Settings';
import Information from '../Information/Information';

const Tab = createBottomTabNavigator();

export default function AppNavbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Розклад" component={Schedule} />
      <Tab.Screen name="Нотатки" component={NotesList} />
      <Tab.Screen name="Налаштування" component={Settings} />
      <Tab.Screen name="Інформація" component={Information} />
    </Tab.Navigator>
  );
}