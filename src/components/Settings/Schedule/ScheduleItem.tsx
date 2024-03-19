import React, { FunctionComponent, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { getActiveProfile } from '../../../services/local-storage.service';
import { handleError, openModal, truncateString } from '../../../services/utility.service';
import Eye from '../../../../assets/eye-open.png';
import EyeClosed from '../../../../assets/eye-closed.png';
import { IHiddenSchedule } from '../../../shared/interfaces/settings.interface';

export const ScheduleItem: FunctionComponent<{
    subject: IHiddenSchedule
}> = (props) => {
    const handleOpenModal = async (nameSubject: string) => {
        // if (!closedEyes.has(nameSubject)) {
        //     const modal = await openModal('Бажаєте Приховати цей предмет?', `Приховати предмет "${nameSubject}"`, 'Скасувати', 'Приховати');

        //     if (modal) {
        //         setClosedEyes((prevState) => new Set(prevState.add(nameSubject)));
        //         const updatedSubjects = activeSubjects.map((subject) => {
        //             if (subject.l === nameSubject) {
        //                 return { ...subject, v: false };
        //             }
        //             return subject;
        //         });

        //         setActiveSubjects(updatedSubjects);
        //         subjectService.groupSubjects = updatedSubjects;
        //         await saveSubjectsForGroup(group, subjectService.groupSubjects);

        //         if (updatedSubjects.find((subject) => subject.l === nameSubject && !subject.v)) {
        //             setClosedEyes((prevState) => new Set(prevState.add(nameSubject)));
        //         }
        //     }
        // } else {
        //     setClosedEyes((prevState) => {
        //         const updatedClosedEyes = new Set(prevState);
        //         updatedClosedEyes.delete(nameSubject);
        //         return updatedClosedEyes;
        //     });

        //     const updatedSubjects = activeSubjects.map((subject) => {
        //         if (subject.l === nameSubject) {
        //             return { ...subject, v: true };
        //         }
        //         return subject;
        //     });

        //     setActiveSubjects(updatedSubjects);
        //     subjectService.groupSubjects = updatedSubjects;
        //     await saveSubjectsForGroup(group, subjectService.groupSubjects);

        //     if (!updatedSubjects.find((subject) => subject.l === nameSubject && !subject.v)) {
        //         setClosedEyes((prevState) => {
        //             const updatedClosedEyes = new Set(prevState);
        //             updatedClosedEyes.delete(nameSubject);
        //             return updatedClosedEyes;
        //         });
        //     }
        // }
    };

    return (
        <TouchableOpacity 
            style={{ ...styles.container, backgroundColor: props.subject.isVisible ? '#332D41' : '#1d192b' }} 
            onPress={() => handleOpenModal(props.subject.l)}>
                <Text numberOfLines={1} style={{ ...styles.text, textDecorationLine: props.subject.isVisible ? 'none' : 'line-through' }}>
                    {props.subject.l}
                </Text>
                <Image source={props.subject.isVisible ? Eye : EyeClosed} style={styles.eye} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    eye: {
        width: 20,
        height: 15,
        marginLeft: 16,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    text: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
});
