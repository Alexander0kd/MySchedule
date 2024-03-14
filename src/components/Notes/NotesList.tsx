import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';
import { deleteNoteById, getAllSubjects, getNoteById } from '../../services/notes-local-storage.service';

import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';
import { openModal } from '../../services/utility.service';
import { LoadingScreen } from '../../shared/components/LoadingScreen';

export const NotesList = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotes = async () => {
        setIsLoading(true);
        const subjects = await getAllSubjects();
        setNotes(subjects);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = (subject) => {
        navigation.push('NotesAdd', { subject });
        fetchNotes();
    };

    const editNote = async (id) => {
        const selectedNote = await getNoteById(id);

        navigation.push('NotesEdit', { selectedNote });
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
            {isLoading ? (
                <LoadingScreen></LoadingScreen>
            ) : (
                <ScrollView>
                    {notes.map((note: INote, index: number) => (
                        <NotesDropdown
                            key={`${note.subject}-${index}`}
                            note={note}
                            noteAddFn={() => addNote(note.subject)}
                            noteDeleteFn={(id) => deleteNote(id)}
                            noteEditFn={editNote}
                        />
                    ))}
                </ScrollView>
            )}
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
