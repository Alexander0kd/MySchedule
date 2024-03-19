import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import Arrow from './../../../../assets/arrow_drop_down.png';
import Check from './../../../../assets/check.png'

const dropdownValues = ['За 5 хв', 'За 15 хв', 'За 30 хв', 'За 1 год'];

export const DropDown: React.FC = () => {
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [arrowRotation, setArrowRotation] = useState<number>(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const handleSelect = (index: number) => {
        setSelectedItemIndex(index);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Сповіщати про пари за</Text>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    {dropdownValues.map((item, index) => (
                        <Pressable key={index} onPress={() => handleSelect(index)}>
                            <View style={[styles.dropdownItemRow,  selectedItemIndex === index && styles.selectedItem]}>
                                <Text style={styles.dropdownItem}>{item}</Text>
                                {selectedItemIndex === index && <Image source={Check} style={styles.check} />}
                            </View>

                        </Pressable>
                    ))}
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
        borderWidth: 0,
        backgroundColor: '#332D41',
    },

    title: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    arrow: {
        width: 9,
        height: 5,
        justifyContent: 'flex-end',
    },

    dropdownContent: {
        paddingTop:16,
        paddingBottom:16,
        backgroundColor: '#211f26',
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderRadius: 10,
    },

    dropdownItem: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 8,
        paddingLeft: 16,
    },

    dropdownItemRow: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    check:{
        width: 24,
        height: 22,
        alignSelf:'center',
        marginRight: 16,
    },

    selectedItem: {
        backgroundColor: '#332D41',
    }
});

