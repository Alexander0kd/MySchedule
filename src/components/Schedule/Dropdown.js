import React, {useEffect, useState} from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Bell from '../../../assets/bell.png';
import CrossedOutCall from '../../../assets/CrossedOutCall.png';
import Arrow from '../../../assets/arrow_drop_down.png';
import Reminder from "./Reminder";
import {useNavigation} from "@react-navigation/native";
import ScreenWidthService from "../../services/screen-width.servive";


const DropDown = ({ lesson, navigation }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(0);
    const [reminderVisible, setReminderVisible] = useState(false);
    const [isDismissedReminder, setDismissedReminder] = useState(false);

    navigation = useNavigation()

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const showReminderModal = () => {
        setReminderVisible(true);
    };

    const hideReminderModal = () => {
        setReminderVisible(false);
    };

    const [screenWidth, setScreenWidth] = useState(ScreenWidthService.getWidth());

    useEffect(() => {
        const unsubscribe = ScreenWidthService.subscribeToWidthChanges((newWidth) => {
            setScreenWidth(newWidth);
        });
        return () => unsubscribe();
    }, []);

    const maxCharacters = screenWidth < 450 ? 30 : lesson.title.length;

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <Text style={styles.buttonText}>
                            {lesson.title.length > maxCharacters ? lesson.title.slice(0, 30) + '...' : lesson.title}
                        </Text>
                        <Text style={{ color: '#CAC4D0', fontSize: 12 }}>{lesson.typeOfLesson}</Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </TouchableWithoutFeedback>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.infoText}>Групи:</Text>
                            <Text style={styles.infoText}>Аудиторія:</Text>
                            <Text style={styles.infoText}>Викладач:</Text>
                            <Text style={styles.infoText}>Час:</Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}> {lesson.group}</Text>
                            <Text style={styles.infoText}> {lesson.audience}</Text>
                            <Text style={styles.infoText}> {lesson.teacher}</Text>
                            <Text style={styles.infoText}> {lesson.time}</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.buttonFirst]} onPress={() => navigation.navigate("Нотатки")} >
                            <Text style={styles.buttonText}>Нотатки</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={showReminderModal}>
                            {!isDismissedReminder ?
                                <View style={styles.buttonContent}>
                                    <Image source={Bell} style={styles.icon}/>
                                    <Text style={styles.buttonText}>Нагадати</Text>
                                </View>
                                :
                                <View style={styles.buttonContent}>
                                    <Image source={CrossedOutCall} style={styles.icon}/>
                                    <Text style={styles.buttonText}>Не нагадувати</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {reminderVisible && <Reminder onDismissed={setDismissedReminder} onHide={hideReminderModal} />}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginRight: 24,
        marginLeft: 24,
        borderColor: 'black',
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#332D41',
    },

    title: {
        padding: 16,
        paddingLeft: 24,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    arrow: {
        width: 9,
        height: 5,
        justifyContent: "flex-end",
        marginTop: 13,
        marginRight: 13,
    },

    info: {
        flexDirection: "row",
        gap: 30,
    },

    dropdownContent: {
        padding: 24,
        paddingTop: 8,
        backgroundColor: "#1D192B",
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderRadius: 10,
        width: '100%',
        paddingBottom: 32
    },

    infoText: {
        fontSize: 14,
        color: "white",
        paddingBottom: 8,
        paddingTop: 8,

    },

    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingTop: 8,
        marginTop: 10,
        gap: 16
    },

    button: {
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 100,

    },

    buttonFirst: {
        backgroundColor: "#1D192B",
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
        marginTop:3
    },

    buttonContent:{
        justifyContent:"center",
        flexDirection: "row",
    }
});

export default DropDown;
