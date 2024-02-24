import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DateBlock = ({ date, onBackward, onForward, handleDataPickerOpen }) => {
    const formattedDate = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    return (
        <View style={styles.panelContainer}>
            <TouchableOpacity onPress={onBackward}>
                <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    handleDataPickerOpen(true);
                }}>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForward}>
                <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    panelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#201f25',
    },
    arrowText: {
        color: 'white',
        fontSize: 20,
        padding: 16,
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DateBlock;
