import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { getActiveProfile } from '../../../services/local-storage.service';
import { handleError, openModal, truncateString } from '../../../services/utility.service';
import Eye from '../../../../../assets/eye-open.png';
import EyeClosed from '../../../../../assets/eye-closed.png';

export const SettingsSchedule = () => {
    const windowWidth = useWindowDimensions().width;

    const [activeSubjects, setActiveSubjects] = useState<ISubject[]>([]);
    const [closedEyes, setClosedEyes] = useState<Set<string>>(new Set());
    const [group, setGroup] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getActiveProfile();
                const group = profile.group;

                setGroup(group);

                const subjects = await getSubjectsForGroup(group);

                subjectService.groupSubjects = subjects;
                setActiveSubjects(subjects);

                subjects.forEach((subject) => {
                    if (!subject.v) {
                        setClosedEyes((prevState) => new Set(prevState.add(subject.l)));
                    }
                });
            } catch (error) {
                handleError(error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = async (nameSubject: string) => {
        if (!closedEyes.has(nameSubject)) {
            const modal = await openModal('Бажаєте Приховати цей предмет?', `Приховати предмет "${nameSubject}"`, 'Скасувати', 'Приховати');

            if (modal) {
                setClosedEyes((prevState) => new Set(prevState.add(nameSubject)));
                const updatedSubjects = activeSubjects.map((subject) => {
                    if (subject.l === nameSubject) {
                        return { ...subject, v: false };
                    }
                    return subject;
                });

                setActiveSubjects(updatedSubjects);
                subjectService.groupSubjects = updatedSubjects;
                await saveSubjectsForGroup(group, subjectService.groupSubjects);

                if (updatedSubjects.find((subject) => subject.l === nameSubject && !subject.v)) {
                    setClosedEyes((prevState) => new Set(prevState.add(nameSubject)));
                }
            }
        } else {
            setClosedEyes((prevState) => {
                const updatedClosedEyes = new Set(prevState);
                updatedClosedEyes.delete(nameSubject);
                return updatedClosedEyes;
            });

            const updatedSubjects = activeSubjects.map((subject) => {
                if (subject.l === nameSubject) {
                    return { ...subject, v: true };
                }
                return subject;
            });

            setActiveSubjects(updatedSubjects);
            subjectService.groupSubjects = updatedSubjects;
            await saveSubjectsForGroup(group, subjectService.groupSubjects);

            if (!updatedSubjects.find((subject) => subject.l === nameSubject && !subject.v)) {
                setClosedEyes((prevState) => {
                    const updatedClosedEyes = new Set(prevState);
                    updatedClosedEyes.delete(nameSubject);
                    return updatedClosedEyes;
                });
            }
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {activeSubjects.map((subject, index) => (
                    <View key={index} style={{ ...styles.subjectContainer, backgroundColor: subject.v ? '#332D41' : '#1d192b' }}>
                        <Text style={{ ...styles.text, textDecorationLine: subject.v ? 'none' : 'line-through' }}>
                            {truncateString(subject.l, windowWidth < 450 ? 30 : subject.l.length)}
                        </Text>
                        <TouchableOpacity onPress={() => handleOpenModal(subject.l)}>
                            <Image source={closedEyes.has(subject.l) ? EyeClosed : Eye} style={styles.eye} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        margin: 24,
        marginBottom: 8,
        borderRadius: 16,
        borderWidth: 0,
    },
    subjectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#332D41',
        padding: 24,
        paddingTop: 16,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    eye: {
        width: 20,
        height: 15,
    },
});
