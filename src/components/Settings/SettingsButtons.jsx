import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import SettingsButton from '../../shared/components/SettingsButton';

export default function SettingsButtons() {
    const navigation = useNavigation();
    return (
        <View style={styles.buttonsContainer}>
            <SettingsButton icon="person" label="Налаштування профілів" onPressFunc={() => navigation.navigate('SettingsProfile')} />
            <SettingsButton icon="email" label="Налаштування сповіщень" onPressFunc={() => navigation.navigate('SettingsNotification')} />
            <SettingsButton icon="today" label="Налаштування занять" onPressFunc={() => navigation.navigate('SettingsSche')} />
            <StatusBar style="auto" />
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
    background: {
        flex: 1,
        backgroundColor: '#141218',
    },
});
