import React, { useState, FunctionComponent, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { INote, INoteData } from '../../../shared/interfaces/notes.interface';

import Arrow from '../../../../assets/arrow_drop_down.png';
import More from '../../../../assets/more_vert.png';
import Plus from '../../../../assets/plus-icon.png';
import Edit from '../../../../assets/edit.png';
import Trash from '../../../../assets/trashcan.png';
import { formatDateWithTime } from '../../../services/utility.service';

export const NotesDropdown: FunctionComponent<{
    note: INote;
    noteAddFn: (noteGroup: INote) => void;
    noteDeleteFn: (noteGroup: INote, noteId: number) => void;
    noteEditFn: (noteGroup: INote, noteId: number) => void;
    isActive: boolean;
}> = (props) => {
    const [arrowRotation, setArrowRotation] = useState<number>(0);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [isMenuVisible, setMenuVisible] = useState<boolean[]>(new Array(props.note.data.length));

    useEffect(() => {
        if (!isDropdownVisible) {
            setMenuVisible(new Array(props.note.data.length));
        }
    }, [isDropdownVisible]);

    useEffect(() => {
        if (props.isActive === true) {
            setDropdownVisible(true);
        }
    }, [props]);

    const toggleMenu = (index: number) => {
        const arr = [...isMenuVisible];
        for (let i = 0; i < arr.length; i++) {
            if (i !== index) {
                arr[i] = false;
            }
        }
        arr[index] = !arr[index];
        setMenuVisible(arr);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <Text style={{ ...styles.buttonText, fontWeight: '500', flex: 1 }} numberOfLines={1}>
                        {props.note.subject}
                    </Text>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    {props.note.data.map((noteData: INoteData, indx: number) => (
                        <View key={indx} style={styles.mainContainer}>
                            <View style={styles.noteLine}></View>

                            <View style={styles.noteGroup}>
                                <Text style={styles.noteDate}>{formatDateWithTime(new Date(noteData.date))}</Text>

                                <ScrollView>
                                    <Text style={styles.infoText}>{noteData.text}</Text>
                                </ScrollView>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.touchableCont} onPress={() => toggleMenu(indx)}>
                                    <Image source={More} style={styles.iconMore} />
                                </TouchableOpacity>
                            </View>

                            {isMenuVisible[indx] && (
                                <View style={styles.menuContainer}>
                                    <TouchableOpacity style={styles.menuButton} onPress={() => props.noteEditFn(props.note, indx)}>
                                        <Image source={Edit} style={[styles.iconMoreMenu, { tintColor: '#e6e0e9' }]} />
                                        <Text style={styles.menuButtonText}>Редагувати</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.menuButton} onPress={() => props.noteDeleteFn(props.note, indx)}>
                                        <Image source={Trash} style={[styles.iconMoreMenu, { tintColor: '#DC362E' }]} />
                                        <Text style={[styles.menuButtonText, { color: '#DC362E' }]}>Видалити</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))}

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => props.noteAddFn(props.note)} style={[styles.button, styles.buttonSecond]}>
                            <View style={styles.buttonContent}>
                                <Image source={Plus} style={styles.icon} />
                                <Text style={styles.buttonText}>Додати нотатку</Text>
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
        border: 0,
    },
    title: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContent: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
    },
    button: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 100,
    },
    buttonSecond: {
        backgroundColor: '#6750a4',
        borderWidth: 1,
        borderColor: '#6750A4',
    },
    arrow: {
        width: 9,
        height: 5,
        justifyContent: 'flex-end',
        marginLeft: 16,
    },
    dropdownContent: {
        padding: 24,
        paddingTop: 8,
        backgroundColor: '#1D192B',
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderRadius: 10,
        flex: 0,
        paddingBottom: 32,
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
    icon: {
        width: 12,
        height: 12,
        marginRight: 5,
        marginTop: 3,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        paddingTop: 16,
    },
    noteLine: {
        width: 2,
        height: '100%',
        backgroundColor: '#eaddff',
        borderRadius: 100,
    },
    noteGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
    },
    noteDate: {
        color: '#cac4d0',
        fontSize: 14,
    },
    infoText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 4,
    },
    touchableCont: {
        padding: 4,
    },
    iconMore: {
        width: 8,
        height: 16,
        resizeMode: 'contain',
    },
    menuContainer: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: '#211F26',
        borderRadius: 10,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        padding: 16,
    },
    iconMoreMenu: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    menuButtonText: {
        color: '#e6e0e9',
        fontSize: 14,
        paddingLeft: 12,
    },
});
