import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WideButton = ({ label, width, onPressFunc }) => {
    return (
        <TouchableOpacity
            style={[styles.WideButton, { width }]}
            onPress={() => {
                onPressFunc();
            }}>
            <Text style={styles.ButtonText}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    WideButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 24px',
        backgroundColor: '#6750A4',
        borderRadius: 100,
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20 /* 142.857% */,
        letterSpacing: 0.1,
    },
});

export default WideButton;
