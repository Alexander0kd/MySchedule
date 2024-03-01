import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';

const initialNotes: INote[] = [
    {
        subject: 'Subject1',
        notes: [
            {
                date: new Date(),
                text: 'Dolore est voluptate culpa tempor velit cupidatat cillum dolor ea ullamco dolor amet. Occaecat adipisicing excepteur velit quis id. Id dolore est eu laborum nulla et irure mollit sint. Excepteur reprehenderit reprehenderit laboris elit aute tempor. Consectetur sit ipsum in dolor. Cillum aliqua consequat duis reprehenderit non amet pariatur in ea ex nulla eu voluptate amet. Magna elit ad adipisicing do aliquip elit. Proident reprehenderit nostrud aute cupidatat dolore ipsum in. Veniam aliqua incididunt est ut voluptate ex exercitation tempor ipsum aliqua eu adipisicing pariatur esse. Ex laborum id anim qui proident culpa duis aliquip tempor officia occaecat. Aliquip esse cupidatat minim occaecat. Qui est duis ad adipisicing ipsum labore laborum dolore est voluptate. Eu irure eiusmod laborum ullamco sit. Sint proident duis aliquip velit pariatur quis velit nisi consequat nostrud ipsum.',
            },
            {
                date: new Date(),
                text: 'Proident id dolore ullamco exercitation dolor amet aute tempor occaecat cillum anim. Aliquip eu fugiat nisi aliqua cillum eu laboris ut adipisicing ex non adipisicing excepteur. Nulla veniam anim est occaecat elit dolor elit sint Lorem nostrud adipisicing nulla. Ipsum incididunt sint amet ad officia qui irure culpa id id aute. Id anim fugiat veniam dolor consectetur ea nostrud.',
            },
        ],
    },
    {
        subject: 'Subject2Subject2Subject2Subject2',
        notes: [
            {
                date: new Date(),
                text: 'Study somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy something',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
        ],
    },
    {
        subject: 'Subject3',
        notes: [
            {
                date: new Date(),
                text: 'Sit aliquip aliquip consectetur sit. Proident adipisicing aliquip tempor sunt aliqua velit elit id anim eiusmod Lorem veniam. Ea tempor minim et et aute proident adipisicing deserunt velit irure.',
            },
            {
                date: new Date(),
                text: 'Sint tempor sint aliquip laborum ipsum minim laboris ex tempor deserunt irure nisi Lorem. Proident amet culpa aliqua duis ea cillum anim ea occaecat deserunt laboris labore. Lorem officia minim excepteur nostrud do eiusmod. Dolore pariatur duis ea irure. Deserunt ad nulla dolore ullamco ipsum aliqua fugiat Lorem eu laborum quis. Adipisicing nulla quis aute incididunt enim quis excepteur ullamco veniam.',
            },
        ],
    },
    {
        subject: 'Subject4',
        notes: [
            {
                date: new Date(),
                text: 'Study something',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
        ],
    },
];

export const NotesList = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    initialNotes.map((note: INote, index: number) => (
                        <NotesDropdown key={`${note.subject}-${index}`} note={note} />
                    ))
                }
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