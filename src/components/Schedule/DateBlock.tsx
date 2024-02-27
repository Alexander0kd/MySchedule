import React, { FunctionComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Arrow from '../../../assets/arrow-left.png';
import { formateDate } from '../../services/utility.service';

export const DateBlock: FunctionComponent<{
    date: Date;
    onBackward: () => void;
    onForward: () => void;
    handleDataPickerOpen: (status: boolean) => void;
}> = (props) => {
    return (
        <View style={styles.panelContainer}>
            <TouchableOpacity onPress={props.onBackward}>
                <Image source={Arrow} style={styles.arrowImage} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.handleDataPickerOpen(true);
                }}>
                <Text style={styles.dateText}>{formateDate(props.date)}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onForward}>
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
