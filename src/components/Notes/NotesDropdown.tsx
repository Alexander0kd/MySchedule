import React, { useState, FunctionComponent } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { INote, INoteData } from '../../shared/interfaces/notes.interface';

import Arrow from '../../../assets/arrow_drop_down.png';
import More from '../../../assets/more_vert.png';
import Plus from '../../../assets/plus-icon.png';
import Edit from '../../../assets/edit.png';
import Trash from '../../../assets/trashcan.png';
import { formatDateWithTime, openModal, truncateString } from '../../services/utility.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/core';

export const NotesDropdown: FunctionComponent<{
    note: INote
}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [arrowRotation, setArrowRotation] = useState(0);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const deleteNote = () => {
        const isDelete = openModal('Title', 'Text', 'Cancel', 'Yes');

        if (isDelete) {
            console.log('Deleted');
        }
    }

    const editNote = () => {
        navigation.navigate('EditNote');
    }

    const addNote = () => {
        navigation.navigate('AddNote');
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <Text style={{ ...styles.buttonText, fontWeight: '500' }}>
                            {truncateString(props.note.subject, 30)}
                        </Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    {props.note.notes.map((noteData: INoteData, index: number) => (

                        <View key={index} style={styles.mainContainer}>
                            {/* Line */}
                            <View style={styles.noteLine}></View>
                            
                            {/* Note */}
                            <View style={styles.noteGroup}>
                                {/* Date */}
                                <Text style={styles.noteDate}>{formatDateWithTime(noteData.date)}</Text>
                                
                                {/* Content */}
                                <ScrollView style={styles.noteText}>
                                    <Text style={styles.infoText}>{noteData.text}</Text>
                                </ScrollView>
                            </View>

                            {/* More */}
                            <View style={styles.noteMore}>
                                <TouchableOpacity style={styles.touchableCont} onPress={toggleMenu}>
                                    <Image source={More} style={styles.iconMore} />
                                </TouchableOpacity>
                            </View>

                            {/* More Dropdown */}
                            {isMenuVisible && (
                                    <View style={styles.menuContainer}>
                                        <TouchableOpacity style={styles.menuButton} onPress={editNote}>
                                            <Image source={Edit} style={[styles.iconMoreMenu,{tintColor:'#e6e0e9'}]} />
                                            <Text style={styles.menuButtonText}>Редагувати</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.menuButton} onPress={deleteNote}>
                                            <Image source={Trash} style={[styles.iconMoreMenu, { tintColor: '#DC362E' }]} />
                                            <Text style={[styles.menuButtonText, { color: '#DC362E' }]}>Видалити</Text>
                                        </TouchableOpacity>
                                    </View>    
                                )
                            }

                        </View>

                    ))}

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={addNote} style={[styles.button, styles.buttonSecond]}>
                            <View style={styles.buttonContent}>
                                <Image source={Plus} style={styles.icon} />
                                <Text style={styles.buttonText}>Додати нотатку</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     marginTop: 16,
    //     marginRight: 24,
    //     marginLeft: 24,
    //     borderRadius: 12,
    //     borderWidth: 1,
    //     backgroundColor: '#332D41',
    //     border: 0,
    // },
    // mainContainer: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     gap: 6,
    //     paddingTop: 16,
    // },
    // dataText: {
    //     color: '#cac4d0',
    //     fontSize: 14,
    //     paddingBottom: 4,
    //     flex: 1,
    // },
    // redBut: {
    //     backgroundColor: '#DC362E',
    // },
    // notesCont: {
    //     width: '100%',
    //     height: '100%',
    //     // borderLeftWidth: 3,
    //     // borderColor: '#fff',
    //     // borderTopLeftRadius: 10,
    //     // borderBottomLeftRadius: 10,
    //     // marginTop: 10,
    // },

    // lineCont: {
    //     width: 2,
    //     height: '100%',
    //     backgroundColor: '#eaddff',
    //     maxHeight: '100%',
    //     borderRadius: 100,
    // },
    // title: {
    //     padding: 16,
    //     paddingLeft: 24,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },

    // titleText: {
    //     fontSize: 14,
    //     color: 'white',
    //     paddingBottom: 8,
    //     paddingTop: 8,
    //     fontWeight: '500',
    //     flex: 0.3,
    // },

    // arrow: {
    //     width: 9,
    //     height: 5,
    //     justifyContent: 'flex-end',
    //     marginTop: 13,
    //     marginRight: 13,
    // },

    // info: {
    //     flexDirection: 'column',
    //     gap: 8,
    //     flex: 1,
    // },

    // dropdownContent: {
    //     padding: 24,
    //     paddingTop: 8,
    //     backgroundColor: '#1D192B',
    //     borderTopStartRadius: 0,
    //     borderTopEndRadius: 0,
    //     borderRadius: 10,
    //     flex: 0,
    //     paddingBottom: 32,
    // },

    // infoText: {
    //     fontSize: 14,
    //     color: 'white',
    //     paddingBottom: 4,
    //     flex: 1,
    // },

    // actions: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     height: 40,
    //     paddingTop: 8,
    //     marginTop: 10,
    //     gap: 16,
    // },

    // button: {
    //     flex: 1,
    //     height: 40,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderWidth: 2,
    //     borderRadius: 100,
    // },

    // buttonFirst: {
    //     backgroundColor: '#1D192B',
    //     borderColor: '#E8DEF8',
    // },

    // buttonSecond: {
    //     backgroundColor: '#6750a4',
    //     borderWidth: 1,
    //     borderColor: '#6750A4',
    // },

    // buttonText: {
    //     color: 'white',
    //     textAlign: 'center',
    // },

    // icon: {
    //     width: 12,
    //     height: 12,
    //     marginRight: 5,
    //     marginTop: 3,
    // },
    // iconMore: {
    //     width: 4,
    //     height: 16,
    //     marginRight: 5,
    //     resizeMode: 'contain',
    // },
    // iconMoreMenu: {
    //     position: 'absolute',
    //     left: 12,
    //     width: 24,
    //     height: 24,
    //     resizeMode: 'contain',
    // },
    // touchableCont: {
    //     paddingLeft: 12,
    //     paddingRight: 12,
    //     paddingBottom: 12,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // buttonContent: {
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    // },

    // dataSettingContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'flex-end',
    // },
    // textContainer: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     gap: 14,
    // },
    // menuContainer: {
    //     position: 'absolute',
    //     top: 0,
    //     right: 30,
    //     width: 160,
    //     height: 128,
    //     backgroundColor: '#211F26',
    //     borderRadius: 10,
    //     zIndex: 1, // Ensure the menu appears above other elements
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // menuButton: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     width: '100%',
    //     height: '50%',
    //     alignItems: 'center',
    //     textAlign: 'left',
    // },
    // menuButtonText: {
    //     color: '#e6e0e9',
    //     fontSize: 14,
    //     left: 48,
    // },
});