import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import Dropdown from './Dropdowne';

const initialNotes = [
    {
        id: 1,
        subject: 'Subject1',
        text: 'Study something',
    },
    {
        id: 3,
        subject: 'Subject2Subject2Subject2Subject2',
        text: 'Nisi sunt in laboris in elit est sunt. Ut sint cillum veniam ea Lorem in est deserunt. Voluptate nisi nulla qui consequat eu culpa excepteur ad occaecat incididunt anim aute. Tempor elit esse duis id. Mollit irure pariatur cupidatat duis laboris et quis adipisicing labore fugiat.',
    },
    {
        id: 4,
        subject: 'Subject3',
        text: 'Study something',
    },
    {
        id: 2,
        subject: 'Subject4',
        text: 'Study something',
    },
];

const NotesPage = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [selectedNote, setSelectedNote] = useState(null);

    const notesMap = new Map();

    initialNotes.forEach((note) => {
        notesMap.set(note.id, note);
    });
    return (
        <View style={styles.container}>
            {Array.from(notesMap.values()).map((note) => (
                <Dropdown key={note.id} note={note} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        borderBottomWidth: 0,
    },
});

export default NotesPage;
