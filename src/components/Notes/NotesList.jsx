import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const initialNotes = [
    {
        subject: 'Subject1',
        text: 'Study something',
    },
    {
        subject: 'Subject2',
        text: 'Study something',
    },
    {
        subject: 'Subject3',
        text: 'Study something',
    },
    {
        subject: 'Subject4',
        text: 'Study something',
    },
];

const NotesPage = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.notesContainer}>
                {notes.map((note, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedNote(note)}>
                        <Text style={styles.noteSubject}>{note.subject}</Text>
                        {selectedNote === note && (
                            <View style={styles.noteDetails}>
                                <Text style={styles.noteText}>{note.text}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        borderBottomWidth: 0,
    },
    notesContainer: {
        flex: 1,
    },
    noteSubject: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noteDetails: {
        backgroundColor: '#EFEFEF',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    noteText: {
        fontSize: 14,
    },
    label: {
        color: 'white',
        fontSize: 11,
    },
});

export default NotesPage;
