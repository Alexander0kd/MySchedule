import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, useWindowDimensions, Linking } from 'react-native';
import Bell from '../../../assets/bell.png';
import CrossedOutCall from '../../../assets/CrossedOutCall.png';
import Arrow from '../../../assets/arrow_drop_down.png';
import Reminder from './Reminder';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';

export const DropDown = ({ lesson }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(0);
    const [reminderVisible, setReminderVisible] = useState(false);
    const [isDismissedReminder, setDismissedReminder] = useState(false);

    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const window = useWindowDimensions();
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const showReminderModal = () => {
        if (!isDismissedReminder) setReminderVisible(true);
    };

    const hideReminderModal = () => {
        setReminderVisible(false);
    };

    const buttonState = () => {
        setDismissedReminder(!isDismissedReminder);
        hideReminderModal();
    };

    const updateReminderStatus = () => {
        setDismissedReminder(!isDismissedReminder);
        hideReminderModal();
        if (!isDismissedReminder) showReminderModal();
        else hideReminderModal();
    };

    const maxCharacters = window.width < 450 ? 30 : lesson.l.length;
    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <View style={{ borderColor: 'transparent', flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontWeight: '500' }}>{lesson.li}. </Text>
                            <Text style={{ color: 'white', fontWeight: '500' }}>
                                {lesson.l.length > maxCharacters ? lesson.l.slice(0, 30) + '...' : lesson.l}
                            </Text>
                        </View>
                        <Text style={{ color: '#CAC4D0', fontSize: 12 }}>{lesson.lt === '(Л)' ? 'Лекція' : 'Лабораторна робота'}</Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    <View style={styles.info}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Групи:</Text>
                            <Text style={styles.infoText}>{lesson.g}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            {lesson.vr ? (
                                <>
                                    <Text style={styles.titleText}>Аудиторія:</Text>
                                    <Text style={styles.infoText}>{lesson.vr}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.titleText}>Посилання:</Text>
                                    <TouchableOpacity style={{ flex: 0.7 }} onPress={() => Linking.openURL(lesson.link)}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                            {' '}
                                            {lesson.link && lesson.link.length > 30 ? lesson.link.slice(0, 30) + '...' : lesson.link}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Викладач:</Text>
                            <Text style={styles.infoText}>{lesson.t}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Час:</Text>
                            <Text style={styles.infoText}>
                                {lesson.ls} | {lesson.le}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.buttonFirst]} onPress={() => navigation.navigate('Notes')}>
                            <Text style={styles.buttonText}>Нотатки</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={showReminderModal}>
                            {!isDismissedReminder ? (
                                <View style={styles.buttonContent}>
                                    <Image source={Bell} style={styles.icon} />
                                    <Text style={styles.buttonText}>Нагадати</Text>
                                </View>
                            ) : (
                                <TouchableOpacity style={[styles.buttonContent]} onPress={buttonState}>
                                    <Image source={CrossedOutCall} style={styles.icon} />
                                    <Text style={styles.buttonText}>Не нагадувати</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {reminderVisible && !isDismissedReminder && <Reminder onDismissed={updateReminderStatus} onHide={hideReminderModal} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginRight: 24,
        marginLeft: 24,
        borderRadius: 12,
        borderWidth: 0,
        backgroundColor: '#332D41',
        border: 0,
    },

    title: {
        padding: 16,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    titleText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        fontWeight: '500',
        flex: 0.3,
    },

    arrow: {
        width: 9,
        height: 5,
        justifyContent: 'flex-end',
        marginTop: 13,
        marginRight: 13,
    },

    info: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
    },

    dropdownContent: {
        padding: 24,
        paddingTop: 8,
        backgroundColor: '#1D192B',
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderRadius: 10,
        flex: 1,
        paddingBottom: 32,
    },

    infoText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        flex: 0.7,
    },

    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingTop: 8,
        marginTop: 10,
        gap: 16,
    },

    button: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 100,
    },

    buttonFirst: {
        backgroundColor: '#1D192B',
        borderColor: '#E8DEF8',
    },

    buttonSecond: {
        backgroundColor: '#6750A4',
        borderWidth: 1,
        borderColor: '#6750A4',
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    icon: {
        width: 12,
        height: 12,
        marginRight: 5,
        marginTop: 3,
    },

    buttonContent: {
        justifyContent: 'center',
        flexDirection: 'row',
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 14,
    },
});
