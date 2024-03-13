import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';
import { getAllSubjects } from '../../services/notes-local-storage.service';



export const NotesList = () => {
    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const subjects = await getAllSubjects();
            setNotes(subjects);
        };

        fetchNotes();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note: INote, index: number) => (
                    <NotesDropdown key={`${note.subject}-${index}`} note={note} />
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
