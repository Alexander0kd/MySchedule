import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../../interfaces/notes.interface';
import { deleteNoteById, getAllSubjects } from '../../../services/notes.service';

import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../../environment/available-routes';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { openModal } from '../../../utils/utility.service';
import { LoadingScreen } from '../../../shared/LoadingScreen';

export const NotesList: FunctionComponent<{
    lesson: string;
}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const isFocused = useIsFocused();

    const [notes, setNotes] = useState<INote[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchNotes = async () => {
        setIsLoading(true);
        const subjects = await getAllSubjects();
        setNotes(subjects);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            fetchNotes();
        }
    }, [isFocused]);

    const addNote = (noteGroup: INote) => {
        navigation.navigate('NotesAdd', {
            noteGroup: noteGroup,
        });

        fetchNotes();
    };

    const editNote = async (noteGroup: INote, noteId: number) => {
        navigation.navigate('NotesEdit', {
            noteGroup: noteGroup,
            noteId: noteId,
        });
    };

    const deleteNote = async (noteGroup: INote, noteId: number) => {
        const isDelete = await openModal('Видалити нотатку?', 'Цю дію неможливо відмінити', 'Відмінити', 'Видалити');

        if (isDelete) {
            await deleteNoteById(noteGroup, noteId);
            fetchNotes();
        }
    };

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note: INote, index: number) => (
                    <NotesDropdown
                        key={`${note.subject}-${index}`}
                        note={note}
                        noteAddFn={addNote}
                        noteDeleteFn={deleteNote}
                        noteEditFn={editNote}
                        isActive={props.lesson === note.subject}
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
