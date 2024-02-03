import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsButton({ icon, label, onPressFunc }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {
                    onPressFunc();
                }}>
                <View style={styles.content}>
                    <MaterialIcons name={icon} size={24} color="#CAC4D0" />
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#332D41',
        marginLeft: 24,
        marginRight: 24,
        borderRadius: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 16,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.1,
        marginLeft: 16,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'flex-start',
    },
});
