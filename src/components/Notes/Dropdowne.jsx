import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../../assets/arrow_drop_down.png';
import Bell from '../../../assets/bell.png';
import More from '../../../assets/more_vert.png';
import Plus from '../../../assets/plus-icon.png';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Dropdown = ({ note }) => {
    const [arrowRotation, setArrowRotation] = useState(0);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        // Ensure that note.notes is an array, and if not, set it to an empty array
        setNotes(Array.isArray(note.notes) ? note.notes : []);
    }, [note.notes]);
    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <Text style={{ ...styles.buttonText, fontWeight: '500' }}>
                            {note.subject.length > 30 ? note.subject.slice(0, 30) + '...' : note.subject}
                        </Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>
            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    {notes.map((singleNote) => (
                        <View style={styles.mainContainer}>
                            <View style={styles.lineCont}></View>
                            <View key={singleNote.id} style={styles.notesCont}>
                                <View style={styles.dataSettingContainer}>
                                    <Text style={styles.dataText}>{singleNote.data}</Text>
                                    <TouchableOpacity>
                                        <Image source={More} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView style={{ maxHeight: 220 }}>
                                    <Text style={styles.infoText}>{singleNote.text}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    ))}
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.buttonSecond]}>
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
    container: {
        marginTop: 16,
        marginRight: 24,
        marginLeft: 24,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#332D41',
        border: 0,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,
        paddingTop: 16,
    },
    dataText: {
        color: '#cac4d0',
        fontSize: 14,
        paddingBottom: 4,
        flex: 1,
    },
    notesCont: {
        // borderLeftWidth: 3,
        // borderColor: '#fff',
        // borderTopLeftRadius: 10,
        // borderBottomLeftRadius: 10,
        // marginTop: 10,
    },

    lineCont: {
        width: 2,
        height: '100%',
        backgroundColor: '#eaddff',
        maxHeight: '100%',
        borderRadius: 100,
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
        flex: 0,
        paddingBottom: 32,
    },

    infoText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 4,
        flex: 1,
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

    dataSettingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 14,
    },
});

export default Dropdown;
