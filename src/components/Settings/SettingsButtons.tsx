import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from '../../shared/components/IconButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';

export default function SettingsButtons() {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    return (
        <View style={styles.buttonsContainer}>
            <IconButton icon="person" label="Налаштування профілів" onPressFunc={() => navigation.navigate('SettingsProfile')} />
            <IconButton icon="email" label="Налаштування сповіщень" onPressFunc={() => navigation.navigate('SettingsNotification')} />
            <IconButton icon="today" label="Налаштування занять" onPressFunc={() => navigation.navigate('SettingsSche')} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
});
