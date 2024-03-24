import React, { FunctionComponent, useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import Arrow from './../../../../assets/arrow_drop_down.png';
import Trash from "../../../../assets/trashcan.png";
import { NotificationItem } from '../../../shared/interfaces/settings.interface';
import { formatDateWithTime } from '../../../services/utility.service';

const RemindersList: FunctionComponent<{
    list: NotificationItem[];
    onDeleteFn: (index: number) => void;
}> = (props) => {
    const [notificationList, setNotificationList] = useState<NotificationItem[]>(props.list);

    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [arrowRotation, setArrowRotation] = useState<number>(0);

    useEffect(() => {
        const data = notificationList;
        data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setNotificationList(data);
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const deleteSelect = (index: number) => {
        setNotificationList(notificationList.filter((item, indx) => indx !== index));
        props.onDeleteFn(index);
    }

    const formatDate = (date: Date) => {
        let formateDate = formatDateWithTime(new Date(date));
        formateDate = formateDate.replace(' |', ',');
        return formateDate;
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => toggleDropdown()}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Список нагадувань</Text>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>
            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    {notificationList.map((lesson, index) => (
                        <View key={index}>
                            <Pressable key={index} >
                                <View style={styles.items}>
                                    <Text style={styles.titleText} numberOfLines={1}>{formatDate(lesson.date)} | {lesson.subject.l}</Text>
                                    <TouchableOpacity onPress={() => deleteSelect(index)}>
                                        <Image source={Trash} style={styles.trash} />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderRadius: 12,
        backgroundColor: '#332D41',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    titleText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    arrow: {
        width: 9,
        height: 5,
        tintColor: 'white',
    },
    dropdownContent: {
        backgroundColor: '#1d192b',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingTop:16,
        paddingBottom:16
    },
    trash:{
        width: 24,
        height: 22,
        alignSelf:'center',
    },
    items:{
        paddingVertical: 8,
        paddingHorizontal: 24,
        flexDirection:"row",
        justifyContent:'space-between'
    }
});

export default RemindersList;
