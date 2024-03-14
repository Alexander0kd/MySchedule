import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';
import { deleteNoteById, getAllSubjects } from '../../services/notes-local-storage.service';

import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';
import { openModal } from '../../services/utility.service';

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
        fetchNotes();
    };

    const deleteNote = async (id) => {
        const isDelete = await openModal('Видалити нотатку ?', 'Цю дію неможливо відмінити', 'Відмінити', 'Видалити');

        if (isDelete) {
            await deleteNoteById(id);
            fetchNotes();
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note: INote, index: number) => (
                    <NotesDropdown
                        key={`${note.subject}-${index}`}
                        note={note}
                        noteAddFn={() => addNote(note.subject)}
                        noteDeleteFn={(id) => deleteNote(id)}
                    />
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
