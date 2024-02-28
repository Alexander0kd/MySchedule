import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import Dropdown from './Dropdowne';

const initialNotes = [
    {
        id: 1,
        subject: 'Subject1',
        notes: [
            {
                id: 1,
                data: '28 лютого | 12:54',
                text: 'Dolore est voluptate culpa tempor velit cupidatat cillum dolor ea ullamco dolor amet. Occaecat adipisicing excepteur velit quis id. Id dolore est eu laborum nulla et irure mollit sint. Excepteur reprehenderit reprehenderit laboris elit aute tempor. Consectetur sit ipsum in dolor. Cillum aliqua consequat duis reprehenderit non amet pariatur in ea ex nulla eu voluptate amet. Magna elit ad adipisicing do aliquip elit. Proident reprehenderit nostrud aute cupidatat dolore ipsum in. Veniam aliqua incididunt est ut voluptate ex exercitation tempor ipsum aliqua eu adipisicing pariatur esse. Ex laborum id anim qui proident culpa duis aliquip tempor officia occaecat. Aliquip esse cupidatat minim occaecat. Qui est duis ad adipisicing ipsum labore laborum dolore est voluptate. Eu irure eiusmod laborum ullamco sit. Sint proident duis aliquip velit pariatur quis velit nisi consequat nostrud ipsum.',
            },
            {
                id: 2,
                data: '2024-02-22',
                text: 'Proident id dolore ullamco exercitation dolor amet aute tempor occaecat cillum anim. Aliquip eu fugiat nisi aliqua cillum eu laboris ut adipisicing ex non adipisicing excepteur. Nulla veniam anim est occaecat elit dolor elit sint Lorem nostrud adipisicing nulla. Ipsum incididunt sint amet ad officia qui irure culpa id id aute. Id anim fugiat veniam dolor consectetur ea nostrud.',
            },
        ],
    },
    {
        id: 3,
        subject: 'Subject2Subject2Subject2Subject2',
        notes: [
            {
                id: 1,
                data: '2024-02-22',
                text: 'Study somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy something',
            },
            {
                id: 2,
                data: '2024-02-22',
                text: 'Study something2',
            },
        ],
    },
    {
        id: 4,
        subject: 'Subject3',
        notes: [
            {
                id: 1,
                data: '2024-02-22',
                text: 'Sit aliquip aliquip consectetur sit. Proident adipisicing aliquip tempor sunt aliqua velit elit id anim eiusmod Lorem veniam. Ea tempor minim et et aute proident adipisicing deserunt velit irure.',
            },
            {
                id: 2,
                data: '2024-02-22',
                text: 'Sint tempor sint aliquip laborum ipsum minim laboris ex tempor deserunt irure nisi Lorem. Proident amet culpa aliqua duis ea cillum anim ea occaecat deserunt laboris labore. Lorem officia minim excepteur nostrud do eiusmod. Dolore pariatur duis ea irure. Deserunt ad nulla dolore ullamco ipsum aliqua fugiat Lorem eu laborum quis. Adipisicing nulla quis aute incididunt enim quis excepteur ullamco veniam.',
            },
        ],
    },
    {
        id: 2,
        subject: 'Subject4',
        notes: [
            {
                id: 1,
                data: '2024-02-22',
                text: 'Study something',
            },
            {
                id: 2,
                data: '2024-02-22',
                text: 'Study something2',
            },
        ],
    },
];

const NotesPage = () => {
    const [selectedNote, setSelectedNote] = useState(null);
    const notesMap = new Map();

    initialNotes.forEach((note) => {
        notesMap.set(note.id, note);
    });
    return (
        <View style={styles.container}>
            <ScrollView>
                {Array.from(notesMap.values()).map((note) => (
                    <Dropdown key={note.id} note={note} />
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
});

export default NotesPage;
