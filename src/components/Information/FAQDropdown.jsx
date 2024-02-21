import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Arrow from '../../../assets/arrow_drop_down.png';

const FAQDropdown = ({ question }) => {
    const [arrowRotation, setArrowRotation] = useState(0);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <Text style={{ ...styles.buttonText, fontWeight: '500' }}>{question.title}</Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>
            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    <Text style={styles.infoText}>{question.description.split('<br/>').join('\n')}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginBottom: 16,
        borderRadius: 16,

        backgroundColor: '#332D41',
        border: 0,
    },
    title: {
        padding: 16,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    arrow: {
        width: 10,
        height: 5,
        justifyContent: 'flex-end',
        margin: 8
    },
    dropdownContent: {
        padding: 24,
        paddingTop: 16,

        backgroundColor: '#1D192B',

        borderRadius: 10,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.1,
    },
    infoText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.1,
    },
});

export default FAQDropdown;
