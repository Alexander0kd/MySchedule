import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';
import { getAllSubjects } from '../../services/notes-local-storage.service';

import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';

export const NotesList = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const subjects = await getAllSubjects();
        setNotes(subjects);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = (subject) => {
        navigation.push('NotesAdd', { subject });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note: INote, index: number) => (
                    <NotesDropdown key={`${note.subject}-${index}`} note={note} noteAddFn={() => addNote(note.subject)} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        paddingTop: 16,
        paddingBottom: 16,
    },
});
