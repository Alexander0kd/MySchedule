import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Arrow from '../../../assets/arrow-left.png';

const DateBlock = ({ title, date, onBackward, onForward }) => {
    const formattedDate = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    return (
        <View style={styles.panelContainer}>
            <TouchableOpacity onPress={onBackward}>
                <Image source={Arrow} style={styles.arrowImage} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <TouchableOpacity onPress={onForward}>
                <Image source={Arrow} style={[styles.arrowImage, { transform: [{ rotate: '180deg' }] }]} />
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
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 1,
    },
    arrowImage: {
        width: 13,
        height: 13,
        resizeMode: 'contain',
        tintColor: 'white',
        margin: 16,
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DateBlock;
