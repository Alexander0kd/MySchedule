import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function WideButton({ label, width, onPressFunc, isDisabled }) {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={[styles.WideButton, { width, backgroundColor: isDisabled ? 'rgba(202, 196, 208, 0.12)' : '#6750A4' }]}
            onPress={onPressFunc}>
            <Text style={[styles.ButtonText, { color: isDisabled ? 'rgba(202, 196, 208, 0.38)' : '#FFF' }]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    WideButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 24px',
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
