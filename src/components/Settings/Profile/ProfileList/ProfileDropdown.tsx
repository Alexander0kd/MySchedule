import React, { useState, FunctionComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import Arrow from './../../../../../assets/arrow_drop_down.png';
import Edit from './../../../../../assets/edit.png';
import Trash from './../../../../../assets/trashcan.png';
import { IProfile } from '../../../../interfaces/profile.interface';
import { getFacultyFullName } from '../../../../utils/utility.service';
import { AvailableUni } from '../../../../environment/universities/available-uni.enum';

export const ProfileDropdown: FunctionComponent<{
    profile: IProfile;
    isProfileActive: boolean;
    deleteProfileFn: (id: string) => void;
    activeProfileFn: (id: string) => void;
    editProfileFn: (id: string) => void;
}> = (props) => {
    const [arrowRotation, setArrowRotation] = useState<number>(0);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: props.isProfileActive ? '#2e2447' : '#332D41' }}>
            <View>
                <View style={styles.title}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => props.activeProfileFn(props.profile.id)}>
                        <Text numberOfLines={1} style={{ ...styles.buttonText, fontWeight: '500' }}>
                            {AvailableUni[props.profile.university]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowWrapper} onPress={toggleDropdown}>
                        <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                    </TouchableOpacity>
                </View>
            </View>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    <View style={styles.info}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Факультет:</Text>
                            <Text style={styles.infoText} numberOfLines={1}>
                                {getFacultyFullName(props.profile.university, props.profile.faculty)}
                            </Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Курс:</Text>
                            <Text style={styles.infoText}>{props.profile.year}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Група:</Text>
                            <Text style={styles.infoText}>{props.profile.groupName}</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.buttonFirst]} onPress={() => props.deleteProfileFn(props.profile.id)}>
                            <View style={styles.buttonContent}>
                                <Image source={Trash} style={styles.icon} />
                                <Text style={styles.buttonText}>Видалити</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={() => props.editProfileFn(props.profile.id)}>
                            <View style={styles.buttonContent}>
                                <Image source={Edit} style={styles.icon} />
                                <Text style={styles.buttonText}>Редагувати</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        marginRight: 24,
        marginLeft: 24,
        borderRadius: 12,
        borderWidth: 0,
        backgroundColor: '#332D41',
    },

    title: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        fontWeight: '500',
        flex: 0.3,
    },

    arrowWrapper: {
        padding: 8,
    },

    arrow: {
        width: 9,
        height: 5,
        justifyContent: 'flex-end',
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
        gap: 7,
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
        width: 20,
        height: 20,
        objectFit: 'scale-down',
    },

    buttonContent: {
        gap: 6,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 14,
    },
});
